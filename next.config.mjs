import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
const baseConfig = {
  images: {
    unoptimized: true,
  },
};

export default function nextConfig(phase) {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return baseConfig;
  }

  return {
    ...baseConfig,
    output: "export",
  };
}
