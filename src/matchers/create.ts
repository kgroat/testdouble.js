import _ from '../wrap/lodash'
import stringifyArguments from '../stringify/arguments'

export type Matcher<T> = (...args) => T

interface PrivateMatcher<T> extends Matcher<T> {
  __name?: string
  __matches?: {
    (...args): any
    afterSatisfaction?: (arg?) => any
  }
}

export default <T>(config): Matcher<T> =>
  (...matcherArgs) => {
    _.tap({
      __name: nameFor(config, matcherArgs),
      __matches (actualArg) {
        return config.matches(matcherArgs, actualArg)
      }
    } as PrivateMatcher<T>, (matcherInstance) => {
      matcherInstance.__matches.afterSatisfaction = (actualArg) => {
        _.invoke(config, 'afterSatisfaction', matcherArgs, actualArg)
      }
      _.invoke(config, 'onCreate', matcherInstance, matcherArgs)
    })
  }

var nameFor = (config, matcherArgs) => {
  if (_.isFunction(config.name)) {
    return config.name(matcherArgs)
  } else if (config.name != null) {
    return `${config.name}(${stringifyArguments(matcherArgs)})`
  } else {
    return `[Matcher for (${stringifyArguments(matcherArgs)})]`
  }
}
