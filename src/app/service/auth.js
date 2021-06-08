import axios from 'axios';
import CONFIG from './config';
//import { APIServices } from "./index"

export default class Auth {

  static login(body) {
    return new Promise((resolve, reject) => {
      axios.post(CONFIG.BASE_URL + '/api/akun/login', body).then((res) => {
        setTimeout(_ => {
          resolve(res);
        }, 1000);
      }).catch(err => {
        reject(err);
      });
    })
  }
  
  static logout() {
    // let email = JSON.parse(localStorage.getItem('email'));
    // APIServices.logout(email).then(res => {
    // }).catch(err => {
    //   console.log(err);
    // })

    // sessionStorage.clear();
    localStorage.removeItem('token')
    localStorage.removeItem('role');
    window.location.reload();
  }
  
  static isLogin() {
    return !!localStorage.getItem('role');
  }
}