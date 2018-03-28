

import Stubbing from '../value/Stubbing'

import _ from '../wrap/lodash'

import StubbingRegister from '../value/stubbing-register'
import argsMatch from '../args-match'

export default function findLastStubbingMatch (double, call) {
  return _.findLast(StubbingRegister.instance.get(double), (stubbing: Stubbing) =>
    argsMatch(stubbing.args, call.args, stubbing.config) && stubbing.hasTimesRemaining
  )
}
