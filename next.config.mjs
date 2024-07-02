/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config, { isServer}) {
		config.module.rules.push({
			test: /index\.html$/,
			use: ["html-loader"]
		})
		return config;
	}
};

export default nextConfig;
