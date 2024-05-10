import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const createContact = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const replace = (replaceObject) => {
  const request = axios.put(
    `${baseUrl}/${replaceObject.id - 1}`,
    replaceObject
  );
  return request.then((response) => response.data);
};

const deleteContact = (deleteObject) => {
  const request = axios.delete(`${baseUrl}/${deleteObject.id}`);
  return request.then((response) => response.data);
};

export { getAll, createContact, deleteContact, replace };
