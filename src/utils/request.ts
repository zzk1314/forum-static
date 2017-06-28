import qs from "qs"
import * as _ from "lodash"
import { get, post } from "axios";

export class BreakSignal {
  constructor(msg, title = "提示") {
    this.title = title;
    this.msg = msg;
  }

  private title: String;
  private msg: String;
}
;

export class Stop {

}

export function appendQs(query: Object): string {
  return !query ? "" : `?${qs.stringify(query)}`
}

export function pget(url: string, query?: Object) {
  return get(`${url}${appendQs(query)}`).then((res) => res.data).catch(error => {
    if(error.status === 401) {
      console.log('未登录，跳转登录页面')
      window.location.href("/login")
    }
    if(error.response) {
      log(JSON.stringify(error.response))
    } else {
      log(error.message)
    }
    throw "网络不给力";
  })
}

export function ppost(url: string, body: Object) {
  return post(url, body).then((res) => res.data).catch(error => {
    if(error.status === 401) {
      console.log('未登录，跳转登录页面')
      window.location.href("/login")
    }
    if(error.response) {
      log(JSON.stringify(error.response))
    } else {
      log(error.message)
    }
    throw "网络不给力";
  })
}

function log(msg) {
  ppost('/b/log', { result: msg, cookie: document.cookie })
}

export function mark(param) {
  return ppost('/rise/b/mark', param);
}
