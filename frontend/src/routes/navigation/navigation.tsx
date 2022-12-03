import "./navigation.css";
import axios from "axios";
import { Fragment, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

const Navigation = () => {
  const { currentUser, unsetCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logUserOut = () => {
    axios({method: "POST", url: "http://127.0.0.1:5000/logout"})
      .then((response) => {
        unsetCurrentUser();
        localStorage.removeItem("currentUser");
        localStorage.removeItem("folders");
        navigate("/");
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
        <h3>[Icon probably]</h3>
        <div className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          {!currentUser ? 
            <Fragment>
              <Link className="nav-link" to="/sign-in">Sign In</Link>
              <Link className="nav-link" to="/sign-up">Sign Up</Link>
            </Fragment> :
            <Fragment>
              <Link className="nav-link" to="/profile">Profile</Link>
              <div className="nav-link" onClick={logUserOut}><span>Log Out</span></div>
            </Fragment>
          }
          <Link className="nav-link" to="donation">Donate</Link>
        </div>
      </div>
    <Outlet />
    </Fragment>
  )
}

export default Navigation;