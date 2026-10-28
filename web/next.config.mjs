/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  agentRules: false,
  turbopack: {root: import.meta.dirname},
  
  // TODO (Kez): implement API rewrite to route any /api/ requests from this frontend
  // to the API_ORIGIN environment variable. Step 3 in Dor's Week 7 material shows how to do this.
  
};

export default nextConfig;
