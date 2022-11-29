import "./home.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import TextReader from "../text-reader/text-reader";
import { UserContext } from "../../contexts/user.context";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  
  const fetchFolders = async (url: string) => {
    axios({method: "GET", url: url, data: currentUser?.email})
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
    });
  }

  useEffect(() => {
    const foldersAPI = "http://127.0.0.1:5000/folders";
    const localFoldersPath = "/db/folders.json";
    currentUser !== null ? fetchFolders(foldersAPI) : fetchFolders(localFoldersPath);
  }, []);

  return (
    <TextReader />
  )
}

export default Home;