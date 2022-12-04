import "./navigation.css";
import axios from "axios";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FolderContext } from "../../contexts/folder.context";
import { fetchFoldersFromAPI } from "../../components/home/home";
import { ReactComponent as Logo } from "../../assets/microphone.svg";
import { ReactComponent as Phrase } from "../../assets/phrase.svg";

const Navigation = () => {
  const { currentUser, unsetCurrentUser } = useContext(UserContext);
  const { setFolders } = useContext(FolderContext);
  const navigate = useNavigate();

  const logUserOut = () => {
    axios({method: "POST", url: "http://127.0.0.1:5000/logout"})
      .then((response) => {
        unsetCurrentUser();
        localStorage.removeItem("currentUser");
        localStorage.removeItem("folders");
        navigate("/");
        fetchFoldersFromAPI("/db/folders.json", currentUser, "GET", setFolders);
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
        <Link to="/" className="logo-container">
            <Logo className="logo"/>
            <Phrase/>
        </Link>
        <div className="nav-links">
          {!currentUser ? 
            <Fragment>
              <Link className="nav-link" to="/sign-in">Sign in</Link>
              <Link className="nav-link" to="/sign-up">Sign up</Link>
            </Fragment> :
            <Fragment>
              <Link className="nav-link" to="/profile">Profile</Link>
              <div className="nav-link" onClick={logUserOut}><span>Sign out</span></div>
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