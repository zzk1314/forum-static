import * as _ from "lodash"
// import UA from "ua-device"

export function isPending(state, key): boolean {
	return _.get(state, '$view.$pending') ? _.get(state, '$view.$pending')[key] : false
}

// export function isIOS() {
// 	return _.get(new UA(navigator.userAgent), 'os.name') === 'iOS'
// }