
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