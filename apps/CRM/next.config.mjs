/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		optimizePackageImports: ["firebase", "lucide-react"],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "pub-940ccf6255b54fa799a9b01050e6c227.r2.dev",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "www.gstatic.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
