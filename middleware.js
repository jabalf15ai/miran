// MIRAN — Basic Auth gate. Credentials live in Vercel env vars MIRAN_USER / MIRAN_PASS.
// Fails closed: if either variable is missing, every request is refused.

export const config = {
  matcher: '/:path*',
};

const enc = new TextEncoder();

async function digest(value) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(value)));
}

// Constant-time comparison: hash both sides to fixed length, then OR all byte diffs.
async function safeEqual(a, b) {
  const [ha, hb] = await Promise.all([digest(a), digest(b)]);
  let diff = 0;
  for (let i = 0; i < ha.length; i++) diff |= ha[i] ^ hb[i];
  return diff === 0;
}

function denied(status = 401) {
  return new Response('Authentication required', {
    status,
    headers: {
      'WWW-Authenticate': 'Basic realm="MIRAN", charset="UTF-8"',
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

export default async function middleware(request) {
  const user = process.env.MIRAN_USER;
  const pass = process.env.MIRAN_PASS;
  if (!user || !pass) return denied();

  const header = request.headers.get('authorization') || '';
  const [scheme, encoded] = header.split(' ');
  if (!scheme || scheme.toLowerCase() !== 'basic' || !encoded) return denied();

  let decoded;
  try {
    const bin = atob(encoded);
    decoded = new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
  } catch {
    return denied();
  }

  const idx = decoded.indexOf(':');
  if (idx < 0) return denied();
  const givenUser = decoded.slice(0, idx);
  const givenPass = decoded.slice(idx + 1);

  const okUser = await safeEqual(givenUser, user);
  const okPass = await safeEqual(givenPass, pass);
  if (!(okUser && okPass)) return denied();

  // Authorized: continue to the static site (same signal @vercel/functions next() sends).
  return new Response(null, { headers: { 'x-middleware-next': '1' } });
}
