
import { Function0, Function1, Function2, Function3, Function4 } from 'lodash/function'

import { Constructor0, Constructor1, Constructor2, Constructor3, Constructor4 } from 'types/Constructor'

import _ from './wrap/lodash'
import calls from './store/calls'
import store from './store'
import stubbings from './store/stubbings'
import imitate from './imitate'

interface FuncType {
  <T extends Constructor0<R>, R = {}>(name: string, __optionalName?: string): T
  (name: string, __optionalName?: string): () => void
  <T>(name: string, __optionalName?: string): () => T
  <R>(original: Function0<R>): Function0<R>
  <T1, R>(original: Function1<T1, R>): Function1<T1, R>
  <T1, T2, R>(original: Function2<T1, T2, R>): Function2<T1, T2, R>
  <T1, T2, T3, R>(original: Function3<T1, T2, T3, R>): Function3<T1, T2, T3, R>
  <T1, T2, T3, T4, R>(original: Function4<T1, T2, T3, T4, R>): Function4<T1, T2, T3, T4, R>
  <T>(original: Constructor0<T>): Constructor0<T>
  <A1, T>(original: Constructor1<A1, T>): Constructor1<A1, T>
  <A1, A2, T>(original: Constructor2<A1, A2, T>): Constructor2<A1, A2, T>
  <A1, A2, A3, T>(original: Constructor3<A1, A2, A3, T>): Constructor3<A1, A2, A3, T>
  <A1, A2, A3, A4, T>(original: Constructor4<A1, A2, A3, A4, T>): Constructor4<A1, A2, A3, A4, T>
}

const func: FuncType = (nameOrFunc: any, __optionalName?: string) => {
  return _.isFunction(nameOrFunc)
    ? imitate(nameOrFunc) as any
    : createTestDoubleNamed((nameOrFunc as string) || __optionalName)
}

var createTestDoubleNamed = function (name: string) {
  return _.tap(createTestDoubleFunction(), (testDouble) => {
    const entry = store.for(testDouble, true)
    if (name != null) {
      entry.name = name
      testDouble.toString = () => `[test double for "${name}"]`
    } else {
      testDouble.toString = () => '[test double (unnamed)]'
    }
  })
}

var createTestDoubleFunction = function () {
  return function testDouble (...args) {
    calls.log(testDouble, args, this)
    return stubbings.invoke(testDouble, args, this)
  }
}

export default func
