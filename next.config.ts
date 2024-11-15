import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
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
