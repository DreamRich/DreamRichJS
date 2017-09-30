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
    SNACKCLOSE: 'password/snack'
  },
  CLIENT: {
    ACTIVE: 'client/create_active',
    ACTIVESUCCESS: 'client/create_active_success',
    SUBFORM: 'client/create_subforms',
  }  
};

export default actionTypes;
