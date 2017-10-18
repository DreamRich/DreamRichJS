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
  },
  CLIENT: {
    ACTIVE: 'client/create_active',
    ACTIVESUCCESS: 'client/create_active_success',
    SUBFORM: 'client/create_subforms',
  },
  REFRESH_LOGIN: 'refresh_token',
  FIXEDCOST: {
    ADD: 'fixed_cost/add',
    REMOVE: 'fixed_cost/remove',
    MANAGER: 'fixed_cost/submit_form',
    SUCCESS: 'fixed_cost/form_success',
    TYPE: 'fixed_cost/types',
    TYPESUCCESS: 'fixed_cost/types_success',
  },
};

export default actionTypes;
