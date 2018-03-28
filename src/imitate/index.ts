import * as Map from 'es6-map'

import initializeNames from './initialize-names'
import createImitation from './create-imitation'
import overwriteChildren from './overwrite-children'
import { Function0 } from 'lodash';


const imitate = <T>(original: T, names?, encounteredObjects = new Map()): T => {
  if (encounteredObjects.has(original)) return encounteredObjects.get(original)
  names = initializeNames(original, names)
  const target = createImitation(original, names)
  encounteredObjects.set(original, target)
  overwriteChildren(original, target, (originalValue, name) =>
    imitate(originalValue, names.concat(name), encounteredObjects)
  )
  return target
}

export default imitate
