/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: { domains: ["imagedelivery.net", "i.imgur.com", "pbs.twimg.com"] },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  env: {
    SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION || "false", // Default to 'false' if not provided
  },
  webpack(config, { isServer }) {
    if (process.env.SKIP_ENV_VALIDATION === "true") {
      console.log("Skipping environment validation...");
      // You can add custom webpack modifications here if needed
    }
    return config;
  },
};
export default config;
