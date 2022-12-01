import "./home.css";
import axios from "axios";
import { Fragment, useContext, useEffect } from "react";
import TextReader from "../text-reader/text-reader";
import { UserContext } from "../../contexts/user.context";
import { FolderContext } from "../../contexts/folder.context";
import ButtonsPreview from "../buttons-preview/buttons-preview";
import { Link } from "react-router-dom";
import { UserType } from "../../types/types";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const { setFolders } = useContext(FolderContext);
  const foldersAPI = "http://127.0.0.1:5000/get_folders";
  const localFoldersPath = "/db/folders.json";

  const fetchFolders = async (url: string, user: UserType) => {
    axios({method: "POST", url: url, data: {email: user?.email}})
      .then((response) => {
        const { folders } = response.data;
        folders && setFolders(folders);
        console.log(JSON.parse(response.data.data));
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
    });
  }

  useEffect(() => {
    currentUser !== null ? fetchFolders(foldersAPI, currentUser) : fetchFolders(localFoldersPath, currentUser);
  }, []);

  return (
    <Fragment>
      <TextReader />
      {currentUser ? <Link to="/folders"><button>Conversation Buttons</button></Link> :
        <ButtonsPreview />
      }
    </Fragment>
  )
}

export default Home;