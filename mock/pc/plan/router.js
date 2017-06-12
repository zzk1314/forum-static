var Router = require("express").Router;

var router = new Router();

router.post("/rise/plan/choose/problem/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": 12 //planId
		}), Math.random() * 1500)
});

router.get("/rise/plan/play/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"length": 14, //持续天数
				"endDate": "12月18日", //结束日期
        "totalSeries":7, //题目总数
				"pic": "http://www.iquanwai.com/images/cintro1.png" //问题头图
			}
		}), Math.random() * 1500)
});



router.get("/rise/plan/load", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"msg": {
				"id": 2,
				"openid": null,
				"problemId": 2,
				"startDate": "2016-12-24",
				"endDate": "2016-12-31",
				"closeDate": "2017-01-07",
				"currentSeries": 1, //当前题组
				"completeSeries": 1, //完成题组
				"totalSeries": 2,  //总题组
				"warmupComplete": 3, //结束的热身训练
				"applicationComplete": 2, //结束的应用训练
				"total": 14, //总共的训练
				"point": 0,
				"complete": 0,
				"status": 1,
                "hasProblemScore":false,
                "lockedStatus":-1,
                "problem": {
                    "id": 2,
                    "problem": "跟老板",
                    "pic": "http://www.iquanwai.com/images/fragment/problem1.png",
                    "length": 5,
                    "warmupCount": 10,
                    "applicationCount": 5,
                    "challengeCount": 1,
                    "description": "以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握提出明确的诉求、讲好故事、以及有效使用证据的方法。结合运用理性和感性，更好说服他人。"
                },
				"sections":[{
                    "name":"第一节",
                    "chapterName":"第一章",
                    "section":1,
                    "chapter":1,
                    "series":1,
                    "practices": [{
                        "type": 31,
                        "status": 0,
                        "unlocked": true,
                        "practiceIdList": [49],
                        "series": 1,
                        "sequence": 1,
                        "practicePlanId": 1,
                        "planId":3,
                        "optional":true
                    }, {
                        "type": 1,
                        "status": 0,
                        "unlocked": true,
                        "practiceIdList": [52, 56, 52],
                        "series": 1,
                        "sequence": 2,
                        "planId":3,
                        "practicePlanId": 1
                    }, {
                        "type": 11,
                        "status": 1,
                        "unlocked": true,
                        "practiceIdList": [27],
                        "series": 1,
                        "sequence": 3,
                        "planId":3,
                        "practicePlanId": 1
                    }, {
                        "knowledge": null,
                        "type": 21,
                        "status": 1,
                        "unlocked": true,
                        "practiceIdList": [2],
                        "series": 0,
                        "sequence": 4,
                        "planId":3,
                        "optional":true
                    }]
				},
                    {
                        "name":"第二节",
                        "chapterName":"第一章",
                        "section":2,
                        "chapter":1,
                        "practices": [{
                            "type": 32,
                            "status": 0,
                            "unlocked": true,
                            "practiceIdList": [1],
                            "series": 2,
                            "sequence": 1,
                            "practicePlanId": 1,
                            "planId":3,
                            "optional":true
                        }, {
                            "type": 1,
                            "status": 0,
                            "unlocked": true,
                            "practiceIdList": [52, 56, 52],
                            "series": 2,
                            "sequence": 2,
                            "planId":3,
                            "practicePlanId": 1
                        }, {
                            "type": 11,
                            "status": 1,
                            "unlocked": true,
                            "practiceIdList": [27],
                            "series": 2,
                            "sequence": 3,
                            "planId":3,
                            "practicePlanId": 1
                        }, {
                            "knowledge": null,
                            "type": 21,
                            "status": 1,
                            "unlocked": true,
                            "practiceIdList": [2],
                            "series": 2,
                            "sequence": 4,
                            "optional":true
                        }]
                    }
				],
        		"openRise":true,
                "openConsolidation":true,
                "openApplication":true,
				"deadline":7,
			}, "code": 200
		}), Math.random() * 1500)
});

router.get("/rise/plan/knowledge/load/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"id": 1,
				"knowledge": "知识点描述", //知识点
				"voice": "http://someurl", //语音链接
				"pic": "http://someurl", //图片链接
				"analysis": "balbalbal", //作用
				"means": "方法", //方法
				"keynote": "要点" //要点
			}
		}), Math.random() * 1500)
});


router.post("/rise/plan/complete", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"iscomplete":true,
				"percent":15,
                "mustStudyDays":7,
			}
		}), Math.random() * 1500)
});

router.post("/rise/plan/close", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": "ok"
		}), Math.random() * 1500)
});

router.post('/rise/plan/openrise',(req,res)=>{
  setTimeout(()=>
    res.status(200).json({
      "code":200,
      "msg":"ok"
    }),Math.random() * 1500)
});

router.get("/rise/plan/knowledge/example/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
        "id": 1, //题目id
        "question": "题干", //问题题干
        "analysis": "balbal", //问题分析
        "voice": "http://someurl", //语音分析链接
        "type": 1, //1-单选题，2-多选题
        "difficulty": 1, //1-简单，2-普通，3-困难
        "knowledgeId":2, //知识点
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
      }
    }), Math.random() * 1500)
});

router.post('/rise/plan/roadmap',(req,res)=>{
    setTimeout(()=>
        res.status(200).json({
            "msg": [
                {
                    "intro": "故事的三种作用",
                    "series": 1
                },
                {
                    "intro": "故事的套路:故事的基本要素 & 故事的附加要素",
                    "series": 2
                },
                {
                    "intro": "故事的套路:故事的附加要素",
                    "series": 3
                },
                {
                    "intro": "商业故事的要点",
                    "series": 4
                },
                {
                    "intro": "综合练习1",
                    "series": 5
                },
                {
                    "intro": "综合练习2",
                    "series": 6
                }
            ],
            "code": 200
        }),Math.random() * 1500)
});

router.post("/rise/plan/welcome", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg":true
    }), Math.random() * 1500)
});

router.post("/rise/plan/mark/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg":"ok"
    }), Math.random() * 1500)
});

router.get("/rise/plan/risemember", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": false
        }), Math.random() * 1500)
});

router.get("/rise/plan/member/description", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": true
        }), Math.random() * 1500)
});

router.get("/rise/plan/promote", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": 'ok'
        }), Math.random() * 1500)
});

router.get('/rise/plan/open/status', (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": {
                openRise: true,
                openApplication: true,
                openConsolidation: true,
            }
        }), Math.random() * 1500)
});

router.post("/rise/plan/check/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json(
            {"msg":"ok","code":200}
        );
    },Math.random()*1500);
});

router.get("/rise/plan/chapter/list", (req, res)=>{
    setTimeout(()=>{
        res.status(200).json(
            {"msg":[{"chapterId":1,"chapter":"结构清晰","sectionList":[{"sectionId":1,"section":"将信息归类分组","series":1},{"sectionId":2,"section":"确保归类不重不漏","series":2}]},{"chapterId":2,"chapter":"有序递进","sectionList":[{"sectionId":1,"section":"用时间顺序组织表达","series":3},{"sectionId":2,"section":"用空间顺序组织表达","series":4},{"sectionId":3,"section":"用程度顺序组织表达","series":5},{"sectionId":4,"section":"用三种顺序组织表达","series":6}]},{"chapterId":3,"chapter":"主题鲜明","sectionList":[{"sectionId":1,"section":"表达时主题先行","series":7}]},{"chapterId":4,"chapter":"复习","sectionList":[{"sectionId":1,"section":"内容回顾 & 综合练习1","series":8},{"sectionId":2,"section":"内容回顾 & 综合练习2","series":9}]}],"code":200}
        );
    },Math.random()*1500);
})

router.post("/rise/plan/mark/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json(
            {"msg":"ok","code":200}
        );
    },Math.random()*1500);
});

module.exports = router;
