/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "oluoko-s-ai-music-generator-bucket.s3.us-east-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default config;
