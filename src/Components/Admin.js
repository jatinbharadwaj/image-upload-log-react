import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

function Admin() {
  return (
    <div className="Admin__Container">
      <h1>UPLOADER</h1>
      <Link to="/imageuploader">
        <h3>Image Uploader</h3>
      </Link>
      <Link to="uploadlogs">
        <h3>Image Logs</h3>
      </Link>
    </div>
  );
}

export default Admin;
