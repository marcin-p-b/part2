import React from "react";

export default function Total({ parts }) {
  return (
    <div>
      <strong>
        total of{" "}
        {parts
          .map((part) => part.exercises)
          .reduce((acc, exercise) => {
            return acc + exercise;
          }, 0)}{" "}
        exercises
      </strong>
    </div>
  );
}
