import React, { useReducer } from "react";
import { uuid } from "uuidv4";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from 'axios';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    loading: true,
    error: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Get contacts
  const getContacts = async () =>{
    try {
      const res = await axios.get('/api/contacts');
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      })
    } catch (error) {
      
    }
  }
  
  //  Add Contact
  const addContact = async contact => {

    const config = {
      headers: {"Context-Type": "application/json"}
    }

    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
      
    }
  };

  // Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {"Context-Type": "application/json"}
    }

    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
      
    }
  };

  // Filter Contact
  const filterContact = text => {
    dispatch({type: FILTER_CONTACT, payload: text});
  };

  // Clear Filter
  const clearFilter = text => {
    dispatch({type: CLEAR_FILTER});
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
        setCurrent,
        current: state.current,
        clearCurrent,
        updateContact,
        loading: state.loading,
        error: state.error,
        getContacts,
        filterContact,
        clearFilter,
        filtered: state.filtered
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
