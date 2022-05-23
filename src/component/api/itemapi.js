import axios from "axios";
import { API_URL } from "../common/Constants";
import authHeader from "../login/auth-header";

const ITEM_API_URL = API_URL + "item";

class itemapi {
  getAllItem() {
    return axios.get(ITEM_API_URL, { headers: authHeader() });
  }

  addItem(item) {
    return axios.post(ITEM_API_URL, item, { headers: authHeader() });
  }

  getItem(id) {
    return axios.get(ITEM_API_URL + "/" + id, { headers: authHeader() });
  }

  editItem(id, item) {
    return axios.put(ITEM_API_URL + "/" + id, item, { headers: authHeader() });
  }

  deleteItem(id) {
    return axios.delete (ITEM_API_URL + "/" + id, { headers: authHeader() });
  }
}

export default new itemapi();
