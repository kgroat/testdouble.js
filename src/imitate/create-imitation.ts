import _ from '../wrap/lodash'

import { Constructor0, Constructor1, Constructor2, Constructor3, Constructor4 } from 'types/Constructor'

import tdFunction from '../function'
import isGenerator from './is-generator'
import { Function0, Function1, Function2, Function3, Function4 } from 'lodash/function'

interface CreateImitationType {
  <T>(original: T[]): T[]
  (original: IArguments): any[]
  (original: GeneratorFunction): GeneratorFunction
  <R>(original: Function0<R>, names?: string[]): Function0<R>
  <T1, R>(original: Function1<T1, R>, names?: string[]): Function1<T1, R>
  <T1, T2, R>(original: Function2<T1, T2, R>, names?: string[]): Function2<T1, T2, R>
  <T1, T2, T3, R>(original: Function3<T1, T2, T3, R>, names?: string[]): Function3<T1, T2, T3, R>
  <T1, T2, T3, T4, R>(original: Function4<T1, T2, T3, T4, R>, names?: string[]): Function4<T1, T2, T3, T4, R>
  <T>(original: Constructor0<T>, names?: string[]): Constructor0<T>
  <A1, T>(original: Constructor1<A1, T>, names?: string[]): Constructor1<A1, T>
  <A1, A2, T>(original: Constructor2<A1, A2, T>, names?: string[]): Constructor2<A1, A2, T>
  <A1, A2, A3, T>(original: Constructor3<A1, A2, A3, T>, names?: string[]): Constructor3<A1, A2, A3, T>
  <A1, A2, A3, A4, T>(original: Constructor4<A1, A2, A3, A4, T>, names?: string[]): Constructor4<A1, A2, A3, A4, T>
  <T extends {}>(original: T): T
}

const createImitation: CreateImitationType = (original: any, names?: string[]) => {
  if (_.isArray(original) || _.isArguments(original)) {
    return []
  } else if (_.isFunction(original)) {
    if (isGenerator(original)) {
      return original
    } else {
      // TODO: this will become src/function/create and include parent reference instead of name joining here
      return tdFunction(_.map(names, String).join('') || '(anonymous function)')
    }
  } else {
    return _.clone(original)
  }
}

export default createImitation
