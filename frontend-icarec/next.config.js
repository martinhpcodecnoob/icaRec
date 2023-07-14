/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    remotePatterns: [
    {
        hostname: "rickandmortyapi.com",
    },
    ],
},
};

module.exports = nextConfig;
