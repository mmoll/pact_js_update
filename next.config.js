/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    searchServiceBaseUrl: 'http://some_url',
  }
}

module.exports = nextConfig
