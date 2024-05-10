import React from "react";

export default function RenderPeople({ filterName, data, handleDelete }) {
  return (
    <div>
      {" "}
      {filterName !== ""
        ? data.map(
            (person) =>
              person.name.slice(0, filterName.length).toLowerCase() ===
                filterName.toLowerCase() && (
                <div className="contact-container" key={person.id}>
                  <p>
                    {person.name} {person.number}
                  </p>
                  <button onClick={() => handleDelete(person)}>delete</button>
                </div>
              )
          )
        : data.map((person) => (
            <div className="contact-container" key={person.id}>
              <p>
                {person.name} {person.number}
              </p>
              <button onClick={() => handleDelete(person)}>delete</button>
            </div>
          ))}
    </div>
  );
}
