import React from "react";
import Header from "./Header";
import Content from "./Content";

export default function Course({ course }) {
  return (
    <div>
      <Header />
      {course.map((element) => (
        <Content key={element.id} techStack={element} />
      ))}
    </div>
  );
}
