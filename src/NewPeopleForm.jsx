import React from "react";

export default function NewPeopleForm({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleClick,
}) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <h1>add a new</h1>
        <span>
          name: <input value={newName} onChange={handleNameChange} required />
        </span>
        <br />
        <span>
          number:{" "}
          <input value={newNumber} onChange={handleNumberChange} required />
        </span>
      </div>
      <div>
        <button type="submit" onClick={handleClick}>
          add
        </button>
      </div>
    </form>
  );
}
