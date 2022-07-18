import React, { Component } from "react";
import AuthService from "../services/auth.services";
import { withRouter } from "react-router-dom";


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

  
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          console.log(this.props.history);
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          var resMessage;
          if(error.response.status === 401){
            resMessage ="Invalid Username or Password";
          }
          else
          {
           resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            console.log(error.response.status);
          }
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );

  }

  render() {
    this.props.event();
    return (
      <div className="form">
          <form className="form__sign-in"
            onSubmit={this.handleLogin}
          >
            <h2 className="form__title">Sign In</h2>

            <div className="form__input-field">
                  <i className="fas fa-user"></i>
                  <input className="form-control" type="text" placeholder="Username"  name="username" value={this.state.username}
                onChange={this.onChangeUsername}
                 required />
            </div>


               <div className="form__input-field">
                  <i className="fas fa-lock"></i>
                  <input className="form-control" type="password" placeholder="Password" name="password" value={this.state.password}
                onChange={this.onChangePassword}
                required/>
                </div>



              <button
                className="form__signin"
                disabled={this.state.loading}
              >
                {this.state.loading ? <div class="lds-dual-ring"></div> : "Login"}
              </button>


              {this.state.message && (
            <div className="alertfail">
               <h4 className='headingfail'> {this.state.message} </h4>
            </div>
          )}
          </form>
    </div>
          
    );
  }
}

export default withRouter(Login)