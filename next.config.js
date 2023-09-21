/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;

// module.exports = {
//   webpack(config) {
//     config.resolve.extensions.push('.ts', '.tsx');
//     return config;
//   },
// };
