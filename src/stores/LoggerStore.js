'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';

class LoggerStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState() { return {};}

  reduce = (state, action) => {
    console.log(`action to: ${action.action}`);
    console.info('action data: ', action);
    return state;
  }
}

export default new LoggerStore();
