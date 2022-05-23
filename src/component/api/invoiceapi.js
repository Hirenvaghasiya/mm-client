import axios from "axios";
import { API_URL } from "../common/Constants";
import authHeader from "../login/auth-header";

const INVOICE_API_URL = API_URL + "invoice";
class invoiceapi {
  getAllInvoice() {
    return axios.get(INVOICE_API_URL, { headers: authHeader() });
  }

  addInvoice(newInvoice) {
    return axios.post(INVOICE_API_URL, newInvoice, { headers: authHeader() });
  }
}

export default new invoiceapi();
