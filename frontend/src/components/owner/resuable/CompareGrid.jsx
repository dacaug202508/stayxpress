import React from "react";
import CompareCard from "./CompareCard";

function CompareGrid() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
          justify-items-center
        "
      >
        <CompareCard />
        <CompareCard />
      </div>
    </div>
  );
}

export default CompareGrid;
