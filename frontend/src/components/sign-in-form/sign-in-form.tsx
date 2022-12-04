import axios from "axios";
import { FormEvent, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import Button, { BUTTON_TYPE_CLASSES } from "../../styled-components/button-standard/button.component";
import FormInput from "../form-input/form-input";
import { ButtonsContainer, HasAccount, SignUpContainer } from "./sign-in-form.styles";
import "./sign-in-form.styles.tsx";

const SignInForm = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [signInForm, setSignInForm] = useState({email: "", password: ""});
  const navigate = useNavigate();

  const logUserIn = async (event: FormEvent) => {
    event.preventDefault();
    
    axios({method: "POST", url: "http://127.0.0.1:5000/token", data: {email: signInForm.email, password: signInForm.password}})
    .then((response) => {
        setCurrentUser(response.data);
        navigate("/");
      }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Incorrect email or password");
      }
    });
    setSignInForm(({email: "", password: ""}));
  }

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setSignInForm((prevValue) => ({...prevValue, [name]: value}));
  }

  return (
    <SignUpContainer>
        <HasAccount>Already have an account?</HasAccount>
        <span>Sign in with your email and password</span>
        <form onSubmit={logUserIn}>
            <FormInput 
                label="Email"
                type="email" 
                required name="email" 
                onChange={handleChange} 
                value={signInForm.email}
            />
            <FormInput 
                label="Password"
                type="password" 
                required name="password" 
                onChange={handleChange} 
                value={signInForm.password}
            />
            <ButtonsContainer>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Sign-in</Button>
            </ButtonsContainer>
        </form>
    </SignUpContainer>
  )
}

export default SignInForm;