import "./navigation.css";
import axios from "axios";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import useToken from "../../utils/userToken";

const Navigation = () => {
  const { removeToken, token } = useToken();
  
  const logUserOut = () => {
    axios({method: "POST", url: "/logout"})
      .then((response) => {
        removeToken();
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
          {!token && token !== "" && token !== undefined ? 
            <Link className="nav-link" to="/auth">Auth</Link> :
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