/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mdtime.com.br',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig 