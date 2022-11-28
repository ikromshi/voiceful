import "./navigation.css";
import axios from "axios";
import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

const Navigation = () => {
  const { currentUser, unsetCurrentUser } = useContext(UserContext);
  
  const logUserOut = () => {
    axios({method: "POST", url: "http://127.0.0.1:5000/logout"})
      .then((response) => {
        unsetCurrentUser();
        localStorage.removeItem("currentUser");
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <Fragment>
      <div className="nav-container">
        <h3>Navigation page</h3>
        <div className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/text-reader">Text Reader</Link>
          {!currentUser ? 
            <Fragment>
              <Link className="nav-link" to="/auth">Sign-in/Sign-up</Link> 
            </Fragment> :
            <Fragment>
              <Link className="nav-link" to="/profile">Profile</Link>
              <button onClick={logUserOut}>Log Out</button>
            </Fragment>
          }
        </div>
      </div>
    <Outlet />
    </Fragment>
  )
}

export default Navigation;