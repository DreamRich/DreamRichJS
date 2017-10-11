const actionTypes = {
  LOGIN: {
    POST: 'login/post',
    FAIL: 'login/fail',
    SUCCESS: 'login/success',
  },

  LOGOUT: 'logout',
  PASSWORD: {
    CHANGE: 'password/change',
    SUCCESS: 'password/success',
    FAIL: 'password/fail',
    RESET: 'password/reset',
    SNACKCLOSE: 'password/snack',
    UNMOUNT: 'password/unmount'
  }
};

export default actionTypes;
