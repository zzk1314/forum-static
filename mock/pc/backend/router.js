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
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 1,
                    "type": 11
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
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 4,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 5,
                    "type": 11
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

module.exports = router;
