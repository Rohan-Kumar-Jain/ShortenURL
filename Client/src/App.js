import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Shorten from "./components/Shorten";
import Resetpassword from "./components/Resetpassword";
import Auth from "./components/Auth";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/shorten" component={Shorten} />
          <Route exact path="/users/resetpassword/:token" component={Resetpassword} />
          <Route path="/index.html" component={Login} />
          <Route exact path="/users/authenticate/:token" component={Auth} />    
        </div>
      </Router>
    );
  }
}

export default App;
