import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'static.vecteezy.com',
			},
			{
				protocol: 'https',
				hostname: 'cloud.appwrite.io',
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '100MB',
		},
	},
};

export default nextConfig;
