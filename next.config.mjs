/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

export async function middleware() {
  return ["/admin/:path*", "/auth/login", "/auth/register"];
}
