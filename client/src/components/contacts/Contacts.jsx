import React, { useContext, Fragment } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import { useEffect } from "react";
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, loading, getContacts, filtered } = contactContext;
  
  useEffect(()=>{
    getContacts();
    // eslint-disable-next-line
  },[]);

  if (contacts.length === 0 && contacts !== null && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <Fragment>
          {filtered !== null
            ? filtered.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
              ))
            : contacts.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
              ))}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
