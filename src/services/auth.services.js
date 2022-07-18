import axios from "axios";
import authHeader from './auth-header';

const API_URL = "https://user-profile-management.herokuapp.com/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "users/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, firstname, lastname, gender) {
    return axios.post(API_URL + "users/singup", {
      username,
      password,
      firstname,
      lastname,
      email,
      gender 
    }).then( response => {
      console.log(response);
      return response;
    })
  }

  update(username, firstname, lastname,email, gender) {
    return axios.put(API_URL + 'profile',{
      username,
      firstname,
      lastname,
      email,
      gender },{ headers: authHeader()} 
  ).then( response => {
      return response;
    })
  }

  getCurrentUser() {
    return axios.get(API_URL + 'profile', { headers: authHeader() }).then( response => {
      return response;
    })
  }

   deleteAccount()
   {
    return axios.delete(API_URL + 'profile', { headers: authHeader() }).then( response => {
      return response;
    })
   }


}

export default new AuthService();