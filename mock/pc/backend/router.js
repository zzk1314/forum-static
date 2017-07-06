var Router = require("express").Router;
var router = new Router();


router.get("/pc/operation/warmup/list/*", (req, res) => {
    setTimeout(() => {
        res.status(200).json(
            {"msg": [
                {
                    "id": 1,
                    "question": "请找出下列各组词语中，和组内其它词语范围不同的词第一组：微博、博客、自媒体、知乎专栏、微信公众号、头条号第二组：意大利肉酱面、上海红烧肉、韩国泡菜、西班牙海鲜饭、德国猪手、日本料理、炸鱼薯条、泰式冬阴功汤第三组：公司文化、薪资福利、发展机会、管理团队、行业前景、住房公积金、公司声誉",
                    "type": 1,
                    "analysis": "第一组里，其它都是内容平台，只有“自媒体”不是；第二组里，其它都是菜名（炸鱼薯条是英国特色菜名），只有“日本料理”不是；第三组里，呈现了择业的一些考虑因素，但“住房公积金”属于“薪资福利”，相较其它因素，范围较小",
                    "voice": null,
                    "difficulty": 3,
                    "knowledgeId": 1,
                    "sceneId": 1,
                    "del": false,
                    "problemId": 1,
                    "sequence": 1,
                    "example": true,
                    "practiceUid": "T001A001A002L01001",
                    "score": null,
                    "choiceList": null,
                    "discussList": null,
                    "choice": null
                },
                {
                    "id": 2,
                    "question": "请判断以下这段话是否符合分层归类的要求。有效获取医学信息的来源有：1、书：医学教材、通俗医学参考书2、媒体：医生的自媒体、医学报刊3、互联网：医学论坛、维基百科、MOOC公开课",
                    "type": 1,
                    "analysis": "媒体和互联网存在交叉（如医生的自媒体），可将所有的信息来源分为线上和线下",
                    "voice": null,
                    "difficulty": 3,
                    "knowledgeId": 1,
                    "sceneId": 1,
                    "del": false,
                    "problemId": 1,
                    "sequence": 4,
                    "example": false,
                    "practiceUid": "TT001A001A006X01004",
                    "score": null,
                    "choiceList": null,
                    "discussList": null,
                    "choice": null
                },
                {
                    "id": 3,
                    "question": "小明同学计划通过以下方式来提升自己的能力，请帮他对这些方式进行分层归类。1、 读《金字塔原理》2、 每天早上计划好当天的任务3、 报名圈外的结构化思维训练营课程4、 一周至少在公开场合发言一次5、 每天总结工作中遇到的问题和改进方向6、 尝试用圈圈教的讲故事的方法说服领导同意自己的方案7、 使用番茄时间进行时间管理",
                    "type": 1,
                    "analysis": "1、3为“思维能力”；4、6为”沟通能力“；2、5、7为“计划执行能力”",
                    "voice": null,
                    "difficulty": 3,
                    "knowledgeId": 1,
                    "sceneId": 1,
                    "del": false,
                    "problemId": 1,
                    "sequence": 5,
                    "example": false,
                    "practiceUid": "TT001A001B004X01005",
                    "score": null,
                    "choiceList": null,
                    "discussList": null,
                    "choice": null
                },
                {
                    "id": 4,
                    "question": "下面是时光网用户写的关于李安最新电影《比利·林恩的中场战事》的微影评，如果要从3个不同角度对影评归类分组以便更好地理解大家对该电影的看法，你建议如何分组？1、男主角的眼神太杀，舞台功力爆表。2、120帧真的好清楚，3、头发一根根的毛茸茸的质感，想去伸手摸。4、比技术更震撼人心的依旧是安叔暗藏汹涌的叙述5、选角很成功可以说每个演员都演得很到位。6、4K120帧真的震撼到我了7、故事很简单，但挺细腻的8、李安讲的不是什么精彩的故事，而是人物状态构建出的社会状态。9、看的60帧，感觉是有些所谓的“高清”效果",
                    "type": 1,
                    "analysis": "第一组：1、5；第二组：2、3、6、9；第三组：4、7、8。第一组是关于演员，第二组是关于画面，第三组是关于剧情",
                    "voice": null,
                    "difficulty": 3,
                    "knowledgeId": 1,
                    "sceneId": 1,
                    "del": false,
                    "problemId": 1,
                    "sequence": 6,
                    "example": false,
                    "practiceUid": "TT001A001D003X01006",
                    "score": null,
                    "choiceList": null,
                    "discussList": null,
                    "choice": null
                }],
                "code":200});
    }, Math.random() * 1500);
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

router.post("/pc/operation/warmup/save", (req, res) => {
    setTimeout(() => {
        res.status(200).json(
            {
              "msg":"ok",
              "code":200
            }
        );
    }, Math.random() * 1500);
});

router.get("/pc/operation/warmup/next/*", (req, res) => {
    setTimeout(() => {
        res.status(200).json(
            {
                "code": 200,
                "msg": {
                    "id": 1, //题目id
                    "question": "题干", //问题题干
                    "analysis": "balbal", //问题分析
                    "voice": "http://someurl", //语音分析链接
                    "type": 1, //1-单选题，2-多选题
                    "Difficulty": 1, //1-简单，2-普通，3-困难
                    "problemId":1,
                    "choiceList": [
                        {
                            "id": 1,
                            "questionId": 1, //问题id
                            "subject": "选项1", //选项题干
                            "sequence": 1, //选项顺序
                            "isRight": false,  //是否是正确选项
                        },
                        {
                            "id": 2,
                            "questionId": 1,
                            "subject": "选项2",
                            "sequence": 2,
                            "isRight": true,
                        },
                        {
                            "id": 3,
                            "questionId": 1,
                            "subject": "选项2",
                            "sequence": 2,
                            "isRight": true,
                        },
                        {
                            "id": 4,
                            "questionId": 1,
                            "subject": "选项2",
                            "sequence": 2,
                            "isRight": false,
                        }
                    ]
                }
            });
    }, Math.random() * 1500);
});

module.exports = router;
