import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/browse", destination: "/bounties", permanent: false },
      { source: "/services", destination: "/bounties", permanent: false },
      { source: "/account/referrals", destination: "/dashboard", permanent: false },
      { source: "/bounties/erstellen", destination: "/aufgaben/neu", permanent: false },
    ];
  },
};

export default nextConfig;
