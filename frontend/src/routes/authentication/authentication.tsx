import { Fragment } from "react";
import SignIn from "../../components/sign-in-form/sign-in";
import SignUp from "../../components/sign-up-form/sign-up";
import "./authentication.css";

const Authentication = () => {
  return (
    <div className="authentication">
      <SignIn />
      <SignUp />
    </div >
  )
}

export default Authentication;