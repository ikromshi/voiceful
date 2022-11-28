import axios from "axios";
import { FormEvent, useState, useContext } from "react"
import { UserContext } from "../../contexts/user.context";
import "./sign-in-form.css";

const SignInForm = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [signInForm, setSignInForm] = useState({email: "", password: ""});

  const logUserIn = async (event: FormEvent) => {
    event.preventDefault();
    
    axios({method: "POST", url: "http://127.0.0.1:5000/token", data: {email: signInForm.email, password: signInForm.password}})
    .then((response) => {
        setCurrentUser(response.data);
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
    <div>
      <h3>SignIn</h3>
      <form className="sign-in">
        <input 
          type="email"
          onChange={handleChange} 
          placeholder="Email:"
          name="email"
          value={signInForm.email}/>
        <input type="password" 
          onChange={handleChange}
          name="password"
          placeholder="Password:"
          value={signInForm.password}
          />
        <button onClick={logUserIn}>Sign in</button>
      </form>
    </div>
  )
}

export default SignInForm;