var Router = require("express").Router;
var router = new Router();


router.get("/pc/operation/hot/warmup", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": [{
              "id": 49,
              "question": "请判断下面2段话哪一个符合概括主题的要点？",
              "type": 1,
              "analysis": "选项2中的主题不符合预期，如果用选项2中的主题，人们对内容的预期是解释”男女厕所不应该分开“的原因",
              "voice": null,
              "difficulty": 1,
              "knowledgeId": 6,
              "sceneId": 1,
              "choiceList": [{
                  "id": 147,
                  "questionId": 49,
                  "subject": "中性厕所正在兴起。",
                  "sequence": 1,
                  "isRight": true,
                  "selected": null
              }, {
                  "id": 148,
                  "questionId": 49,
                  "subject": "男女厕所不应该分开。",
                  "sequence": 2,
                  "isRight": false,
                  "selected": null
              }],
              "choice": null
          }, {
              "id": 45,
              "question": "请判断下面这段话作为主题是否适度？\n当今世界已进入信息网络化时代，信息网络化对编辑工作既提出了新的挑战，也带来了难得的发展机遇。当下，互联网在民众的生活中产生着越来越大的影响，“互联网+编辑出版业”也为编辑出版产业提供了广阔的发展空间。如何利用好互联网平台，使其与编辑出版业进行深度融合，为编辑出版工作打造新的局面，是值得编辑出版人深思的话题。目前以网络为代表的新媒体无疑给信息的传播带来了便捷，让编辑编发的成果受众面更为广阔。而同时，“互联网+”带给编辑工作者的冲击也是不小的，对此，编辑工作者就需积极应对。我认为进入网络化社会，编辑要不断学习新知识和技能，创新工作方式。\n ……\n",
              "type": 1,
              "analysis": "主题不符合“适度”，主题中对于背景的介绍太长。",
              "voice": null,
              "difficulty": 1,
              "knowledgeId": 6,
              "sceneId": 1,
              "choiceList": [{
                  "id": 136,
                  "questionId": 45,
                  "subject": "适度",
                  "sequence": 1,
                  "isRight": false,
                  "selected": null
              }, { "id": 137, "questionId": 45, "subject": "不适度", "sequence": 2, "isRight": true, "selected": null }],
              "choice": null
          }, {
              "id": 47,
              "question": "请为下面这段话概括一个最合适的主题：\n为了改善公司目前新入职员工的培训状况：\n 应向管理层强调，对新入职员工的培训十分影响员工的工作质量和忠诚度\n 应在年末给予优秀讲师奖励和表彰，提高讲师的积极性\n 应搜集新入职员工对培训的反馈，调整培训内容，使之更贴合新员工需要\n",
              "type": 1,
              "analysis": "选项1和3的主题都没有思想，而2概括出了有思想的主题",
              "voice": null,
              "difficulty": 1,
              "knowledgeId": 6,
              "sceneId": 1,
              "choiceList": [{
                  "id": 141,
                  "questionId": 47,
                  "subject": "为改善公司目前新入职员工的培训状况，我们提出3点建议",
                  "sequence": 1,
                  "isRight": false,
                  "selected": null
              }, {
                  "id": 142,
                  "questionId": 47,
                  "subject": "为改善公司目前新入职员工的培训状况，我们必须有所行动，促使培训体制中各参与主体支持培训",
                  "sequence": 2,
                  "isRight": true,
                  "selected": null
              }, {
                  "id": 143,
                  "questionId": 47,
                  "subject": "为改善公司目前新入职员工的培训状况，步骤如下",
                  "sequence": 3,
                  "isRight": false,
                  "selected": null
              }],
              "choice": null
      }]
    }), Math.random() * 1500)
});

router.get("/pc/operation/warmup/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": {
                "id": 1, //题目id
                "question": "题干", //问题题干
                "analysis": "balbal", //问题分析
                "voice": "http://someurl", //语音分析链接
                "type": 1, //1-单选题，2-多选题
                "Difficulty": 1, //1-简单，2-普通，3-困难
                "choiceList": [
                    {
                        "id": 1,
                        "questionId": 1, //问题id
                        "subject": "选项1", //选项题干
                        "sequence": 1, //选项顺序
                        "isRight": false,  //是否是正确选项
                        "selected": false //用户是否选择
                    },
                    {
                        "id": 2,
                        "questionId": 1,
                        "subject": "选项2",
                        "sequence": 2,
                        "isRight": true,
                        "selected": true
                    },
                    {
                        "id": 3,
                        "questionId": 1,
                        "subject": "选项2",
                        "sequence": 2,
                        "isRight": true,
                        "selected": false
                    },
                    {
                        "id": 4,
                        "questionId": 1,
                        "subject": "选项2",
                        "sequence": 2,
                        "isRight": false,
                        "selected": true
                    }
                ],
                "discussList": [
                    {
                        "id":2,
                        "repliedId": 1,
                        "comment":"回复回复",
                        "repliedName": "风之伤",
                        "repliedComment": "评论评论评论",
                        "warmupPracticeId": 49,
                        "name":"Diane",
                        "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
                        "discussTime":"10:30"
                    },

                    {
                        "id":1,
                        "repliedId": null,
                        "comment":"评论评论评论",
                        "repliedName": null,
                        "repliedComment": null,
                        "warmupPracticeId": 49,
                        "name":"风之伤",
                        "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
                        "discussTime":"10:38",
                        "priority":0,
                    }
                ],
            }
        }), Math.random() * 1500)
});

router.post("/pc/operation/reply/discuss", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": "ok"
        }), Math.random() * 1500)
});

router.post("/pc/operation/highlight/discuss/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": "ok"
        }), Math.random() * 1500)
});

router.post("/pc/operation/highlight/applicationSubmit/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": "ok"
        }), Math.random() * 1500)
});

router.get("/pc/operation/application/submit/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": [
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "<p>关键词：收购、EMC、戴尔</p><p>反问：戴尔不收购EMC会怎么样？&nbsp;<span style='line-height: 1.6; background-color: transparent;'>&nbsp;</span></p><p><span style='line-height: 1.6; background-color: transparent;'>为什么戴尔不收购其他公司？&nbsp;</span></p><p><span style='line-height: 1.6; background-color: transparent;'>为什么不是其他公司收购EMC？</span></p><p>1.戴尔不收购EMC会怎么样？戴尔的主要业务是PC，而PC市场整体低迷，戴尔再不做出转型，将无法在市场上立足；</p><p>2. 为什么戴尔不收购其他公司？戴尔想要发展转型成为一家企业计算机服务提供商，EMC和戴尔产品互补，可以帮助其达成该目标。通过收购EMC，可将戴尔公司在小企业领域和中端市场上的优势与EMC在大企业领域中的优势结合到一起，可以整合服务器、存储、网络、安全、管理、软件、服务等多个方面的资源，形成帮扶企业用户建云过程中构建一个全面的解决方案，并会协助各种培训提供支持，从基础架构到云端提供全面帮助。通过收购EMC，戴尔将获得计算机数据存储市场最大的厂商之一，更有效地与思科和IBM等同业竞争。</p><p>3.为什么不是其他公司收购EMC？EMC是第一批为全新的计算机市场生产存储设备的公司之一，其错过了云计算的早期发展势头，传统储存设备业务逐渐式微，增长缓慢，面临亚马逊、谷歌等这类大型云计算公司的竞争压力，全资控股子公司VMware业务也一直在下滑。1）戴尔和EMC的产品线冲突不大，互补性强，而像惠普与EMC的产品重合度太多。2）戴尔已经完成了私有化，可让EMC远离功利投资的烦恼；3）戴尔的迈克尔是EMC理想的接班人：年轻、市场地位高、迈克尔是戴尔的创始人和拥有者，会用心经营新公司；4）戴尔的出价还不错，且有能力筹措到所需要的资金。综上，戴尔是EMC最合适的收购者。</p><p>总结：这一场收购是戴尔和EMC双赢的结果。</p>",
                    "voteCount": 1,
                    "id": 1,
                    "type": 11,
                    "comment":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 2,
                    "type": 11,
                    "priority":0,
                    "comment":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 3,
                    "type": 11,
                    "priority":0,
                    "comment":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 4,
                    "type": 11,
                    "comment":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 5,
                    "type": 11,
                    "comment":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 6,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 7,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学 ",
                    "voteCount": 1,
                    "id": 8,
                    "type": 11
                },
            ]
        }), Math.random() * 1500)
});


router.get("/pc/operation/homework/*", (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            "msg": [
                {
                    "id": 1,
                    "description": "balbal",
                    "pic": "http://www.iquanwai.com/images/cintro1.png",
                    "knowledgeId": 1,
                    "sceneId": 1,
                    "difficulty": null,
                    "content": "评论评论", //提交内容
                    "submitId": 1, //提交id
                    "submitUpdateTime": "2017-02-15" ,//最后提交时间
                    "voteCount": 0,
                    "commentCount": 0,
                    "voteStatus": 0,
                    "topic":"用分层归类法表达你的观点",
                }
            ],
            "code": 200
        });
    }, Math.random() * 1500);
});


router.get("/pc/admin/config/*", (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            "msg": [
                {
                    "key":"static.resource.url",
                    "value":"http://frag.confucius.mobi/bundle.js?",
                    "projectId":"rise",
                    "edit":false,
                    "display":true,
                },
                {
                    "key":"app.domainname",
                    "value":".confucius.mobi",
                    "projectId":"rise",
                    "edit":false,
                    "display":true,
                },
            ],
            "code": 200
        });
    }, Math.random() * 1500);
});


router.post("/pc/admin/config/add", (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            "msg": "ok",
            "code": 200
        });
    }, Math.random() * 1500);
});

router.post("/pc/admin/config/update", (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            "msg": "ok",
            "code": 200
        });
    }, Math.random() * 1500);
});

router.post("/pc/admin/config/delete", (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            "msg": "ok",
            "code": 200
        });
    }, Math.random() * 1500);
});


router.get("/pc/operation/problem/list", (req, res) => {
    setTimeout(() => {
        res.status(200).json({"msg":[{"name":"沟通人际","problems":[{"id":1,"problem":"与人沟通时条理更清晰","status":null},{"id":2,"problem":"跟老板/家人提要求时更有说服力","status":null},{"id":5,"problem":"与人撕逼时找到对方逻辑漏洞","status":null}]},{"name":"思维方法","problems":[{"id":3,"problem":"面对前所未有的新问题时撬开脑洞","status":null},{"id":4,"problem":"临场发言也能掷地有声","status":null},{"id":9,"problem":"找到本质问题，减少无效努力","status":null},{"id":10,"problem":"普通人的第一堂营销课","status":null},{"id":11,"problem":"洞察他人行为背后的真相","status":null},{"id":12,"problem":"面对热点事件保持独立思考","status":null}]},{"name":"职业发展","problems":[{"id":6,"problem":"写出令HR过目难忘的简历","status":null},{"id":7,"problem":"在面试中脱颖而出","status":null},{"id":8,"problem":"给自己的未来定个发展策略","status":null}]}],"code":200});
    }, Math.random() * 1500);
});

module.exports = router;
