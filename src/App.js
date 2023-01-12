import "./App.css";
import PrivateRoute from './PrivateRoute'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./Profile";
import Register from "./Register";
import VerifyEmail from "./VerifyEmail";
import Login from "./Login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { AuthProvider } from "./AuthContext";

function App() {

  const [timeActive, setTimeActive] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <Router>
     <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Switch>
          <Route exact path="/" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/verify-email" component={VerifyEmail} />
          <PrivateRoute exact path="/" component={Profile} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
