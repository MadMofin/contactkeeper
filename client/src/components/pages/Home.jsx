import React, {useContext, useEffect} from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import AuthContext from "../../context/auth/authContext";
import ContactFilter from "../contacts/ContactFilter";

const Home = props => {
  const authContext = useContext(AuthContext);
  if(!localStorage.token){
    props.history.push('/login');
  }
  useEffect(()=>{
    authContext.loadUser();
    //  eslint-disable-next-line
  },[]);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
