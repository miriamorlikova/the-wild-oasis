/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "bjzhisgrplrsvdqdvtyd.supabase.co",
				pathname: "/storage/v1/object/public/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
		],
	},
	// output: "export",
};

export default nextConfig;
