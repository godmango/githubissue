import React from "react";
import { Button } from "react-bootstrap";

const Navbar = ({ handleSubmit }) => {
  return (
    <div className="theNavbar">
      <div className="navbarTitle">
        <img
          className="logo"
          src="https://gallant-edison-972273.netlify.app/static/media/logo.d380784a.svg"
          alt=""
        />{" "}
        <h3>Github Issue</h3>
      </div>

      <form className="navbarSearch" onSubmit={(e) => handleSubmit(e)}>
        <input className="inputNavbar" type="text" placeholder="owner/repo" />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
};

export default Navbar;
