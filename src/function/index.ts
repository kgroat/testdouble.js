
import { Function0, Function1, Function2, Function3, Function4 } from 'lodash/function'

import _ from '../wrap/lodash'

import create from './create'

interface FuncType {
  ()
}

const func = (nameOrFunc) => {
  if (_.isFunction(nameOrFunc)) {
    return create(_.isEmpty(nameOrFunc.name) ? null : nameOrFunc.name, nameOrFunc).fake
  } else {
    return create(nameOrFunc, null).fake
  }
}
