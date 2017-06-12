import * as _ from "lodash"

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

export function renderExist(flag,render,normal){
  if(flag){
    if(_.isFunction(render)){
      return render();
    } else {
      return render;
    }
  } else {
    if(_.isFunction(normal)){
      return normal();
    } else if(_.isUndefined(normal)){
      return null;
    } else {
      return normal;
    }
  }
}




var chnUnitChar = ["","十","百","千"];
var chnUnitSection = ["","万","亿","万亿","亿亿"];
var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];

function SectionToChinese(section){
  var strIns = '', chnStr = '';
  var unitPos = 0;
  var zero = true;
  while(section > 0){
    var v = section % 10;
    if(v === 0){
      if(!zero){
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    }else{
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}

export function scroll(target, container){
  let y = document.querySelector(target).offsetTop
  document.querySelector(container).scrollTop = y
}

export function NumberToChinese(num){
  var unitPos = 0;
  var strIns = '', chnStr = '';
  var needZero = false;

  if(num === 0){
    return chnNumChar[0];
  }

  while(num > 0){
    var section = num % 10000;
    if(needZero){
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = SectionToChinese(section);
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = (section < 1000) && (section > 0);
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr;
}
