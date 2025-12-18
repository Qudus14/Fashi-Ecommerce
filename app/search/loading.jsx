"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Scraping Results</h1>
      <h2 className="text-gray-400 font-light mb-5">We won't be long...</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 justify-items-center">
        {[...Array(8)].map((_, index) => (
          <div key={index} style={{ width: 300, height: 400 }}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
