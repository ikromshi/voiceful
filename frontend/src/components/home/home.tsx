import axios from "axios";
import { Fragment, useContext, useEffect } from "react";
import TextReader from "../text-reader/text-reader";
import { UserContext } from "../../contexts/user.context";
import { FolderContext } from "../../contexts/folder.context";
import ButtonsPreview from "../buttons-preview/buttons-preview";
import { UserType } from "../../types/types";
import Introduction from "../introduction/introduction";
import { HomeButton, HomeButtonSvg, HomeLink, HomeLinkDiv, WelcomeMessage } from "./home.styles";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const { setFolders } = useContext(FolderContext);
  const foldersAPI = "http://127.0.0.1:5000/get_folders";
  const localFoldersPath = "/db/folders.json";

  useEffect(() => {
    currentUser !== null ? fetchFoldersFromAPI(foldersAPI, currentUser, "POST", setFolders) : fetchFoldersFromAPI(localFoldersPath, currentUser, "GET", setFolders);
  }, [currentUser]);

  return (
    <Fragment>
      {!currentUser ? 
        <Introduction /> :
        <>
          <WelcomeMessage>Welcome back, {currentUser.name}!</WelcomeMessage>
          <HomeLinkDiv>
            <HomeLink to="/folders">
              <HomeButton>
                Go to your conversation buttons <HomeButtonSvg />
              </HomeButton>
            </HomeLink>
          </HomeLinkDiv>
        </>
      }
      <TextReader />
      {! currentUser ? 
        <ButtonsPreview /> :
        <></>
      }
    </Fragment>
  )
}

export const fetchFoldersFromAPI = async (url: string, user: UserType, httpMethod: string, setFolders: any) => {
  axios({method: httpMethod, url: url, data: {email: user?.email}})
    .then((response) => {
      if (httpMethod === "POST") {
        const { folders } = JSON.parse(response.data.data);
        folders && setFolders(folders);
      } else {
        const { folders } = response.data;
        folders && setFolders(folders);
        }
      }
    ).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
  });
}


export default Home;