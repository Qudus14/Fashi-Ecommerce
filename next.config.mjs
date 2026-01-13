/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "encrypted-tbn1.gstatic.com",
      "encrypted-tbn2.gstatic.com",
      "encrypted-tbn3.gstatic.com",
      "encrypted-tbn4.gstatic.com",
      "encrypted-tbn5.gstatic.com",
      "encrypted-tbn6.gstatic.com",
      "encrypted-tbn7.gstatic.com",
      "encrypted-tbn8.gstatic.com",
      "encrypted-tbn9.gstatic.com",
      "lh3.googleusercontent.com",
      "cdn.sanity.io",
      "target.scene7.com",
      "static.bhphoto.com",
      "www.instacart.com",
      "pisces.bbystatic.com",
      "cb.scene7.com",
      "www.staples-3p.com",
    ],
  },
};

export default nextConfig;
