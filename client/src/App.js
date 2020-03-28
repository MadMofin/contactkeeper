import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import Alert from './components/layout/Alert';

import PrivateRoute from './components/routing/PrivateRoute'
import AlertState from "./context/alert/alertState";
import Blank from "./components/pages/Blank";

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AlertState>
    <AuthState>
      <ContactState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
            <Alert/>
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ContactState>
    </AuthState>
    </AlertState>
  );
};

export default App;
