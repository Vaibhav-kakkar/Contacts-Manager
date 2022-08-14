import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link, withRouter } from "react-router-dom";

function ContactList(props) {
  const refEl = useRef("");
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
  const getSearchTerm = () => {
    props.searchKeyword(refEl.current.value);
  };
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
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={refEl}
            type="text"
            placeholder="Search contact"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContact.length > 0 ? renderContact : "No Contacts Available"}
      </div>
    </div>
  );
}

export default withRouter(ContactList);
