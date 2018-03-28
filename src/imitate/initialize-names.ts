import _ from '../wrap/lodash'

export default (original, names?: string | string[]): string[] => {
  if (_.isString(names)) return [names]
  if (names != null) return names
  if (_.isFunction(original) && original.name) {
    return [original.name]
  } else {
    return []
  }
}
