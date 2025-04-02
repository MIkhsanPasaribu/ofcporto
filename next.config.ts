/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Update deprecated config
    serverExternalPackages: ['bcrypt']
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
};

export default nextConfig;
