import { Skeleton } from "@mui/material";
import React from "react";

function ReviewLoading() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        animation="wave"
      />
    </div>
  );
}

export default ReviewLoading;
