import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';

export class Auth{

  static checkAuth(){
    const minute = 1000*60;
    const quarterHour = minute*15;
    const now = Date.now();
    if (now > Auth.lastVerify+quarterHour){
      AppDispatcher.dispatch({action: ActionType.LOGOUT });
    } else {
      console.info('Time to logout (minute): '
        + (Auth.lastVerify + quarterHour - Date.now())/minute
      );
    }
  }

  static updateDate(){
    Auth.lastVerify = Date.now();
  }

  static refreshToken(){
    AppDispatcher.dispatch({
      action: ActionType.REFRESH_LOGIN,
      data: {token: Auth.getAuth()}
    });
  }

  static authenticate(token){
    console.log('Authenticate');
    if(token.token !== undefined && token.token !== null){
      if(!Auth.isAuthenticated()){
        Auth.lastVerify = Date.now();
      }
      clearInterval(Auth.loginCheck);
      clearTimeout(Auth.loginTimeout);
      Auth.loginTimeout = setTimeout(Auth.refreshToken, 1000*60*4);
      Auth.loginCheck = setInterval(Auth.checkAuth, 10000);
      localStorage.setItem('token', token.token);
      localStorage.setItem('username', token.username);
      localStorage.setItem('userid', token.id);
      localStorage.setItem('permissions', token.permissions);
    }
  }

  static isAuthenticated(){
    return (localStorage.getItem('token') != 'undefined'
      && localStorage.getItem('token') != 'null'
      && localStorage.getItem('token') != undefined
      && localStorage.getItem('token') != null);
  }
  static hasPermission(permission){
    return Auth.isAuthenticated() && (
      localStorage.getItem('permissions').split(',').map(e=> e.trim()).find(e=> e===permission)
    );
  }

  static autoLogin() {
    if(Auth.isAuthenticated()){
      Auth.updateDate();
      AppDispatcher.dispatch({
        action: ActionType.REFRESH_LOGIN,
        data: {token: Auth.getAuth()}
      });
    }
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
    clearTimeout(Auth.loginTimeout);
    return localStorage.removeItem('token');
  }

}
