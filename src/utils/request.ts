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

export function pget(url: string,router:Object ,query?: Object) {
	return get(`${url}${appendQs(query)}`).then((res) => {
	  // 获取code进行判断
	  let code = _.get(res.data,"code");
	  // 未登录的并且传递了router
	  if(_.isEqual(code,401)){
	    if(!_.isNull(router) && !_.isUndefined(router)){
        // 没有登录，跳转
        router.push({
          pathname:"/login",
        });
        // 停止promise链
        throw new BreakSignal(res||"test");
      }
      console.log("禁止访问,但可以往下执行");
    }
    if(_.isEqual(code,403) && !_.isNull(router)){
	    // 没有权限，跳转
      // TODO 这里可以抛出403异常，交给外面处理，面的未登录其实也可以，不过一般401都跳到登录界面就可以了
      console.log("没有权限,url:",url);
    }

	  return res.data
  }).catch(error => {
    console.log("first ERror",error instanceof BreakSignal);
    if(error instanceof BreakSignal){
      throw new BreakSignal();
    }
    console.log("after error",error);
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
