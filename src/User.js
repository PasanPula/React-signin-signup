import React, { Component } from "react";
import { Switch, Route, Redirect} from "react-router-dom";
import App from "./App";
import Profile from "./component/profile.component";

class User extends Component {
    render() { 
        return (
            <Switch>
            <Route path="/user" component={App}/>
            <Route exact path="/profile" component={Profile} />
            <Redirect to="/user" />
          </Switch>
        )
    }
}
 
export default User;