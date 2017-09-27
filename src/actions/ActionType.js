const actionTypes = {
  LOGIN: {
    POST: 'login/post',
    FAIL: 'login/fail',
    SUCCESS: 'login/success',
  },

  LOGOUT: 'logout',
  PASSWORD: {
    SUCCESS: 'password/success',
    FAIL: 'password/fail',
    RESET: 'password/reset',
  }
};

export default actionTypes;
