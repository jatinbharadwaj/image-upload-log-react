import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Admin from "./Components/Admin";
import UploadImage from "./Archives/UploadImage";
import ImageUploader from "./Components/ImageUploader";
import Login from "./Components/Login";
import { useStateValue } from "./Components/StateProvider.js";
import UploadLogs from "./Archives/UploadLogs";
import { auth } from "./firebase";
import DisplayImage from "./Components/DisplayImage";
import Upload from "./Archives/UploadMultiplefiles";
import Photos from "./Archives/Display";

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("User is =>", authUser);

      if (authUser) {
        // the user just logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is loged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/admin">
            <Admin />
          </Route>

          <Route path="/imageuploader">
            <ImageUploader />
          </Route>

          <Route path="/uploadlogs">
            <DisplayImage />
          </Route>

          <Route path="/upload">
            <ImageUploader />
          </Route>

          <Route path="/display">
            <DisplayImage />
          </Route>

          <Route path="/">
            <Admin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
