/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // 개발자 모드에서 컴포넌트 렌더링을 두번 하게 하는 것
  images: {
    domains: ["imagedelivery.net"],
  },
};

module.exports = nextConfig;
