/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    baseUrl: "https://dummyjson.com/",
    requestLimit: 10,
  }
}

module.exports = nextConfig
