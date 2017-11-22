"use strict";
var request_1 = require("utils/request");
// 获取所有小课和对应知识点集合的列表
function loadAllProblemsAndKnowledges() {
    return request_1.pget("/pc/operation/warmup/load/knowledges");
}
exports.loadAllProblemsAndKnowledges = loadAllProblemsAndKnowledges;
