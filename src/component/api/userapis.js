import axios from "axios";
import { API_URL } from "../common/Constants";

const USER_API_URL = API_URL + "auth/";

class userapis {
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

  logout() {
    localStorage.removeItem("user");
  }
}

export default new userapis();
