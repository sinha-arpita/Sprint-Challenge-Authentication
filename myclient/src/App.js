import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { NavLink, Route } from "react-router-dom";
import SignUp from "./signup/SignUp";
import SignIn from "./signin/SignIn";
import Jokes from "./jokes/Jokes";

class App extends Component {
  constructor() {
    super();
    this.state = {
      signedInUser: null
    };
  }

  userSignedIn = user => {
    this.setState({ signedInUser: user });
  };

  render() {
    if (this.state.signedInUser) {
      return (
        <div className="App">
          
          <main>
            Hello {this.state.signedInUser}, Welcome! 
            &nbsp; | &nbsp;
            <hr/>
            <NavLink to="/jokes">Jokes</NavLink>
            <Route path="/jokes" component={Jokes} />
          </main>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header>
            <NavLink to="/signup">SignUp </NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/signin">SignIn </NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/jokes">Jokes</NavLink>
          </header>
          <main>
            <Route path="/signup" component={SignUp} />
            {/* <Route path ="/signin" component={SignIn} userSignedIn = {this.userSignedIn}/> */}
            <Route
              exact
              path="/signin"
              render={props => (
                <SignIn {...props} userSignedIn={this.userSignedIn} />
              )}
            />

            <Route path="/jokes" component={Jokes} />
          </main>
        </div>
      );
    }
  }
}

export default App;
