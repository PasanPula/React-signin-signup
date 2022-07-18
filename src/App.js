import React, { Component } from "react";
import { Switch, Route, Link} from "react-router-dom";
import "./App.css";



import Login from "./component/login.component";
import Register from "./component/register.component";


class App extends Component {

  constructor(props)
  {
      super(props);
      this.state= {
        toggle:"container"
      }
      this.onSignUPToggle = this.onSignUPToggle.bind(this);
      this.onSignINToggle = this.onSignINToggle.bind(this);
  }

  onSignUPToggle() {
    this.setState({
      toggle: "container sign-up-mode",
    });
    console.log("Fired")
  }

  onSignINToggle() {
    this.setState({
      toggle: "container",
    });
  }

  render() {
  
    return (
      <React.Fragment>
      <div className={this.state.toggle}>
        <div className="container__forms">
        {/* <div className="form"> */}
          <Switch>
            <Route exact path={["/user", "/user/login"]} component={()=> <Login history={()=>this.props.history} event={()=>this.onSignINToggle} />}/>
            <Route exact path="/user/register" component={()=> <Register event={()=>this.onSignUPToggle} />} />
          </Switch>
          {/* </div> */}
        </div>
      <div className="container__panels">
            <div className="panel panel__left">
              <div className="panel__content">
                <h3 className="panel__title">Hello, Friend!</h3>
                <p className="panel__paragraph">
                  New here ? To keep connected with us please sign up with your personal info.
                </p>
                <Link to="/user/register">
                <button className="btn btn-transparent"  id="sign-up-btn" onClick={this.onSignUPToggle}>
                  Sign Up
                </button>
                </Link>
              </div>
              <img className="panel__image" src="https://d.top4top.io/p_1945xjz2y1.png" alt="" />
            </div>
            <div className="panel panel__right">
              <div className="panel__content">
                <h3 className="panel__title">One of us ?</h3>
                <p className="panel__paragraph">
                Welcome Back!,To Keep connected with us please login with your personal info
                </p>
                <Link to="/user/login">
                <button className="btn btn-transparent" id="sign-in-btn" onClick={this.onSignINToggle} >
                  Sign In
                </button>
                </Link>
              </div>
              <img className="panel__image" src="https://e.top4top.io/p_1945sidbp2.png" alt="" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
