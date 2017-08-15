class Auth{
  authenticate(token){
    localStorage.setItem('token', token);
  }
  isAuthenticated(){
    return localStorage.getItem('token') !== undefined;
  }
  deauthenticate(){
    localStorage.removeItem('token');
  }
}
