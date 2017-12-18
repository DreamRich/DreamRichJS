'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';

class LoggerStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState() { return {};}

  reduce = (state, data) => {
    const {action, ...rest} = data;
    console.info(`Logger (${action}): `, rest);
    return state;
  }
}

export default new LoggerStore();
