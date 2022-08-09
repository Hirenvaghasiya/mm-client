import axios from "axios";
import { API_URL } from "../common/Constants";
import authHeader from "../login/auth-header";

const USER_API_URL = API_URL + "auth/";

class loginapis {
  login(username, password) {
    return axios
      .post(USER_API_URL + "signin", {
        usernameOrEmail: username,
        password: password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getAllUsers(){
    return axios.get(USER_API_URL, { headers: authHeader() });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new loginapis
();
