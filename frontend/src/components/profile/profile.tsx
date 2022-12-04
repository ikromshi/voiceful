import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/user.context";
import Button, { BUTTON_TYPE_CLASSES } from "../../styled-components/button-standard/button.component";
import FormInput from "../form-input/form-input";
import { HasAccount, SignUpContainer } from "../sign-in-form/sign-in-form.styles";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [profileForm, setProfileForm] = useState({email: "", password: "", name: "", voice: "", access_token: "", id: currentUser ? currentUser.id : -1});

  useEffect(() => {
    if (currentUser !== null) {
      setProfileForm(currentUser);
    }
  }, []);


  const saveData = async (event: FormEvent) => {
    event.preventDefault();
    setCurrentUser(profileForm);

    axios({method: "POST", url: "http://127.0.0.1:5000/profile", headers: {Authorization: "Bearer " + profileForm.access_token}, data:profileForm})
      .then((response) => {
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
    <SignUpContainer className="profile">
      <div className="pfofile-data-div">

        <div className="header-div">
          <HasAccount>Your Profile</HasAccount>
          <span>Add information about yourself</span>
        </div>

        <div className="form-div">
          <form>
            <FormInput 
              type="email"
              onChange={handleChange} 
              placeholder="Email:"
              name="email"
              value={profileForm.email}
              label=""
              />
            <FormInput type="password" 
              label=""
              onChange={handleChange}
              name="password"
              placeholder="Password:"
              value={profileForm.password}
              />
            <FormInput type="name" 
              label=""
              onChange={handleChange}
              name="name"
              placeholder="Name:"
              value={profileForm.name}
              />
            <Button onClick={saveData} buttonType={BUTTON_TYPE_CLASSES.inverted}>
              <span>Save</span>
            </Button>
          </form>
        </div>
      </div>
    </SignUpContainer>
  )
}

export default Profile;