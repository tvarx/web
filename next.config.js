/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/web',
  // Reduce build memory usage
  experimental: {
    // Reduce memory usage during build
    optimizeCss: false, // Disable CSS optimization during build to save memory
  },
  // Reduce build parallelism to prevent OOM
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Reduce parallelism for production builds
      config.optimization = {
        ...config.optimization,
        minimize: true,
      }
      // Limit parallel processing
      if (config.parallelism) {
        config.parallelism = 1
      }
    }
    return config
  },
  images: {
    domains: [],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Prevent clickjacking attacks
          { key: "X-Frame-Options", value: "DENY" },
          // Enable XSS filtering (legacy, but still useful)
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Control referrer information
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // DNS prefetch control
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Strict Transport Security (HSTS) - enforce HTTPS
          { 
            key: "Strict-Transport-Security", 
            value: "max-age=31536000; includeSubDomains; preload" 
          },
          // Permissions Policy - restrict browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()"
          },
          // Content Security Policy - comprehensive protection
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://fonts.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests"
            ].join("; ")
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

