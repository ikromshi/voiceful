import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  return (
    <Fragment>
      <div className="nav-container">
        <h3>Navigation page</h3>
        <div className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/auth">Auth</Link>
          <Link className="nav-link" to="/text-reader">Text Reader</Link>
        </div>
      </div>
    <Outlet />
    </Fragment>
  )
}

export default Navigation;