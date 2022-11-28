import axios from "axios";
import { FormEvent, useContext, useState } from "react"
import { UserContext } from "../../contexts/user.context";
import "./sign-up.css";

const SignUp = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [signUpForm, setSignUpForm] = useState({email: "", password: "", name: "", voice: ""});

  const signUp = async (event: FormEvent) => {
    event.preventDefault();

    axios({method: "POST", url: "http://127.0.0.1:5000/signup", data: signUpForm})
    .then((response) => {
      const { access_token } = response.data;
      setCurrentUser({...signUpForm, access_token: access_token});
      console.log(response);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Incorrect email or password");
      }
    });

    setSignUpForm(({email: "", password: "", name: "", voice: ""}))
  }

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setSignUpForm((prevValue) => ({...prevValue, [name]: value}));
  }

  return (
    <div className="sign-up">
      <h3>Sign-up form</h3>
      <form className="sign-up">
        <input 
          type="email"
          onChange={handleChange} 
          placeholder="Email:"
          name="email"
          value={signUpForm.email}/>
        <input type="password" 
          onChange={handleChange}
          name="password"
          placeholder="Password:"
          value={signUpForm.password}
          />
        <input type="name" 
          onChange={handleChange}
          name="name"
          placeholder="Name:"
          value={signUpForm.name}
          />
        <input type="voice" 
          onChange={handleChange}
          name="voice"
          placeholder="Select voice*:"
          value={signUpForm.voice}
          />
        <button onClick={signUp}>Sign in</button>
      </form>
    </div>
  )
}

export default SignUp;