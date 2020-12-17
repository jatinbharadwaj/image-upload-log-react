import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CSS/Admin.css";

function Admin() {
  return (
    <div className="Admin__Container">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>☁Uploader</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link to="/imageuploader">
            <h3>Image Uploader</h3>
          </Link>
          <Link to="uploadlogs">
            <h3>Image Logs</h3>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Admin;
