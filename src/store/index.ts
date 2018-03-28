import _ from '../wrap/lodash'
import Stubbing from '../value/stubbing'
import { EventEmitter } from 'events'

interface StoreEntry {
  testDouble: any
  stubbings: Stubbing[]
  calls: any[],
  verifications: any[]
  name?: string
}

const storeEmitter = new EventEmitter()
let globalStore: StoreEntry[] = []

export default {
  onReset (func) {
    storeEmitter.on('reset', func)
  },

  reset () {
    globalStore = []
    storeEmitter.emit('reset')
  },

  for (testDouble, createIfNew = true) {
    const entry = _.find(globalStore, {testDouble})
    if (entry) {
      return entry
    } else if (createIfNew) {
      return _.tap<StoreEntry>({
        testDouble,
        stubbings: [],
        calls: [],
        verifications: []
      }, function (newEntry) {
        return globalStore.push(newEntry)
      })
    }
  }
}
