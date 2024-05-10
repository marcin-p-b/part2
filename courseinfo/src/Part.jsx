import React from "react";

export default function Part({ part }) {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
}
