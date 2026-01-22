import type { NextConfig } from "next";
import { fetchRedirects } from "@/sanity/lib/fetchRedirects";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return await fetchRedirects();
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

