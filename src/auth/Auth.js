export class Auth{

  static authenticate(token){
    console.log('activate');
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
    header['Authenticate'] = 'Token ' + Auth.getAuth();
    return header;

  }

  static deauthenticate(){
    console.log('deactivate');
    return localStorage.removeItem('token');
  }
}
