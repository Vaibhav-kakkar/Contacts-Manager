import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import { v4 as uuidv4 } from "uuid";
import { Switch, Route } from "react-router-dom";
import ContactDetail from "./components/ContactDetail";
import api from "./api/contacts";
import uuid from "react-uuid";
import Edit from "./components/Edit";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [contacts, setContacts] = useState(
  //   JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  // );

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <ContactList
              {...props}
              contacts={searchTerm.length < 1 ? contacts : searchResults}
              getContactId={removeContactHandler}
              term={searchTerm}
              searchKeyword={searchHandler}
            />
          )}
        />
        <Route
          path="/add"
          render={(props) => (
            <AddContact {...props} addContactHandler={addContactHandler} />
          )}
        />
        <Route
          path="/edit"
          render={(props) => (
            <Edit {...props} updateContactHandler={updateContactHandler} />
          )}
        />
        <Route path="/contact/:id" component={ContactDetail} />
      </Switch>
    </div>
  );
}

export default App;
