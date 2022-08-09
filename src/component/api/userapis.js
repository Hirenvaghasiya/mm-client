import { Component } from 'react'
import { API_URL } from '../common/Constants'
import authHeader from '../login/auth-header';
import axios from 'axios';
const USER_API_URL = API_URL + "user";
class userapis extends Component {

    getAllUsers(){
        return axios.get(USER_API_URL,  {headers : authHeader()})
    }
}

export default new userapis()