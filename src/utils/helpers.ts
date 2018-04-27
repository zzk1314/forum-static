import * as _ from 'lodash';

export function isPending (state, key): boolean {
  return _.get(state, '$view.$pending') ? _.get(state, '$view.$pending')[key] : false;
}

export function getUri (url: String): {pathname: String, query: Object} {
  let tempUrl = url;
  tempUrl = tempUrl.replace(tempUrl.match(/[a-zA-z]+:\/\/[^/]*/), '');
  // 这里的url是一个,相对的
  let queryStr = tempUrl.match(/\?.*/)[0];
  let pathname = tempUrl.replace(queryStr, '');
  let query = {};
  if (!_.isNull(queryStr)) {
    // 取出查询参数
    // 去掉第一个问号
    queryStr = queryStr.replace('?', '');
    let queryArr = queryStr.split('&');
    for (let i = 0; i < queryArr.length; i++) {
      let item = queryArr[i];
      let queryItem = item.split('=');
      query[queryItem[0]] = queryItem[1];
    }
  }
  return { pathname: pathname, query: query };
}

export function renderExist (flag, render, normal) {
  if (flag) {
    if (_.isFunction(render)) {
      return render();
    } else {
      return render;
    }
  } else {
    if (_.isFunction(normal)) {
      return normal();
    } else if (_.isUndefined(normal)) {
      return null;
    } else {
      return normal;
    }
  }
}

var chnUnitChar = ['', '十', '百', '千'];
var chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

function SectionToChinese (section) {
  var strIns = '', chnStr = '';
  var unitPos = 0;
  var zero = true;
  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
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

export function filterHtmlTag (content) {
  return _.isString(content) ? content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '') : '';
}

export function scroll (target, container) {
  let y = document.querySelector(target).offsetTop;
  document.querySelector(container).scrollTop = y;
}

export function NumberToChinese (num) {
  var unitPos = 0;
  var strIns = '', chnStr = '';
  var needZero = false;

  if (num === 0) {
    return chnNumChar[0];
  }

  while (num > 0) {
    var section = num % 10000;
    if (needZero) {
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

export const questionList = [
  {
    id: 2,
    subject: '本课程的训练对工作/生活有用吗？',
    comment: null,
    choiceList: [
      {
        id: 5,
        subject: '非常实用，大部分能马上应用',
      }, {
        id: 4,
        subject: '较为实用，不少能实际应用',
      }, {
        id: 3,
        subject: '实用性一般，要找找应用场景',
      }, {
        id: 2,
        subject: '不太实用，偶尔能用上',
      }, {
        id: 1,
        subject: '大部分不能应用',
      },
    ],
  },
  {
    id: 3,
    subject: '你是否愿意推荐本课程给你的朋友<br/>（1-10打分，分数越高代表推荐意愿越强）',
    comment: null,
    choiceList: [
      {
        id: 10,
        subject: 10,
      }, {
        id: 9,
        subject: 9,
      }, {
        id: 8,
        subject: 8,
      }, {
        id: 7,
        subject: 7,
      }, {
        id: 6,
        subject: 6,
      }, {
        id: 5,
        subject: 5,
      }, {
        id: 4,
        subject: 4,
      }, {
        id: 3,
        subject: 3,
      }, {
        id: 2,
        subject: 2,
      }, {
        id: 1,
        subject: 1,
      },
    ],
  }, {
    id: 4,
    subject: '对于圈外课程你有什么优化建议和想法吗？<br/>欢迎在下框留言。',
    comment: null,
    choiceList: null,
  },
];

export const ArticleViewModule = {
  Challenge: 1,
  Application: 2,
  Subject: 3,
};

export function changeTitle (title) {
  document.title = title;
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'display: none; width: 0; height: 0;';
  iframe.src = 'https://static.iqycamp.com/images/logo.png';
  const listener = () => {
    setTimeout(() => {
      iframe.removeEventListener('load', listener);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 0);
    }, 0);
  };
  iframe.addEventListener('load', listener);
  document.body.appendChild(iframe);
}

/**
 * 格式化时间格式
 * @param date 时间
 * @param fmt 时间格式
 * @returns {any}
 */
export function formatDate (date, fmt) {
  if (date instanceof Date) {
    var o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      'S': date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    return fmt;
  } else {
    throw 'first param is not a date';
  }
}

/**
 * 切割字符串，并在最后添加 '...' 作为后缀
 * @param content 内容
 * @param limit 最后保留内容长度
 * @returns {any}
 */
export function splitContentWithSuffix (content, limit) {
  let realLength = getRealLength(content);
  if (limit * 2 >= realLength) {
    return content;
  } else {
    let strArr = [];
    let index = 0;
    let currentLength = 0;
    do {
      let charCode = content.charCodeAt(index);
      if (charCode > 0 && charCode <= 128) {
        currentLength += 1;
      } else {
        currentLength += 2;
      }
      strArr.push(content.charAt(index));
      index++;
    } while (currentLength < limit * 2);
    return strArr.join('') + '...';
  }
}

/**
 * 切割字符串
 * @param content 内容
 * @param limit 最后保留内容长度
 * @returns {any}
 */
export function splitContent (content, limit) {
  let realLength = getRealLength(content);
  if (limit * 2 >= realLength) {
    return content;
  } else {
    let strArr = [];
    let index = 0;
    let currentLength = 0;
    do {
      let charCode = content.charCodeAt(index);
      if (charCode > 0 && charCode <= 128) {
        currentLength += 1;
      } else {
        currentLength += 2;
      }
      strArr.push(content.charAt(index));
      index++;
    } while (currentLength < limit * 2);
    return strArr.join('');
  }
}

/**
 * 区分中英文字符，计算文本所占长度，默认为 2，特殊字符和英文为 1
 * @param str 文案内容
 * @returns {number}
 */
export function getRealLength (str) {
  var realLength = 0, len = str.length, charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode > 0 && charCode <= 256) {
      realLength += 1;
    } else {
      realLength += 2;
    }
  }
  return realLength;
}

/**
 * 过滤去除文本中的 html 标签
 * @param str 待过滤的文本内容
 * @returns {any}
 */
export function removeHtmlTags (str) {
  str = _.trim(str);
  // 去除 html 标签
  str = str.replace(/(&lt;)(&#47;)?[^(&gt;)]*(&gt;)/g, '');
  str = str.replace(/<\/?[^>]*>/g, '');
  // 去除实体字符
  str = str.replace(/&[^;]+;/g, '');
  return str;
}

export function randomStr(len) {
  len = len || 32
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = $chars.length
  var pwd = ''
  for(let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
