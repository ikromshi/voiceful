import "./home.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import TextReader from "../text-reader/text-reader";
import { UserContext } from "../../contexts/user.context";
import { FolderContext } from "../../contexts/folder.context";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const { folders, setFolders } = useContext(FolderContext);
  const foldersAPI = "http://127.0.0.1:5000/folders";
  const localFoldersPath = "/db/folders.json";

  const fetchFolders = async (url: string) => {
    axios({method: "GET", url: url, data: currentUser?.email})
      .then((response) => {
        console.log(response.data);
        const { foldersJson } = response.data;
        foldersJson && setFolders(foldersJson);
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
    });
  }

  currentUser !== null ? fetchFolders(foldersAPI) : fetchFolders(localFoldersPath);

  return (
    <TextReader />
  )
}

export default Home;