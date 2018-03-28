import create, { Matcher } from '../create'

export interface Captor<T> {
  capture(): T
  value?: T
  values?: T[]
}

export default <T>() => {
  const captor: Captor<T> = {
    capture: create({
      name: 'captor.capture',
      matches (matcherArgs, actual) {
        return true
      },
      afterSatisfaction (matcherArgs, actual) {
        captor.values = captor.values || []
        captor.values.push(actual)
        captor.value = actual
      },
    }),
    values: [],
    value: undefined,
  }
  return captor
}
