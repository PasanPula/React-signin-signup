import React, { Component } from "react";
import AuthService from "../services/auth.services";
import './profile.css';




export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangefirstname= this.onChangefirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.messageClose=this.messageClose.bind(this);
    this.logOut = this.logOut.bind(this)
    this.state = {
      currentUser: null,
      username: "",
      email: "",
      firstname:"",
      lastname:"",
      gender:"",
      loading: false,
      loading2: false,
      message: "" ,
      sucsess:false,
      message2:"",
      loading3:false,
      message3:false
    };
  }

  deleteUser() {  
    this.setState({
      loading2: true,
    });  
    AuthService.deleteAccount()
      .then(response => {
        if(response.status === 200){
        this.setState({
          message2: "Account deleted sucessfully",
          loading2:false,
          sucsess:true
        });
      }
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.messege) ||
          error.message ||
          error.toString();

        this.setState({
          loading2:false,
          message2: resMessage
        });
      })
  }

  componentDidMount () {

    this.setState({
      loading3:true,
    });
   AuthService.getCurrentUser().then(
     
    // (response) => {

    // if(response.data != null){
    //   this.setState({
    //     currentUser: response.data,
    //     username: response.data.username,
    //     email: response.data.email,
    //     firstname: response.data.firstname,
    //     lastname: response.data.lastname,
    //     gender: response.data.gender,
    //   });
    // }
    // else 
    // {
    //   console.log(null);
    // }
    // }
    response => {
      if(response.status === 200){
      this.setState({
        loading3:false,
        currentUser: response.data,
        username: response.data.username,
        email: response.data.email,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        gender: response.data.gender,
      });
    }
    },
    error => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.messege) ||
        error.message ||
        error.toString();

      this.setState({
        loading3:false,
        message3: resMessage
      });
    }
    
    
    );
  }

  messageClose(){
  setTimeout(
    () => this.setState({ message: "" }), 
    4000
  );
  }

  
  logOut(){
    AuthService.logout();
    this.props.history.push("/");
    }

  deleteClose(){
  setTimeout(
    () => {this.props.history.push("/");
      this.setState({ sucsess:false }) }, 
    3000
  );
  }


  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  onChangefirstname(e) {
    this.setState({
      firstname: e.target.value
    });
  }
  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });



      AuthService.update(
        this.state.username,
        this.state.firstname,
        this.state.lastname,
        this.state.email,
        this.state.gender,
      ).then(
        response => {
          if(response.status === 200){
          this.setState({
            message: "Profile Updated.",
            loading:false
          });
        }
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.messege) ||
            error.message ||
            error.toString();

          this.setState({
            loading:false,
            message: resMessage
          });
        }
      );
  }
  

  render() {
    const { currentUser } = this.state;

    return (

      currentUser==null ? <div>
        {this.state.loading3 && (
            <svg className="spinner" viewBox="0 0 50 50"><circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg>
          )}
        
        {this.state.message3 && (
            <div className="alertfail2">
               <h4 className='headingfail'> {this.state.message3} </h4>
               {this.props.history.push("/")};
            </div>
          )}
    </div> :
    
    
    <div className="Contain">
        <div className="w60">

       
          <h2 className="headings">
            <strong>{currentUser.username}</strong>s' Profile 
            <button className="btnlogout"
                onClick={this.logOut}
              >
                 <i className="fas fa-sign-out-alt"></i>
               Signout
              </button>
          </h2>

        <div className="image">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
        </div>

        <div className="Profileform">
        <form className="form__profile" onSubmit={this.handleRegister}>

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

         {this.state.message && (
            <div className="alertSucess">
               <h4 className='headingfail'> {this.state.message} </h4>
                {this.messageClose()}
            </div>
          )}
          {this.state.sucsess && (
            <div className="alertSucess">
               <h4 className='headingfail'> {this.state.message2} </h4>
                {this.deleteClose()}
            </div>
          )}

          <button className="form__submit">
          {this.state.loading ? <div class="lds-dual-ring"></div> : "Update"
  }</button>        
        </form>
         
        <button className="form_delete"
                onClick={this.deleteUser}
              >
               {this.state.loading2 ? <div class="lds-dual-ring"></div> : "Delete"}
              </button>
  
        </div>

        
      </div>
      </div>
    );
  }
}
