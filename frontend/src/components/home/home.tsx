import "./home.css";
import axios from "axios";
import { Fragment, useContext, useEffect } from "react";
import TextReader from "../text-reader/text-reader";
import { UserContext } from "../../contexts/user.context";
import { FolderContext } from "../../contexts/folder.context";
import ButtonsPreview from "../buttons-preview/buttons-preview";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const { setFolders } = useContext(FolderContext);
  const foldersAPI = "http://127.0.0.1:5000/folders";
  const localFoldersPath = "/db/folders.json";

  const fetchFolders = async (url: string) => {
    axios({method: "GET", url: url, data: currentUser?.email})
      .then((response) => {
        const { folders } = response.data;
        folders && setFolders(folders);
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
    });
  }

  useEffect(() => {
    currentUser !== null ? fetchFolders(foldersAPI) : fetchFolders(localFoldersPath);
  }, []);

  return (
    <Fragment>
      <TextReader />
      {!currentUser && 
        <ButtonsPreview />
      }
    </Fragment>
  )
}

export default Home;