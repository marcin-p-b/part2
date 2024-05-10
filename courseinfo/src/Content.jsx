import React from "react";
import Part from "./Part";
import Total from "./Total";

export default function Content({ techStack }) {
  return (
    <div>
      <h2>{techStack.name}</h2>
      {techStack.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total parts={techStack.parts} />
      <h2></h2>
    </div>
  );
}
