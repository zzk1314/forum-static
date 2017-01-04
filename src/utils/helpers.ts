import * as _ from "lodash"
// import UA from "ua-device"

export function isPending(state, key): boolean {
  return _.get(state, '$view.$pending') ? _.get(state, '$view.$pending')[key] : false
}

export function getUri(url: String): {pathname:String,query:Object} {
  let tempUrl = url;
  tempUrl = tempUrl.replace(tempUrl.match(/[a-zA-z]+:\/\/[^/]*/),"");
  // 这里的url是一个,相对的
  let queryStr = tempUrl.match(/\?.*/)[0];
  let pathname = tempUrl.replace(queryStr,"");
  let query = {};
  if(!_.isNull(queryStr)){
    // 取出查询参数
    // 去掉第一个问号
    queryStr = queryStr.replace("?","");
    let queryArr = queryStr.split("&");
    for(let i=0;i<queryArr.length;i++){
      let item = queryArr[i];
      let queryItem = item.split("=");
      query[queryItem[0]]=queryItem[1];
    }
  }
  return {pathname:pathname,query:query};
}

// export function isIOS() {
// 	return _.get(new UA(navigator.userAgent), 'os.name') === 'iOS'
// }
