import { useState, useEffect } from "react";
import SerchFilter from "./SerchFilter";
import NewPeopleForm from "./NewPeopleForm";
import RenderPeople from "./RenderPeople";
import { getAll, createContact, deleteContact, replace } from "./DataManager";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [data, setData] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => {
    const userInput = e.target.value;
    setNewName(userInput);
  };

  const handleNumberChange = (e) => {
    const userInput = e.target.value;
    setNewNumber(userInput);
  };

  const handleFilterChange = (e) => {
    const userInput = e.target.value;
    setFilterName(userInput);
  };

  const handleClick = () => {
    const newNameArr = newName.split(" ");

    const updateContact = [
      // copy the current users state
      // now you can add a new object to add to the array
      {
        // using the length of the array for a unique id
        id: `${data.length + 1}`,
        // adding a new user name
        name: `${
          newNameArr[0].slice(0, 1).toUpperCase() + newNameArr[0].slice(1)
        }${
          newNameArr.length > 1
            ? ` ${
                newNameArr[1].slice(0, 1).toUpperCase() + newNameArr[1].slice(1)
              }`
            : ""
        }`,

        number: newNumber,
      },
    ];
    // update the state to the updatedUsers
    CheckDuplicates(updateContact[0]);
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      setErrorMessage(`Deleted ${person.name}`);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      deleteContact(person)
        .then(() => setRerender(!rerender))
        .catch((error) => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setRerender(!rerender);
        });
    }
  };

  function CheckDuplicates(element) {
    let isDuplicate = true;
    for (let i = 0; i < data.length; i++) {
      if (data[i].name.toLowerCase() === newName.toLowerCase()) {
        isDuplicate = true;
        if (
          window.confirm(
            `${data[i].name} is already added to your phonebook, replace the old number with a new one?`
          )
        ) {
          setErrorMessage(
            `Replaced ${element.name}'s number with ${element.number}`
          );
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
          replace(element)
            .then(() => setRerender(!rerender))
            .catch((error) => {
              setErrorMessage(
                `Information of ${element.name} has already been removed from server`
              );
              setRerender(!rerender);
            });
          setNewName("");
          setNewNumber("");
        }
        break;
      } else {
        isDuplicate = false;
      }
    }
    if (!isDuplicate && newName.trim() !== "" && newNumber.trim() !== "") {
      setPersons(element);
      setErrorMessage(`Added ${element.name}`);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      createContact(element).then(() => setRerender(!rerender));
      setNewName("");
      setNewNumber("");
    }
  }

  useEffect(() => {
    getAll().then((response) => setData(response.data));
  }, [rerender]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <SerchFilter handleFilterChange={handleFilterChange} />
      <NewPeopleForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleClick={handleClick}
      />
      <h2>Numbers</h2>
      <RenderPeople
        data={data}
        filterName={filterName}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
