import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/user.context";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [profileForm, setProfileForm] = useState({email: "", password: "", name: "", voice: "", access_token: ""});

  useEffect(() => {
    if (currentUser !== null) {
      setProfileForm(currentUser);
    }
  }, []);


  const saveData = async () => {
    setCurrentUser(profileForm);

    axios({method: "POST", url: "http://127.0.0.1:5000/profile", headers: {Authorization: "Bearer " + profileForm.access_token}, data:profileForm})
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

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
      const { value, name } = event.target as HTMLInputElement;
      setProfileForm((prevValue) => ({...prevValue, [name]: value}));
    }

  return (
    <div className="profile">
      <div className="pfp-div"></div>
      <div className="pfofile-data-div">

        <div className="header-div">
          <h2>Your Profile</h2>
          <h4>Add information about yourself</h4>
        </div>

        <div className="form-div">
          <form>
            <input 
              type="email"
              onChange={handleChange} 
              placeholder="Email:"
              name="email"
              value={profileForm.email}/>
            <input type="password" 
              onChange={handleChange}
              name="password"
              placeholder="Password:"
              value={profileForm.password}
              />
            <input type="name" 
              onChange={handleChange}
              name="name"
              placeholder="Name:"
              value={profileForm.name}
              />
            <input type="voice" 
              onChange={handleChange}
              name="voice"
              placeholder="Select voice*:"
              value={profileForm.voice}
              />
            <button onClick={saveData}></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile;