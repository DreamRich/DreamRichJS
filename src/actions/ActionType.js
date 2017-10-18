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
    SUBFORM: 'fixed_cost/create_subforms',
  },
  GOAL:{
    ADD: 'goal/add',
    REMOVE: 'goal/remove',
    MANAGER: 'goal/submit_form',
    SUCCESS: 'goal/form_success',
    TYPE: 'goal/types',
    TYPESUCCESS: 'goal/types_success',
    HASEND: 'goal/form_toggle',
    SUBFORM: 'goal/create_subforms',
  },
  PATRIMONY: {
  }
};

export default actionTypes;
