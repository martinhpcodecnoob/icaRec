/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    remotePatterns: [
    {
        hostname: "rickandmortyapi.com",
    },
    {
        hostname: "images.unsplash.com"
    }
    ],
},
webpack: (config, { isServer }) => {
  if (!isServer) {
    // For handling zstd-win32-x64-msvc
    config.module.rules.push({
      test: /\/node_modules\/@mongodb-js\/zstd-win32-x64-msvc\/zstd\.win32-x64-msvc\.node$/,
      loader: 'node-loader',
    });
    
    // For handling @napi-rs/snappy-win32-x64-msvc
    config.module.rules.push({
      test: /\/node_modules\/@napi-rs\/snappy-win32-x64-msvc\/snappy\.win32-x64-msvc\.node$/,
      loader: 'node-loader',
    });
  }
  
  return config;
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
