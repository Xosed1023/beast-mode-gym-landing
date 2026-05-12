/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  trailingSlash: true,
  async rewrites() {
    return [
      { source: "/v1", destination: "/v1/index.html" },
      { source: "/v1/", destination: "/v1/index.html" },
      { source: "/v2", destination: "/v2/index.html" },
      { source: "/v2/", destination: "/v2/index.html" },
      { source: "/v3", destination: "/v3/index.html" },
      { source: "/v3/", destination: "/v3/index.html" },
      { source: "/v4", destination: "/v4/index.html" },
      { source: "/v4/", destination: "/v4/index.html" },
      { source: "/v5", destination: "/v5/index.html" },
      { source: "/v5/", destination: "/v5/index.html" },
    ];
  },
};

export default nextConfig;
