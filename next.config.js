/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    images: {
        // Add domains that you want to allow images from
        domains: ['imagedelivery.net'], // Add your specific domains here
    },
    // Check the SKIP_ENV_VALIDATION variable to skip validation if needed
    env: {
        SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION || 'false', // Default to 'false' if not provided
    },
    // Optionally, if you want to skip certain checks during build/dev
    webpack(config, { isServer }) {
        if (process.env.SKIP_ENV_VALIDATION === 'true') {
            console.log("Skipping environment validation...");
            // You can add custom webpack modifications here if needed
        }
        return config;
    },
};
export default config;
