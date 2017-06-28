
export function encodeTextAreaString(str) {
  let reg = new RegExp("\n", "g");
  str = str.replace(reg, "<br/>");
  return str;
}

export function decodeTextAreaString(str) {
  let reg = new RegExp("<br/>", "g");
  str = str.replace(reg, "\n");
  return str;
}

export function decodeTextAreaString2(str) {
  let reg = new RegExp("<br/>", "g");
  str = str.replace(reg, " ");
  return str;
}

export function decodeTextAreaString3(str) {
  let reg = new RegExp("<br/><br/>", "g")
  str = str.replace(reg, "</p><p>")
  str = "<p>".concat(str).concat("</p>")
  return str;
}

export function removeHtmlTags(str) {
  str = str.replace(/<[^>]+>/g,"");
  return str
}
