import React from "react";
import ContactCard from "./ContactCard";
import { Link, withRouter } from "react-router-dom";

function ContactList(props) {
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };
  const renderContact = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue" style={{ float: "right" }}>
            Add Contact
          </button>
        </Link>
      </h2>
      <div className="ui celled list">{renderContact}</div>
    </div>
  );
}

export default withRouter(ContactList);
