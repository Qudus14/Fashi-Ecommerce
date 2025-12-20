import React from "react";
import { Skeleton } from "../ui/skeleton";

function DealLoading() {
  return (
    <div className="w-full h-[300px]">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        animation="wave"
      />
    </div>
  );
}

export default DealLoading;
