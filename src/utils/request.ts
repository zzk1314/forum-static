import qs from "qs"
import * as _ from "lodash"
import { get, post } from "axios";

export class BreakSignal {
  constructor(text){
    this.response = text;
  }
  private response:String;
};

export function appendQs(query: Object): string {
	return !query ? "" : `?${qs.stringify(query)}`
}

export function pget(url: string ,query?: Object) {
	return get(`${url}${appendQs(query)}`).then((res) => res.data).catch(error => {
		if (error.response) {
			log(JSON.stringify(error.response))
		} else {
			log(error.message)
		}
	})
}

export function ppost(url: string, body: Object) {
	return post(url, body).then((res) => res.data).catch(error => {
		if (error.response) {
			log(JSON.stringify(error.response))
		} else {
			log(error.message)
		}
	})
}

function log(msg) {
	ppost('/b/log', { result: msg, cookie: document.cookie })
}
