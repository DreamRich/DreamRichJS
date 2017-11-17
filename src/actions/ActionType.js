const actionTypes = {
  APP: {
    SWITCHNAVDRAWER: 'app/drawer_toggle',
    MENUTOGGLE: 'app/menu_toggle',
  },
  MENU: {
    TOGGLEMENU: 'menu/toggle_side_menu',
    REQUESTCHANGE: 'menu/change_side_menu',
  },
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
    SELECTDEPENDENT: 'client/select_dependent',
    SUBMIT: 'client/can_submit_form',
    POSTMULTIFORM: 'client/create_multiline_form',
    POSTMULTIFORMSUCCESS: 'client/create_multiline_form_success',
    ADDRESSTYPE: 'client/address_types',
    DATAFORM: 'client/form_initial_data',
    COUNTRIES: 'client/countries',
    STATES: 'client/states',
    STATESUCCESS: 'client/states_success',
    POSTFORM: 'client/create_active',
    POSTFORMSUCCESS: 'client/create_active_success',
    GETFORMSUCCESS: 'client/get_active_success',
    SUBFORM: 'client/create_subforms',
    ADDDEPENDENT: 'client/add_dependent',
    REMOVEDEPENDENT: 'client/remove_dependent',
    ID: 'client/get_client_data',
    ADDRESSTEXT: 'client/change_address_type_text',
    SETSTEP: 'client/change_step',
  },
  REFRESH_LOGIN: 'refresh_token',
  REGULARCOST: {
    SUBMIT: 'regular_cost/submit_forms',
    SUBMITSUCCESS: 'regular_cost/success_forms',
    ADD: 'regular_cost/add',
    SELECT: 'regular_cost/select',
    REMOVE: 'regular_cost/remove',
    SUCCESS: 'regular_cost/form_success',
    TYPESUCCESS: 'regular_cost/types_success',
    GETFORMSUCCESS: 'regular_cost/get_regular_cost_success',
  },
  GOAL:{
    SUBMIT: 'goal/can_submit_forms',
    ADD: 'goal/add',
    REMOVE: 'goal/remove',
    MANAGER: 'goal/submit_form',
    SUCCESS: 'goal/form_success',
    TYPE: 'goal/types',
    TYPESUCCESS: 'goal/types_success',
    HASEND: 'goal/form_toggle',
    SUBFORM: 'goal/create_subforms',
    SUBFORMSUCCESS: 'goal/success_subforms',
    GETFORMSUCCESS: 'goal/get_goal_success',
  },
  PATRIMONY: {
    POSTFORM: 'patrimony/create_form',
    POSTFORMSUCCESS: 'patrimony/success',
    POSTMULTIFORM: 'patrimony/create_subforms',
    POSTMULTIFORMSUCCESS: 'patrimony/create_subforms_success',
    GETFORMSUCCESS: 'patrimony/get_patrimony_success',
    SETSTEP: 'patrimony/set_step',
    SUBMIT: 'patrimony/submit_form',
    ADD: 'patrimony/add_item',
    REMOVE: 'patrimony/remove_item',
    MANAGERSUCCESS: 'patrimony/create_manager_success',
  },
  ACTIVE: {
    TYPE: 'active/types',
    TYPESUCCESS: 'active/types_success',
    FORM: 'active/create_form',
    SUCCESS: 'active/manager_success_form',
    MANAGER: 'active/create_manager',
    GETMANAGER: 'active/obtain_manager',
    DELETEPROFIT: 'active/remove_active',
    ADD: 'active/add_active_list',
    REMOVE: 'active/remove_active_list',
  },
  REGISTER: {
    STORE: 'register/get_financial_planning',
    FINANCIALPLANNING: 'register/submit_financial_planning',
  },
  RESETFORMSTORES: 'reset_stores_forms',
};

export default actionTypes;
