import _ from '../wrap/lodash'

export default class Double<T> {
  fake?: any
  name?: string
  real?: T
  children?: Set<any>
  parent?: any

  static create<T> (name: string, real: T, parent: any, fakeCreator?: (double: Double<T>) => ) {
    const double = new Double(name, real, parent)
    if (fakeCreator) double.fake = fakeCreator(double)
    return double
  }

  constructor (name: string, real: T, parent: any) {
    this.name = name
    this.real = real
    this.children = new Set()
    if (parent) {
      this.parent = parent
      parent.addChild(this)
    }
  }

  addChild (child) {
    this.children.add(child)
    child.parent = this
  }

  get fullName () {
    if (!_.some(_.map(this.ancestors, 'name'))) return this.name
    return _.map(this.ancestors.concat(this), (ancestor) =>
      ancestor.name == null ? '(unnamed)' : ancestor.name
    ).join('.')
  }

  get ancestors () {
    if (!this.parent) return []
    return this.parent.ancestors.concat(this.parent)
  }

  toString () {
    return this.fullName == null ? '[test double (unnamed)]' : `[test double for "${this.fullName}"]`
  }
}
