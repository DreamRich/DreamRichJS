export class Auth{

  static authenticate(token){
    const timeout =1000 * 60; // 1000 (ms) * 60 (s) = 1 minute
    localStorage.setItem('token', token.token);
    setTimeout(Auth.deauthenticate, timeout);
  }

  static isAuthenticated(){
    return localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null;
  }

  static getAuth(){
    return localStorage.getItem('token');
  }

  static deauthenticate(){
    return localStorage.removeItem('token');
  }
}
