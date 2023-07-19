/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    remotePatterns: [
    {
        hostname: "rickandmortyapi.com",
    },
    ],
},
async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
