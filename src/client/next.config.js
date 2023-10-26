const dotenv = require('dotenv');
const { resolve } = require('path');

if (process.env.NODE_ENV !== 'build') {
  dotenv.config({ path: resolve(__dirname, '../../.env') });
}

/** @type {import('next').NextConfig} */
module.exports = {
  distDir: '../../dist/.next',
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  env: {
    NEXT_PUBLIC_SLIDE_CLOSE_AT_PERCENT: 0.75,
    NEXT_PUBLIC_SLIDE_FINISH_AT_PERCENT: 0.3,
    NEXT_PUBLIC_SLIDE_TRANSITION_DURATION: 0.85,
    SERVER_HOST: `http://localhost:${process.env.PORT}`,
    NEXT_PUBLIC_MAX_OUTSIDE_CONTENT_UNSCALE_SIZE: 0.2,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['svg-url-loader'],
    });
    return config;
  },
};
