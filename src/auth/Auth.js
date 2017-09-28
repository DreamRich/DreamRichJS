import AppDispatcher from '../AppDispatcher';

export class Auth{

  static checkAuth(){
    const minute = 1000*60;
    const quarter_hour = minute*15;
    if (Date.now() > Auth.start_login+quarter_hour){
      AppDispatcher.dispatch({actionType: 'logout' });
    } else {
      console.info('Time to logout (minute): '
        + (Auth.start_login + quarter_hour - Date.now())/minute
      );
    }
  }

  static updateDate(){
    Auth.start_login = Date.now();
  }

  static authenticate(token){
    console.log('Authenticate');
    if(token.token !== undefined && token.token !== null){
      Auth.start_login = Date.now();
      clearInterval(Auth.loginCheck);
      Auth.loginCheck = setInterval(Auth.checkAuth, 1000);
      localStorage.setItem('token', token.token);
      localStorage.setItem('username', token.username);
      localStorage.setItem('userid', token.id);
      localStorage.setItem('permissions', 'coisa, see_own_client_data');
    }
  }

  static isAuthenticated(){
    return localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null;
  }
  static hasPermission(permission){
    return Auth.isAuthenticated() && (
      localStorage.getItem('permissions').split(',').map(e=> e.trim()).find(e=> e===permission)
    );
  }

  static getAuth(){
    return localStorage.getItem('token');
  }

  static getUserName() {
    return localStorage.getItem('username');
  }

  static getUserId() {
    return localStorage.getItem('userid');
  }

  static deauthenticate(){
    console.log('Deauthenticate');
    clearInterval(Auth.loginCheck);
    return localStorage.removeItem('token');
  }

}
