import qs from 'qs'
import { get, post } from 'axios'
import * as axios from 'axios'

axios.defaults.headers.platform = 'pc'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 对于 700 返回，统一跳转登录页
axios.interceptors.response.use(function(response) {
  if(response.status === 700) {
    window.location.href = '/login'
  } else {
    return response
  }
}, function(error) {
  console.error(error)
})

function pget(url: string, query?: Object) {
  return get(`${url}${appendQs(query)}`, {
    validateStatus: function(status) {
      return status >= 200 && status < 300 || status == 700
    }
  }).then(res => res.data).catch(error => {
    if(error.response) {
      log(JSON.stringify(error.response), url)
    } else {
      log(error.message, url)
    }
    throw '网络不给力'
  })
}

function ppost(url: string, body: Object) {
  return post(url, body).then(res => res.data).catch(error => {
    if(error.response) {
      log(JSON.stringify(error.response), url)
    } else {
      log(error.message, url)
    }
    throw '网络不给力'
  })
}

function log(msg, url) {
  return post('/b/log', JSON.stringify({result: msg, cookie: document.cookie, url: url}))
}

function appendQs(query: Object): string {
  return !query ? '' : `?${qs.stringify(query)}`
}

function mark(param) {
  return ppost('/rise/b/mark', param)
}

export class BreakSignal {
  constructor(msg, title = '提示') {
    this.title = title
    this.msg = msg
  }

  private title: String
  private msg: String
}

export { pget, ppost, mark }
