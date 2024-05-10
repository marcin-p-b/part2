import React from "react";

export default function SerchFilter({ handleFilterChange }) {
  return (
    <div>
      <span>
        filter shown with <input type="text" onChange={handleFilterChange} />
      </span>
    </div>
  );
}
