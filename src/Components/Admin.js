import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

import { useStateValue } from "./StateProvider";
import "./CSS/Admin.css";

function Admin() {
  const [{ user }, dipatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  console.log(user);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>☁Uploader</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {user &&
        (user.email === "admin1@gmail.com" ||
          user.email === "admin2@gmail.com") ? (
          <Link to="/imageuploader" className="header__optionOne">
            Image Uploader
          </Link>
        ) : (
          <p></p>
        )}

        <Link to="/uploadlogs" className="header__optionTwo">
          Image Logs
        </Link>
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            Hello!! {!user ? "Guest" : user.email} {"  "}
            {user ? "Sign Out" : "Sign In"}
          </div>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Admin;
