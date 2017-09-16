
export class Auth{

  static checkAuth(){
    const minute = 1000*60;
    const quarter_hour = minute*15;
    if (Date.now() > Auth.start_login+quarter_hour){
      Auth.deauthenticate();
    } else {
      console.log('here');
    }
  }

  static updateDate(){
    Auth.start_login = Date.now();
  }

  static authenticate(token){
    console.log('Authenticate');
    Auth.start_login = Date.now();
    Auth.loginCheck = setInterval(Auth.checkAuth, 1000);
    localStorage.setItem('token', token.token);
  }

  static isAuthenticated(){
    return localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null;
  }

  static getAuth(){
    return localStorage.getItem('token');
  }

  static getHeader(additional={}){
    let header;
    if (additional !== undefined && additional !== null){
      header = additional;
    }
    header['Accept'] = 'application/json';
    header['Content-type'] = 'application/json';
    header['Authorization'] = 'JWT ' + Auth.getAuth();
    return header;
  }

  static deauthenticate(){
    console.log('Deauthenticate');
    clearInterval(Auth.loginCheck);
    return localStorage.removeItem('token');
  }

}
