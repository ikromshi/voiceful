import { Fragment } from "react";
import SignIn from "../../components/sign-in-form/sign-in";
import SignUp from "../../components/sign-up-form/sign-up";
import "./authentication.css";

const Authentication = () => {
  return (
    <Fragment>
      <SignIn />
      <SignUp />
    </Fragment>
  )
}

export default Authentication;