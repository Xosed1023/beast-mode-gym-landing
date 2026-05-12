/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/v3",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
