import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";
import "./navigation.css";

const Navigation = () => {
  return (
    <Fragment>
      <h3>Navigation page</h3>
      <Link to="/auth">Auth</Link> <br></br>
      <Link to="/">Home</Link>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;