import create from './create'
import captor from './builtin/captor'
import isA from './builtin/is-a'
import contains from './builtin/contains'
import anything from './builtin/anything'
import argThat from './builtin/arg-that'
import not from './builtin/not'

export { Matcher } from './create'
export { Captor } from './builtin/captor'

export default {
  create,
  captor,
  isA,
  anything,
  contains,
  argThat,
  not
}
