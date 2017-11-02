'use strict';

import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {
  dispatchDefer = (objectPayload) => {
    setTimeout(this.dispatch.bind(this), 0, objectPayload);
  }
}

export default new AppDispatcher();
