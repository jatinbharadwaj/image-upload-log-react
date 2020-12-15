import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Admin from "./Components/Admin";
import UploadImage from "./Components/UploadImage";
import ImageUploader from "./Components/ImageUploader";
import Login from "./Components/Login";
import { useStateValue } from "./Components/StateProvider.js";
import UploadLogs from "./Components/UploadLogs";
import { auth } from "./firebase";

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
        </Switch>

        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>

        <Switch>
          <Route path="/imageuploader">
            <ImageUploader />
          </Route>
        </Switch>

        <Switch>
          <Route path="/uploadlogs">
            <UploadLogs />
          </Route>
        </Switch>

        <Route path="/">{/* <Admin /> */}</Route>
      </div>
    </Router>
  );
}

export default App;
