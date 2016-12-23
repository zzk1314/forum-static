/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule update
 */

/* global hasOwnProperty:true */

"use strict"

import { assign } from "lodash"
import keyOf from "fbjs/lib/keyOf"
import invariant from "fbjs/lib/invariant"
let hasOwnProperty = ({}).hasOwnProperty

function shallowCopy(x) {
  if (Array.isArray(x)) {
    return x.concat()
  } else if (x && typeof x === "object") {
    return assign(new x.constructor(), x)
  } else {
    return x
  }
}

let COMMAND_PUSH = keyOf({ $push: null })
let COMMAND_UNSHIFT = keyOf({ $unshift: null })
let COMMAND_SPLICE = keyOf({ $splice: null })
let COMMAND_SET = keyOf({ $set: null })
let COMMAND_MERGE = keyOf({ $merge: null })
let COMMAND_APPLY = keyOf({ $apply: null })

let ALL_COMMANDS_LIST = [COMMAND_PUSH, COMMAND_UNSHIFT, COMMAND_SPLICE, COMMAND_SET, COMMAND_MERGE, COMMAND_APPLY]

let ALL_COMMANDS_SET = {}

ALL_COMMANDS_LIST.forEach(function (command) {
  ALL_COMMANDS_SET[command] = true
})

function invariantArrayCase(value, spec, command) {
  !Array.isArray(value) ? process.env.NODE_ENV !== "production" ? invariant(false, "update(): expected target of %s to be an array got %s.", command, value) : invariant(false) : undefined
  let specValue = spec[command]
  !Array.isArray(specValue) ? process.env.NODE_ENV !== "production" ? invariant(false, "update(): expected spec of %s to be an array got %s. " + "Did you forget to wrap your parameter in an array?", command, specValue) : invariant(false) : undefined
}

function update(value, spec) {
  !(typeof spec === "object") ? process.env.NODE_ENV !== "production" ? invariant(false, "update(): You provided a key path to update() that did not contain one " + "of %s. Did you forget to include {%s: ...}?", ALL_COMMANDS_LIST.join(", "), COMMAND_SET) : invariant(false) : undefined

  if (hasOwnProperty.call(spec, COMMAND_SET)) {
    !(Object.keys(spec).length === 1) ? process.env.NODE_ENV !== "production" ? invariant(false, "Cannot have more than one key in an object with %s", COMMAND_SET) : invariant(false) : undefined

    return spec[COMMAND_SET]
  }

  // fixme 对于数组， 可允许为 undefined
  let nextValue = shallowCopy(value)
  if (hasOwnProperty.call(spec, COMMAND_PUSH)
    || hasOwnProperty.call(spec, COMMAND_UNSHIFT)
    || hasOwnProperty.call(spec, COMMAND_SPLICE)) {
    nextValue = nextValue || []
    value = []
  }

  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
    let mergeObj = spec[COMMAND_MERGE]
    !(mergeObj && typeof mergeObj === "object") ? process.env.NODE_ENV !== "production" ? invariant(false, "update(): %s expects a spec of type \"object\" got %s", COMMAND_MERGE, mergeObj) : invariant(false) : undefined
    !(nextValue && typeof nextValue === "object") ? process.env.NODE_ENV !== "production" ? invariant(false, "update(): %s expects a target of type \"object\" got %s", COMMAND_MERGE, nextValue) : invariant(false) : undefined
    assign(nextValue, spec[COMMAND_MERGE])
  }

  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
    invariantArrayCase(value, spec, COMMAND_PUSH)
    spec[COMMAND_PUSH].forEach(function (item) {
      nextValue.push(item)
    })
  }

  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
    invariantArrayCase(value, spec, COMMAND_UNSHIFT)
    spec[COMMAND_UNSHIFT].forEach(function (item) {
      nextValue.unshift(item)
    })
  }

  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
    !Array.isArray(value) ? process.env.NODE_ENV !== "production" ? invariant(false, "Expected %s target to be an array got %s", COMMAND_SPLICE, value) : invariant(false) : undefined
    !Array.isArray(spec[COMMAND_SPLICE]) ? process.env.NODE_ENV !== "production" ? invariant(false, "update(): expected spec of %s to be an array of arrays got %s. " + "Did you forget to wrap your parameters in an array?", COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined
    spec[COMMAND_SPLICE].forEach(function (args) {
      !Array.isArray(args) ? process.env.NODE_ENV !== "production" ? invariant(false, "update(): expected spec of %s to be an array of arrays got %s. " + "Did you forget to wrap your parameters in an array?", COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined
      nextValue.splice.apply(nextValue, args)
    })
  }

  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
    !(typeof spec[COMMAND_APPLY] === "function") ? process.env.NODE_ENV !== "production" ? invariant(false, "update(): expected spec of %s to be a function got %s.", COMMAND_APPLY, spec[COMMAND_APPLY]) : invariant(false) : undefined
    nextValue = spec[COMMAND_APPLY](nextValue)
  }

  for (let k in spec) {
    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
      // FIXME 如果 undefined, 就 {}
      nextValue[k] = update(value[k] || {}, spec[k])
    }
  }

  return nextValue
}

export default update
