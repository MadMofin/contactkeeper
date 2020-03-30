import React, {useContext, Fragment} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext)

  const {isAuthenticated, user, logout} = authContext;

  const onLogout = () => {
    logout()
  }

  const authLinks = (
    <Fragment>
      <li>
        Hello {user && user.name}
      </li>
      <li>
        <a href="" onClick={onLogout}><i className='fas fa-sign-out-alt'></i>
        <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
       <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
    </Fragment>
  )

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
       
       {isAuthenticated ? authLinks : guestLinks}

      </ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt"
};
export default Navbar;
