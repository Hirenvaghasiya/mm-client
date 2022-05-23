import axios from "axios";
import { API_URL } from "../common/Constants";
import authHeader from "../login/auth-header";

const CATEGORY_API_URL = API_URL + "category";

class categoryapi {
  getAllCategory() {
    return axios.get(CATEGORY_API_URL, {headers: authHeader()});
  }
}

export default new categoryapi();
