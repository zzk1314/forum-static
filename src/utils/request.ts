import qs from "qs"
import { get, post } from "axios";
import * as $ from "jquery";
import * as axios from 'axios'

axios.defaults.headers.platform = "pc"

export class BreakSignal {
  constructor(msg, title = "提示") {
    this.title = title;
    this.msg = msg;
  }

  private title: String;
  private msg: String;
}


export class Stop {

}

export function appendQs(query: Object): string {
  return !query ? "" : `?${qs.stringify(query)}`
}

export function pget(url: string, query?: Object) {
  return get(`${url}${appendQs(query)}`).then((res) => res.data).catch(error => {
    if(error.response) {
      log(JSON.stringify(error.response), url)
    } else {
      log(error.message, url)
    }
    throw "网络不给力";
  })
}

export function ppost(url: string, body: Object) {
  return post(url, body).then((res) => res.data).catch(error => {
    if(error.response) {
      log(JSON.stringify(error.response), url);
    } else {
      log(error.message, url);
    }
    throw "网络不给力";
  })
}

function log(msg, url) {
  $.ajax('/b/log', {
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ result: msg, cookie: document.cookie, url: url }),
    dataType: "json",
    success: function(e) {
      console.log(e)
    },
  });
}

export function mark(param) {
  return ppost('/rise/b/mark', param);
}
