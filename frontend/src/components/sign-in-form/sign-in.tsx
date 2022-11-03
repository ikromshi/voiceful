import axios from "axios";
import { FormEvent, useState } from "react"
import useToken from "../../utils/useToke";

const SignIn = () => {
  const [logingForm, setLoginForm] = useState({email: "", password: ""});
  const { setToken } = useToken();

  const logUserIn = async (event: FormEvent) => {
    axios({method: "POST", url: "/token", data: {email: logingForm.email, password: logingForm.password}})
   .then((response) => {
      setToken(response.data.access_token);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    setLoginForm(({email: "", password: ""}));
  }

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setLoginForm((prevValue) => ({...prevValue, [name]: value}));
  }

  return (
    <div>
      <h3>SignIn</h3>
      <form className="sign-in">
        <input 
          type="email"
          onChange={handleChange} 
          placeholder="Email:"
          value={logingForm.email}/>
        <input type="password" 
          onChange={handleChange}
          name="password"
          placeholder="Password:"
          value={logingForm.password}
          />
        <button onClick={logUserIn}>Sign in</button>
      </form>
    </div>
  )
}

export default SignIn;