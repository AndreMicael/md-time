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
        domains: ['i0.wp.com'],
    },
}

module.exports = nextConfig 