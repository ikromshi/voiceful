import axios from "axios";
import { useState } from "react"
import useToken from "../../utils/userToken";

const Profile = () => {
  const [profileData, setProfileData] = useState({profileName: "", aboutMe: ""});
  const { setToken, token } = useToken();

  const getData = () => {
    axios({method: "GET", url: "/profile", headers: {Autharization: "Bearer " + token}})
      .then((response) => {
        const res = response.data;
        res.access_token && setToken(res.access_token);
        setProfileData(({profileName: res.name, aboutMe: res.about}));
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
    });
  }

  return (
    <div className="profile">
      <p>Get your profile details: </p> <button onClick={getData}>profile</button>
      { profileData && 
        <div>
          <p>Profile name: {profileData.profileName}</p>
          <p>About me: {profileData.aboutMe}</p>
        </div>
      }
    </div>
  )
}

export default Profile;