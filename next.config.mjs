/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve = {
            ...config.resolve,
            fallback: {
              fs: false,
              path: false,
              os: false,
              net: false,
              tls: false,
            },
            extensions: [".tsx", ".ts", ".js"],
          }
      
          return config
      },
};

export default nextConfig;
