import React, { Component } from "react";
// import { Link } from "react-router-dom";

import AuthService from "../services/auth.services";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangefirstname = this.onChangefirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.messageClose=this.messageClose.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      gender: "",
      loading: false,
      message: "",
      error:false,
      success:false,
      message2:""
    };
  }


  messageClose(){
    setTimeout(
      () =>{
      this.setState({ message: "",error:false })}, 
      5000
    );
    } 

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangefirstname(e) {
    this.setState({
      firstname: e.target.value,
    });
  }
  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
      message2:""
    });


      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.firstname,
        this.state.lastname,
        this.state.gender
      ).then(
        (response) => {
          console.log(response);
          this.setState({
            message: response.data.messege,
            loading: false,
            success:true
          });
        },
        (error) => {
          console.log(error);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message2: resMessage,
            error:true
          });
        }
      );
    
  }

  render() {
    // this.props.event();
    return (
      <React.Fragment>
      <div className="form">
        <form className="form__sign-up" onSubmit={this.handleRegister}>
          <h2 className="form__title">Sign Up</h2>

          <div className="form__input-field">
            <i className="fas fa-user"></i>
            <input
              placeholder="Username"
              type="text"
              className="form-control"
              name="username"
              value={this.state.username}
              onChange={this.onChangeUsername}
              required
            />
          </div>

          <div className="form__input-field">
            <i className="fas fa-address-book"></i>
          <input
            placeholder="Firstname"
            type="text"
            className="form-control"
            name="firstname"
            value={this.state.firstname}
            onChange={this.onChangefirstname}
            required
          />
          </div>

          <div className="form__input-field">
            <i className="fas fa-address-book"></i>
          <input
           placeholder="Lastname"
            type="text"
            className="form-control"
            name="lastname"
            value={this.state.lastname}
            onChange={this.onChangeLastname}
            required
          />
       </div>

       <div className="form__input-field">
            <i className="fas fa-envelope"></i>
          <input
           placeholder="Email"
            type="email"
            className="form-control"
            name="email"
            value={this.state.email}
            onChange={this.onChangeEmail}
            required
          />
          </div>

 <div className="form__input-field">
            <i className="fas fa-user-friends"></i>
          <input
            type="text"
            placeholder="Gender"
            className="form-control"
            name="email"
            value={this.state.gender}
            onChange={this.onChangeGender}
            required pattern="[Mm]ale|[Ff]emale"
          />
         </ div>

         <div className="form__input-field">
            <i className="fas fa-lock"></i>
          <input
           placeholder="Password"
            type="password"
            className="form-control"
            name="password"
            value={this.state.password}
            onChange={this.onChangePassword}
            required
          />
          </div>

          <button className="form__submit">{this.state.loading ? <div class="lds-dual-ring"></div> : "Signup"
  }</button>

          {this.state.message && this.state.success && (
            <div className="alertSucess2">
               <h4 className='headingSucess'> {this.state.message} </h4>
                {this.messageClose()}
            </div>
          )}

          {this.state.message2 && this.state.error && (
            <div className="alertfail">
               <h4 className='headingSucess'> {this.state.message2} </h4>
                {this.messageClose()}
            </div>
          )}

        </form>
        </div>


          </React.Fragment>

      
    );
  }
}
