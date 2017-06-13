var Router = require("express").Router;

var router = new Router();

router.get("/rise/practice/warmup/start/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"msg": {
				"practice": [{
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
					"choice": null,
                    "knowledge": {
                        "id": 5,
                        "knowledge": "逻辑顺序",
                        "step": null,
                        "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
                        "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
                        "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
                        "pic": null,
                        "audio": null,
                        "appear": null
                    }
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
					"choice": null,
                    "knowledge": {
                        "id": 5,
                        "knowledge": "逻辑顺序",
                        "step": null,
                        "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
                        "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
                        "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
                        "pic": null,
                        "audio": null,
                        "appear": null
                    }
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
					"choice": null,
                    "knowledge": {
                        "id": 5,
                        "knowledge": "逻辑顺序",
                        "step": null,
                        "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
                        "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
                        "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
                        "pic": null,
                        "audio": null,
                        "appear": null
                    }
				}]
			}, "code": 200
		}), Math.random() * 1500)
});

router.get("/rise/practice/warmup/analysis/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"practice": [
					{
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
                        "knowledge": {
                            "id": 5,
                            "knowledge": "逻辑顺序",
                            "step": null,
                            "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
                            "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
                            "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
                            "pic": null,
                            "audio": null,
                            "appear": null
                        },
                        "discussList": [
                          {
                            "id":2,
                            "repliedId": 1,
                            "comment":"回复回复",
                            "repliedName": "风之伤",
                            "repliedComment": "评论评论评论",
                              "isMine":true,
                            "warmupPracticeId": 49,
                            "role":3,
                            "repliedDel":0,
                            "name":"Diane",
                            "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
                            "discussTime":"10:30",
                            "priority":1,
                          },

                          {
                            "id":1,
                            "repliedId": null,
                            "comment":"评论评论评论",
                            "repliedName": null,
                            "repliedComment": null,
                            "warmupPracticeId": 49,
                            "name":"风之伤",
                            "role":8,
                            "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
                            "discussTime":"10:38"
                          }
                        ],
					},
					{
						"id": 2, //题目id
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
                        "knowledge": {
                            "id": 5,
                            "knowledge": "逻辑顺序",
                            "step": null,
                            "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
                            "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
                            "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
                            "pic": null,
                            "audio": null,
                            "appear": null
                        }
					}
				]
			}
		}), Math.random() * 1500)
});

router.post("/rise/practice/warmup/answer/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"rightNumber": 3, //正确题数
				"point": 2000, //积分
                "total":3 //题目总数
			}
		}), Math.random() * 1500)
});

router.get("/rise/practice/next/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"knowledge": {
					"Id": 1,
					"knowledge": "知识点描述", //知识点描述
					"appear": 0, //是否出现过,0-未出现，1-出现过
				},
				"type": 21, // 1-单选题，2-多选题，11-应用题，21-小目标
				"status": 1, // 0-未完成，1-已完成
				"unlocked": true, //是否解锁
				"practiceIdList": [1, 2, 3], //训练id
				"series": 1, //组号
				"sequence": 1 //组内顺序
			}
		}), Math.random() * 1500)
});

router.get("/rise/practice/application/start/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"id": 1,
				"description": "balbal",
                "topic":"应用练习题1",
				"pic": "http://www.iquanwai.com/images/cintro1.png",
				"knowledgeId": 1,
				"sceneId": 1,
				"difficulty": null,
        "content": "balbal",
        "submitId": 1, //提交id
        "submitUpdateTime": "2017-02-15" ,//最后提交时间
        "voteCount": 0,
        "commentCount": 0,
        "voteStatus": 0,
        "requestCommentCount":2,
			}
		}), Math.random() * 1500)
});

router.get("/rise/practice/challenge/start/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"id": 1,
				"description": "图文混排内容", //html
				"pic": "http://www.iquanwai.com/images/cintro1.png",  //图片url
				"problemId": 1, //问题id
				"pcurl": "http://someurl", //pc端url
				"content": "aaaa", //提交内容
                "submitId": 1, //提交id
                "submitUpdateTime": "2017-02-15", //最后提交时间
                "planId":1, //计划id
			}
		}), Math.random() * 1500)
});

router.post("/rise/practice/warmup/discuss", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.get("/rise/practice/warmup/load/discuss/*/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": [
        {
          "id":2,
          "repliedId": 1,
          "comment":"新增的评论",
          "repliedName": "风之伤",
          "repliedComment": "评论评论评论",
          "repliedDel":0,
          "warmupPracticeId": 49,
          "name":"Diane",
          "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
          "discussTime":"10:30",
            "isMine":true,
        },

        {
          "id":1,
          "repliedId": null,
          "comment":"评论评论评论",
          "repliedName": null,
          "repliedComment": null,
          "repliedDel":null,
          "warmupPracticeId": 49,
          "name":"风之伤",
          "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
          "discussTime":"10:38"
        }
      ]
    }), Math.random() * 1500)
});

router.post("/rise/practice/application/submit/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.post("/rise/practice/challenge/submit/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});


router.get('/rise/practice/warmup/new/analysis/*', (req, res) =>{
  setTimeout(() =>
    res.status(200).json({
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
          "knowledge": {
              "id": 5,
              "knowledge": "逻辑顺序",
              "step": null,
              "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
              "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
              "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
              "pic": null,
              "audio": null,
              "appear": null
          },
        "discussList": [
          {
            "id":2,
            "repliedId": 1,
            "comment":"回复回复",
            "role":4,
            "repliedName": "风之伤",
            "repliedComment": "评论评论评论",
             "isMine":true,
            "warmupPracticeId": 49,
            "name":"Diane",
            "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
            "discussTime":"10:30"
          },

          {
            "id":1,
            "repliedId": null,
            "role":6,
            "comment":"评论评论评论",
            "repliedName": null,
            "repliedComment": null,
            "warmupPracticeId": 49,
            "name":"风之伤",
            "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
            "discussTime":"10:38"
          }
        ],
      }, "code": 200
    }), Math.random() * 1500)
})

router.get("/rise/practice/warmup/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
        "id": 13,
        "question": "如何战胜公开发言恐慌症？1、 发言前:准备好讲稿，反复演练提前到场熟悉发言环境上台前深呼吸放松心情2、发言时：眼睛盯住远方一个点避免紧张3、 发言后：收集听众的正面反馈，树立信心这段话符合时间顺序的哪种子结构类型",
        "type": 1,
        "analysis": "这段话按照时间顺序，按照发言前、发言时、发言后几个时间点提出了消除恐惧心理的方法。不属于步骤/流程，也没有因果关系",
        "voice": null,
        "difficulty": 1,
        "knowledgeId": 2,
        "sceneId": 1,
        "score": null,
        "choiceList": null,
        "discussList": null,
        "choice": null,
          "knowledge": {
              "id": 5,
              "knowledge": "逻辑顺序",
              "step": null,
              "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
              "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
              "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
              "pic": null,
              "audio": null,
              "appear": null
          }
      }
    }), Math.random() * 1500)
});

router.post("/rise/practice/vote", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.get("/rise/practice/comment/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": {
                "end":true,
                "list":[
                    {
                        "id":1,
                        "comment":"评论",
                        "name":"风之伤",
                        "discussTime":"2017-03-28",
                        "avatar":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488373052881&di=7a470b200f5f2f97d0d7fe5598c34cf9&imgtype=0&src=http%3A%2F%2Fci.xiaohongshu.com%2F5c3f7604-0ca9-4d7d-bcc3-8d8667399307%40r_640w_640h.jpg",
                        "signature":"签名",
                        "role":3,
                        "isMine":true,
                    },
                ]
            }
        }), Math.random() * 1500)
});

router.get("/rise/practice/application/list/other/*",(req,res)=>{
  setTimeout(()=>{
    res.status(200).json(
        {
            "msg": {
                "list": [
                    {
                        "title": null,
                        "userName": "nethunder",
                        "role":3,
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "微博 [cp]今天难得和老爸下馆子聊天，他有些小抱怨。能立即进入移情倾听模式吗？能意识到情绪背后的诉求吗？能试着不去判断他的想法对错吗？回到聊天的目的是什么，是加强理解和沟通而非判断是非，即使是解释了也未必能改变想法。然而通常我们是害怕不解释不纠正，对方会继续错下去。先判断，再强加，这完全是和沟通的目的南辕北辙。[/cp]\n感觉对倾听的要素没有很清晰的分类，写的时候一直在想要按照逻辑去分，但有点难。现在思考，首先是明确和老爸吃饭聊天的目的是加强沟通增进感情，然后在意识到老爸这么说是在发泄情绪，接着开启移情倾听模式，然后时刻保持意识自己是否在判断老爸的对错，回到倾听和理解而非去解释和纠正。\n修改后的微博：\n今天难得和老爸吃饭聊天，快一年没见面真的要和老爸好好联络感情呢。老爸谈起一些家庭琐事的小抱怨，我又忍不住开始解释：其实也不是那样的。。。这是个很好的机会练习移情聆听呀。首先记得和老爸聊天的目的是增加沟通，尽量让老爸多说说他的想法；意识到小抱怨其实是在发泄情绪了，马上进去移情聆听的状态，控制自己不去判断和解释，耐心等老爸说完。嗯，下次应该能做得更好。",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 5,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "role":5,
                        "signature":"我的签名",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "最近只有转发，没有自创。\n还是不瞎编了吧。",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 560,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "role":6,
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "是没有做到MECE完全独立，无穷大",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 827,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "role":7,
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "招聘工作分析\n年后一个月招聘旺季，但是最近招聘成效很差，主要可能存在以下几个问题：\n1.无人投递简历。\n2.新公司搬到安亭，距离较远。\n3.薪资待遇不高，出差补贴低。\n",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 1133,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "role":8,
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "拿最近一次的项目Email为例子\n改动前\nMy duties of the tournament\nDesign the questionaire for tournament feedback collection；\nManage Registration payment(Company Alipay)：Check and feedback every payment during the registration； \nPurchase tournament supplies which include: Tee/Tee marker/flag/towel/unbrella/skin coat for outsourses team/tent/badage；\nPurhase Office and players' supplies；\nHotel arrangement for committee and part of paid clients and potencial clients;\nTransportation for picking up and drop off the airport for committee/players/coach;\nManage the catering for committee;\nShuttle car from hotel to club house;\nManage the cashflow and payment to outsource team;\nManage the invoices from all parties;\nManage the award ceremony;\nPacking with the team and clean up.\n\n改动后\nBefore the tournament（赛前）\nDesign the questionaire for tournament feedback collection；\nManage Registration payment(Company Alipay)：Check and feedback every payment during the registration； \nPurchase tournament supplies which include: Tee/Tee marker/flag/towel/unbrella/skin coat for outsourses team/tent/badage；\nPurhase Office and players' supplies；\nHotel arrangement for committee and part of paid clients and potencial clients;\nTransportation for picking up and drop off the airport for committee/players/coach;\n\nDuring the tournament（赛中）\nManage the catering for committee;\nShuttle car from hotel to club house;\nManage the award ceremony;\n\nAfter the Tournament（赛后）\nManage the cashflow and payment to outsource team;\nManage the invoices from all parties;\nPacking with the team and clean up.",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 373,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "role":4,
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "之前整理了一个会议纪要，见图片1；\n后来从分层归类角度又重新整理一下，见图片2\n调整的重点：重新归类，重新分组，主线更清晰，要点更明确。",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 124,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "微博的文章内容和篇幅得改善了，平时做深度思考太少了。\n最近思考的主题是生活中顺其自然会平静很多。。\n首先孩子教育问题，不宜大声吼或者强迫他一定完成钢琴作业。\n其次夫妻关系方面，如果他没时间陪孩子就随便吧，他主动陪伴时也不挑他毛病。",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 664,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                ],
                "end": false
            },
            "code": 200
        }
    )
  },Math.random()*1500);
});


router.post("/rise/practice/comment/*",(req,res)=>{
  setTimeout(()=>{
    res.status(200).json(
      {"msg":{"id":null,"comment":"ccccc","name":"风之伤","discussTime":"2017-03-01","avatar":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488373052881&di=7a470b200f5f2f97d0d7fe5598c34cf9&imgtype=0&src=http%3A%2F%2Fci.xiaohongshu.com%2F5c3f7604-0ca9-4d7d-bcc3-8d8667399307%40r_640w_640h.jpg"},"code":200}
    );
  },Math.random()*1500);
});

router.get("/rise/practice/subject/list/*",(req,res)=>{
  setTimeout(()=>{
    res.status(200).json({"msg":{"list":[{        "requestCommentCount":1,"title":"团队成员的绩效表现为什么不佳？","userName":"Chloé\uD83C\uDF38","submitUpdateTime":"2017-04-18","role":6,"headImage":"http://wx.qlogo.cn/mmopen/Bqm3aw1TmGlHZDT30nZLHgYsBTxNN5eWWzX7ibBgulX8TVUhWMx9RQ2awkFbkGPt0kDfplxFmzVDErWpQvEr3yibmgGY8PIHeX/0","content":"如图所示<img src=\"http://www.confucius.mobi/images/subject/subject-pefect5.jpeg\" width=\"90%\"/>","voteCount":0,"commentCount":2,"submitId":8,"type":1,"voteStatus":0,"publishTime":null,"priority":null,"perfect":true,"problemId":null,"authorType":2,"isMine":true,"labelList":[{"id":20,"labelId":21,"articleModule":3,"articleId":8,"del":false}],"picList":["http://www.confucius.mobi/images/subject/subject-pefect5.jpeg"]},{"title":"早上起不来的真正原因","userName":"Chloé\uD83C\uDF38","submitUpdateTime":"2017-04-18","headImage":"http://wx.qlogo.cn/mmopen/Bqm3aw1TmGlHZDT30nZLHgYsBTxNN5eWWzX7ibBgulX8TVUhWMx9RQ2awkFbkGPt0kDfplxFmzVDErWpQvEr3yibmgGY8PIHeX/0","content":"学习了找到本质问题，减少无效努力之后，通过5个为什么终于找到了一直困扰个人无法早起而产生焦虑的本质问题。\n\n发现本质问题的过程是这样的：最近自己一直无法早起而产生焦虑等情绪，利用5个为什么不断追问，挖掘出焦虑的原因是对个人目前现状不满意。而针对此问题是否是本质问题呢？又通过多次问了几个为什么，为什么对现状不满意，是因为最近工作不是很顺利，为什么工作不顺利，是因为老板给别人加薪，却没有给自己加薪，让自己感觉到自己能力不够，所以才没有加薪。那究竟是哪方面的能力不够呢，反观其他被加薪的同事，然后对比自身情况，发现个人独立带团队和领导的能力不足，导致个人没有加薪也无晋升，所以才产生了一系列的焦虑情绪，而自己为了让个人好受一些，就想要通过早起来摆脱这些情绪，但是这样做无非是头痛医脚，没有作用。\n\n所以通过多问几个为什么，发现情绪背后或事件背后的本质问题，然后对症下药，才能真正做到药到病除，否则都是无用功。","voteCount":0,"commentCount":1,"submitId":14,"type":1,"voteStatus":0,"publishTime":null,"priority":null,"perfect":true,"problemId":null,"authorType":2,"isMine":false,"labelList":[],"picList":[]},{"title":"致新人：先把事情做对，再把事情做好","userName":"神韵-Albert Han","submitUpdateTime":"2017-04-18","headImage":"http://wx.qlogo.cn/mmopen/PiajxSqBRaEJnd7yZzEtibGKDFMaDaNQaZUtUPBJCtlhfPkYPUViaQ89NBNLv6RoHGluMgGyGKAMAFBLg7nUichNpg/0","content":"<p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">引子：初入职场，学会提问，能让你少走弯路</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">今天的文章来自后台一位读者的提问：</span></p><blockquote style=\"border: 0px; margin: 0px; padding: 0px; font-size: 14px; color: rgb(102, 102, 102); font-family: 微软雅黑;\"><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; color: rgb(0, 0, 0); text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">我刚参加工作不久。当时面试进入这家公司很不容易，这家公司在行业内也蛮有名的。我被分配到一个项目组里，老大和同事人都不错，每天也有开始教我一些东西。公司定期会有培训，感觉自己要学习的东西特别多。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; color: rgb(0, 0, 0); text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">我渐渐觉得压力很大，分配给我的工作我都尽量认真做好，想给大家留下一个好印象，但是总是不得要领，总犯低级错误。看到周围跟我同时期进来的人已经开始能够做一些小项目了，我还是原地踏步。我有时候觉得好急，可也不知道该怎么办，我是不是太笨了？</span></p></blockquote><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">首先我想说，<strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">你一心想把事情做好的这份心很值得赞赏</span></strong>。比起我见过的很多跟你差不多年龄却已经开始每天想着怎么在工作上偷懒混日子的人强多了。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">其次，我猜你可能还没有掌握这份工作的要领，或者说，还<strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">没有熟悉你真正的岗位职责</span></strong>。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: center;\"><img src=\"http://img.mp.itc.cn/upload/20160904/917634eae2ee47c5bddea16fb8bc8bc9_th.jpeg\" style=\"border: 0px; margin: 0px; padding: 0px; font-size: 0px; color: transparent;\"></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑;\">　　<span style=\"border: 0px; margin: 0px; padding: 0px;\">我说的岗位职责可不仅仅是招聘面试上写的那一段“岗位要求”的文字。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">先说个身边的例子。我有个朋友，她的第一份工作是做助理。她的老板是一个典型雷厉风行的女强人。初进入这家杂志公司的时候，她每天都提心吊胆，生怕自己做错了什么事情。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">这个情景很像电影《穿 Prada 的恶魔》里的剧情。有一次老板的女儿过生日，安排她去订一个生日蛋糕，她顺手订了一个巧克力口味的。结果好巧不巧老板的女儿什么口味都能吃，唯独不喜欢吃巧克力口味的。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">她在订蛋糕之前并没有询问过口味的喜好，更不要说蛋糕尺寸的大小，蜡烛要几根，是否要加特殊的食材等等。最后的结果是蛋糕已经订好，生日 Party 也已经准备就绪，木已成舟只能“顺”水推舟。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">那家公司在招聘面试上写的岗位职责，可绝不会写“帮老板订生日蛋糕”这种事情，但却实实在在发生了。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑;\">　　<img src=\"http://img.mp.itc.cn/upload/20160904/7fbbfbc6a5e94817acabaed731aec7bb_th.jpeg\" style=\"border: 0px; margin: 0px; padding: 0px; font-size: 0px; color: transparent;\"></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">而她犯的错误其实很多职场新人都容易犯：<strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">做事会按照自己以往的风格习惯来，而不是适应职场上的“新习惯”</span></strong>。我猜提问的这位读者，你在每天的实际工作中也经常碰到类似这样的问题。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">想把事情做好没错，但是在做好之前有个大前提，叫<strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">“先把事情做对”</span></strong>。刚开始工作的头一两年，更多是需要熟悉自己的岗位，公司和同事之间的规则。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">这个规则有人情世故，有职能划分，有效果评定，有奖惩规章，还有公司文化等等。在完全掌握这些规则之前，尽量先让自己把事情做“对”，做到六七十分，再去想怎么做到九十分一百分甚至一百二十分。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">一步登天青云直上的人有，但这就跟摸彩票一样是天时地利人和的结果，可模仿性很小。况且，人家背后所付出的艰辛也远远超过你的想象。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">虽然我不知道你具体在实际工作中遇到的是怎样的困惑，<strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">但有一些“习惯”我觉得越早养成会越好</span></strong>。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: center;\"><img src=\"http://img.mp.itc.cn/upload/20160904/7e63e3d73967434ba8fcf436b55661ab.gif\" style=\"border: 0px; margin: 0px; padding: 0px; font-size: 0px; color: transparent;\"></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: center;\"><strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px; font-size: 16px;\">一、把你过去不好的习惯全部清零</span></strong></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">都说初入社会的新人是一张白纸，这个说法我觉得有待商权。如果说工作经验，确实是一张白纸；但是在为人处事上，就绝不是白纸了。<strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">许多在读书时期养成的习惯，会对以后工作和生活造成巨大影响。而有些不好的习惯，越早戒掉越好</span></strong>。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">比如说，以前都是家长父母围着自己转，做事很少求过人。但在工作中，大家更多的还是凭实力说话，你过去的这些“优势”很可能在你入职的第一天就荡然无存。当你问旁边同事一个简单问题的时候，很可能对方理都不理你，<strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">这种落差带来的挫败感很可能让你觉得周围的环境和自己格格不入</span></strong>。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">比如说，以前你是个品学兼优的好孩子，年年都是奖学金小能手。但是在实际工作上，你却发现连一份简单的 Excel 表做了十遍都达不到要求，这个时候你很可能会觉得是老板看你不爽，故意给你找茬儿。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">再比如说，老是给你安排一些打杂的工作。就我所在的广告公司而言，很多刚来没多久的实习生新人，日常工作基本上都是：订一张机票，贴组里成员报销的发票，订一间会议室，发一封会议邀请通知，给到公司的客户买 10 杯星巴克的外卖等等。这个时候你很可能觉得一点成就感都没有，觉得自己大好的才华和抱负都被埋没了。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: center;\"><img src=\"http://img.mp.itc.cn/upload/20160904/a584929e274a4238b631bdc84183cec9_th.jpeg\" style=\"border: 0px; margin: 0px; padding: 0px; font-size: 0px; color: transparent;\"></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">这些都是我曾经遇过或者听到过的故事，我自己也或多或少经历过。但是现在回头再来看，当时如果早点避免以上这些想法我应该会成长地更快。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">除非你有出类拔萃的本领，能够解决大家都不能解决的问题，那么别人围着你转才说的过去；</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">一份 Excel 表格背后的学问大的很，它的用途，查看它的人群，背后的目的和用途，你是不是都了解清楚了，这可不只是纠结这一栏的数字应该放在左边还是右边，用红色还是紫色；</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><strong style=\"border: 0px; margin: 0px; padding: 0px;\">如果连一份打杂的事情都做不好，没有人敢把更重要的事情交给你</strong><span style=\"border: 0px; margin: 0px; padding: 0px;\">。很多你现在仰望的大咖牛人，最初很可能都是从一份前台的工作开始做起；</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">把姿态放低一点，才会有人愿意教你。多学会一点隐忍，才会有厚积薄发的可能。无论在学校多么厉害，刚工作的时候大家的起跑线都是一样的。每个人都喜欢和谦虚的人一起工作，尤其是新人。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑;\">　　<img src=\"http://img.mp.itc.cn/upload/20160904/9de08334ac2747dbbeaff52da9e8dcdf.gif\" style=\"border: 0px; margin: 0px; padding: 0px; font-size: 0px; color: transparent;\"></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: center;\"><strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px; font-size: 16px;\">二、养成多问问题的习惯，</span></strong></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: center;\"><strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px; font-size: 16px;\">并且一定要记下来</span></strong></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">很多时候没人有义务主动去教你，但这不代表你就可以每天躺尸一样坐在位置上无所事事。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">新人可能觉得自己问的问题很白痴而不好意思去问，比如“这个发票应该怎么贴？”，“这个文件应该怎么保存？”，“这台打印机应该怎么用？”。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">但比起那些因为不知道怎么处理而造成工作中更多不必要的麻烦（比如我曾看见其他组的新人在公司重要会议上因为不知道怎么用打印机扫描文件而耽误了所有人的时间），你<strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">还是越早弄清楚越好</span></strong>。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">大多数职场中的同事，都是很友善的。只要你不是摆着一张“我是女王””我是明星”的傲娇扑克脸，客气地去请教，大家都是愿意教你的。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: center;\"><img src=\"http://img.mp.itc.cn/upload/20160904/4274d5d1d50448338664edc02583c296_th.jpeg\" style=\"border: 0px; margin: 0px; padding: 0px; font-size: 0px; color: transparent;\"></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">这时候我<strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">强烈建议你随身带一个小本子，把对方说的答案记下来</span></strong>。这样做有两个好处：</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">1. 口头的话语往往是零散不成系统的，当时说的东西很可能过一阵再想起来跟没说一样。拿一只笔按一二三点记下来，等对方说完之后再重新确认一遍，确保万无一失。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">2. 好记性永远不如烂笔头，这么做避免了以后遇到同样的问题再去询问对方。虽然大家都很友善，但同一个问题没有人喜欢一直回答。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">我刚开始工作那阵，在办公桌上一直有一个小本子，每次做错事情都会记下来，做错的原因，以后怎么避免，再遇到类似的事情怎么处理等等。这本子我用了两年。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">每个人都会犯错，但<strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">同样的错误不要再犯第二次</span></strong>。做到这一点，非常非常非常加分。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑;\">　　<img src=\"http://img.mp.itc.cn/upload/20160904/42e689ce7832459d88ea48e4d484e4a5.gif\" style=\"border: 0px; margin: 0px; padding: 0px; font-size: 0px; color: transparent;\"></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: center;\"><strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px; font-size: 16px;\">三、察言观色不是世故</span></strong></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">职场中的沟通技巧非常重要。对于新人来说，懂得观察和分析对方的言语，揣摩背后的情绪变化，是最先应该学会的。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">我的一位同事，最近想招一个新人。面试的几个人中，有一个小朋友非常有“热情”。面试完毕后不断在微信上询问我同事觉得他怎么样，并且一再表示非常仰慕这家公司，希望能够将自己的青春“奉献\" 给这里。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">首先，他的诚意确实很足，任何公司都希望能有充满活力的新人加入。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">但是，招聘并不是今天面试明天就能确定的。任何招过人的人都知道，这其中有用人部门的评估，应聘者的筛选和对比，向更上级的汇报等等。那些大的公司，招聘流程走一两个月是很正常的事情。这段时间，能够做的就是耐心等待，同时可以寻求其他的面试机会，多方对比。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑;\">　　<img src=\"http://img.mp.itc.cn/upload/20160904/f6bf1ac86c1e45e8849b31287dca165b_th.jpeg\" style=\"border: 0px; margin: 0px; padding: 0px; font-size: 0px; color: transparent;\"></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">而不是隔三差五每天都在微信上“骚扰”招聘人。特别是在我同事已经三番五次明确表示“请耐心等待，公司流程会比较久一点”的时候，还一如既往地发大段的信息表明自己的“雄心壮志”，希望以此打动招聘人。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">对不起，这样打动不了任何人，只会让人觉得厌烦。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">如果最基本的察言观色都做不到，你连把一件事情“做对”的机会都没有。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">最基本的察言观色包括：</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">1. 对对方回复文字的情绪判断，如果每次都是简短的几个字回复，很有可能对方在忙。如果有比较复杂的事情要说，可以约个时间再聊，而不是噼里啪啦一段文字或者语音发过去。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">2. 当发现对方讲话的语气和平时有差别时，一定要多留心眼。很多人讲话都会有特定的习惯，比如喜欢使用某些语气助词，喜欢使用某些标点符号甚至表情。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑;\">　　<img src=\"http://img.mp.itc.cn/upload/20160904/c6a2ffcb0e0a4c68b90aff211e867463_th.jpeg\" style=\"border: 0px; margin: 0px; padding: 0px; font-size: 0px; color: transparent;\"></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">当你发现有一天突然对方和你沟通的话术里这些习惯都荡然无存的时候，一定要留心是发生了什么事情。无论和你有没有关系，都不要像以前那样随随便便说话。注意措辞，就事论事，不要妄加猜测和臆断。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">3.<strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">不要随意打断正在讲话的人</span></strong>。即使你突然灵光一闪，即使你不同意对方的上一句话，也请等对方全部讲完再一一回复。这是基本礼貌。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">4. 当对方的答复和你所期望的回答背道而驰时，<strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">不要强加自己的思想给对方</span></strong>。可以采用迂回的策略去探究对方拒绝你的原因，而不是纠结“你为什么拒绝我”或者“求求你答应我吧”。这么做只会激化矛盾。从原因入手，从下至上逐条分析，找到反驳或者突破的点，有理有据地说服对方。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">以上三点是我个人经验的一些分享。虽然不能帮助你马上变成耀眼的新人明星，但起码能够帮助你少走很多弯路。还是那句话，<strong style=\"border: 0px; margin: 0px; padding: 0px;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">只有把事情先做对了，你才有机会把事情做好</span></strong>。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><strong style=\"border: 0px; margin: 0px; padding: 0px;\">踏实是最快的成功方法</strong><span style=\"border: 0px; margin: 0px; padding: 0px;\">。</span></p><p style=\"border: 0px; margin: 0px; padding: 26px 0px 0px; font-size: 14px; font-family: 微软雅黑; text-align: justify;\"><span style=\"border: 0px; margin: 0px; padding: 0px;\">完。</span></p>","voteCount":0,"commentCount":0,"submitId":46,"type":1,"voteStatus":0,"publishTime":null,"priority":null,"perfect":true,"problemId":null,"authorType":1,"isMine":false,"labelList":[{"id":30,"labelId":2,"articleModule":3,"articleId":46,"del":false}],"picList":[]},{"title":"通过提问挖掘病人的真实需求","userName":"ooooooooooooooooooo","submitUpdateTime":"2017-04-18","headImage":"http://wx.qlogo.cn/mmopen/Bqm3aw1TmGkdfVyGr3Yx4QBzJRmHD1DBicicYsOv3rMPW4r32KUjsOF6Aa37U7mqVqvFazibDn8N5xiaARic0ndJ1Y75vdGKIaPmh/0","content":"<p><span style=\"font-size: 7.5pt; font-family: 微软雅黑;\">通过学习结构化思维，让我更善于把病人的深层诉求挖掘出来。<br>以前：<br>一病人左手摸着对侧肩膀进来，脸上带着痛苦的微笑道：“有拨火罐吗？”<br>我脸上带着真诚微笑，说了一声“没有”。他失望的低着头，转头推门离开，顺便带上一句有气无力的“谢谢”。<br>现在：<br>一病人左手摸着对侧肩膀进来，脸上带着痛苦的微笑道：“有拨火罐吗？”&nbsp; <br>（思考：这时候我会想“需要拔火罐只是他的表层需求，那么隐藏在这个表层需求下的真实需求究竟是什么呢？当我知道了他的真实需求后我有没有其他的满足办法呢？，当我的思维模式发生变化后于是发生了如下对话。）<br><br>我脸上还是带着一个真诚的微笑“你好！请问你是哪里不舒服吗？”<br>“我肩膀痛”<br>“痛多久了？现在你手放下，不动会痛吗？”<br>“痛几天了，不动不痛，这一上班低头久了就痛。”<br>“好的，那你做几个动作我看一下，头往左右转，抬头低头会痛吗？”<br>他站了个标准的军姿，头往右一转，没事。再往左转头转到一半时就看到他脸上露出了痛苦的表情。<br>“往左转痛！”<br>我走过去，站在他的背后把他的右肩胛骨往上一推，“你再往左转头看看”<br>。<br>他再次小心翼翼的往左转，慢慢的角度越来越大，脸上的眉头慢慢的放开你。“咦，这样就不痛。”<br>（思考：这时候我已经知道他的病症在哪里，并且也知道了拔火罐知识解决问题的途径之一，而在当下还有更合适的解决办法。）<br>我心里默默的念到“寰椎有问题，右侧肩胛提肌有问题”。<br>“我大概知道你问题出在哪了，你进治疗室我再帮你详细检查一下”<br>通过我进一步的检查，确定了他寰椎有半脱位，右侧肩胛提肌受损。通过一个小时的治疗，病人面带微笑，哼着小曲愉快的离开了。<br>综上：当我先转变了自己的思维模式后，我开始从另一个角度去看问题，也可以说直击问题本质—这位病人（客户）的需求是什么，而不是像以前一样—这位病人想要拔火罐。有了这种转变，我就可以从病人真实的需求出发为他量身制定解决方案而不是被病人（客户）牵着走。<br>所以，这招方法可以普遍用在几乎所有和客户打交道的领域。</span><br></p>","voteCount":0,"commentCount":0,"submitId":47,"type":1,"voteStatus":0,"publishTime":null,"priority":null,"perfect":true,"problemId":null,"authorType":1,"isMine":false,"labelList":[],"picList":[]},{"title":"拖延症是病，得治。可是，病根在哪里？","userName":"Chloé\uD83C\uDF38","submitUpdateTime":"2017-04-18","headImage":"http://wx.qlogo.cn/mmopen/Bqm3aw1TmGlHZDT30nZLHgYsBTxNN5eWWzX7ibBgulX8TVUhWMx9RQ2awkFbkGPt0kDfplxFmzVDErWpQvEr3yibmgGY8PIHeX/0","content":"我自己就有拖延症，曾经，我不知道我的拖延症从哪里来？也不知道怎么去对付它？用毅力、监督都无济于事。靠这些要成功，拖延症发病率就不会那么高了！\n\n我会积极主动地打开酷狗音乐，不知疲倦地看《奇葩说》，为什么做这些事不会拖延呢？万为什么专研一个，没有搞清楚的临床问题会孜孜不倦呢？\n\n对比这两类事情，我发现后面的这些事情，不会给人带来压迫感，也就是说，你不要担心承担失败的后果。而早起、学英语、写论文，要不短期看不到效果，要不被拒稿会很沮丧。\n\n所以拖延根本的原因是二个，一个是害怕失败，一个是缺乏短期回馈。\n\n澄清了拖延症的，根本原因之后，我自然就找到了解决拖延症的良方：1.告诉自己只有进步过程中的挫折，过程不是终点，有一口气就不会是失败；2.给自己设定一个根本不会失败的改进性行动计划，因为要求特别低，然后使用i+1原理来逐步提升难度，这样就不会有挫败感；3.达到一个小目标后得给自己一点小小的奖励，听一首自己喜欢的歌、思考一个疑难的医学问题，给自己及时的正反馈，制作一个克服拖延症进度条，坚持一天就给自己提升一格。\n\n拖延症这样必须被治愈。\n","voteCount":0,"commentCount":0,"submitId":16,"type":1,"voteStatus":0,"publishTime":null,"priority":null,"perfect":false,"problemId":null,"authorType":1,"isMine":false,"labelList":[{"id":1,"labelId":28,"articleModule":3,"articleId":16,"del":false},{"id":2,"labelId":29,"articleModule":3,"articleId":16,"del":false}],"picList":[]}],"highlightList":null,"end":true},"code":200});
  },Math.random()*1500);
});


router.get("/rise/practice/subject/desc/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json({"msg":"学习是为了更好地实践。不妨跟大家分享一下，你运用学习的方法找到了什么本质问题。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！","code":200});
    },Math.random()*1500);
});

router.post("/rise/practice/subject/submit/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json({"msg":"ok","code":200});
    },Math.random()*1500);
});

router.get("/rise/practice/label/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json(
            {"msg":[{
                "id":1,
                "problemId":1,
                "name":"标签1",
                "del":false,
            }],"code":200}
        );
    },Math.random()*1500);
});

router.post("/rise/practice/knowledge/learn/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": "ok"
        }), Math.random() * 1500)
});

router.get("/rise/practice/knowledge/start/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "msg": [
                {
                    "id": 57,
                    "knowledge": "故事的三种作用",
                    "step": "",
                    "analysis": "只有故事，才能达到共情、建立人与人之间的链接、塑造深层次的认同感。\n\n故事是一种有别于逻辑和数据的思维模式，可以被广泛运用与职场管理、市场营销、市场社交的领域。\n",
                    "means": "在以说服为目的的情景中，有三种代表性的故事：\n\n第一种：故事化包装，主要起到吸引受众的作用\n\n第二种：类比类故事，主要起到帮助受众理解的作用\n\n第三种：典型事例类故事，主要起到使受众对概念的理解更具象的作用\n",
                    "keynote": "\n\n",
                    "pic": null,
                    "audio": null,
                    "appear": 0,
                    "example": {
                        "id": 679,
                        "question": "初中语文课本上有一篇古文《邹忌讽齐王纳谏》。齐国的相邹忌，身高八尺多，容貌光艳美丽。有一天邹忌上朝拜见齐威王，说：“城北的徐公，是齐国的美男子。我不相信自己会比徐公美丽。有一天早晨我穿戴好衣帽，照着镜子，问妻子：‘我与城北的徐公相比，谁更美丽呢？’我妻子说：‘您美极了，徐公怎么能比得上您呢！’。我又问小妾，妾说：‘徐公怎么能比得上您呢？’。第二天，有客人从外面来拜访，我问客人，客人说：“徐公不如您美丽啊。”又过了一天，徐公前来拜访，我仔细地端详他，觉得远远比不上人家。晚上，我躺在床上想这件事：我的妻子说我美，是偏爱我；我的小妾说我美，是惧怕我；客人说我美，是想要有求于我。如今的齐国，土地方圆千里，有一百二十座城池，宫中的姬妾和身边的近臣，没有不偏爱大王的；朝廷中的大臣，没有不惧怕大王的；国内的百姓，没有不对大王有所求的：由此看来，大王受蒙蔽一定很厉害了。”请问，邹忌对齐威王讲的这个故事，属于以说服为目的的情景下，三种代表性故事类型的哪一种？起到了什么作用？",
                        "type": 1,
                        "analysis": "明显属于类比类故事，将君王身边的姬妾、大臣、百姓和自己的妻子、小妾、朋友做类比，帮助齐王理解：你面对的不同的人，会因为各自的私心而蒙蔽你，需要有清醒的认识",
                        "pic": null,
                        "difficulty": 2,
                        "knowledgeId": 57,
                        "sceneId": 1,
                        "del": false,
                        "problemId": 13,
                        "sequence": 1,
                        "example": true,
                        "practiceUid": "T014A015B001Y01001",
                        "score": 0,
                        "choiceList": [
                            {
                                "id": 2057,
                                "questionId": 679,
                                "subject": "典型事例类故事，主要起到使受众对概念的理解更具象的作用",
                                "sequence": 1,
                                "isRight": false,
                                "selected": false
                            },
                            {
                                "id": 2058,
                                "questionId": 679,
                                "subject": "类比类故事，主要起到帮助受众理解的作用",
                                "sequence": 2,
                                "isRight": true,
                                "selected": false
                            },
                            {
                                "id": 2059,
                                "questionId": 679,
                                "subject": "故事化包装，主要起到吸引受众的作用",
                                "sequence": 3,
                                "isRight": false,
                                "selected": false
                            }
                        ],
                        "discussList": null,
                        "choice": null,
                        "knowledge": {
                            "id": 57,
                            "knowledge": "故事的三种作用",
                            "step": "",
                            "analysis": "只有故事，才能达到共情、建立人与人之间的链接、塑造深层次的认同感。\n\n故事是一种有别于逻辑和数据的思维模式，可以被广泛运用与职场管理、市场营销、市场社交的领域。\n",
                            "means": "在以说服为目的的情景中，有三种代表性的故事：\n\n第一种：故事化包装，主要起到吸引受众的作用\n\n第二种：类比类故事，主要起到帮助受众理解的作用\n\n第三种：典型事例类故事，主要起到使受众对概念的理解更具象的作用\n",
                            "keynote": "\n\n",
                            "pic": null,
                            "audio": null,
                            "appear": null,
                            "example": null
                        }
                    }
                },
            ],
            "code": 200
        }), Math.random() * 1500)
});

router.post("/rise/practice/request/comment/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": "ok"
        }), Math.random() * 1500)
});

router.get("/rise/practice/subject/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": {
                "requestCommentCount": 0,
                "title": "团队成员的绩效表现为什么不佳？",
                "userName": "Chloé\uD83C\uDF38",
                "submitUpdateTime": "2017-04-18",
                "role": 6,
                "headImage": "http://wx.qlogo.cn/mmopen/Bqm3aw1TmGlHZDT30nZLHgYsBTxNN5eWWzX7ibBgulX8TVUhWMx9RQ2awkFbkGPt0kDfplxFmzVDErWpQvEr3yibmgGY8PIHeX/0",
                "content": "如图所示<img src=\"http://www.confucius.mobi/images/subject/subject-pefect5.jpeg\" width=\"90%\"/>",
                "voteCount": 0,
                "commentCount": 2,
                "submitId": 8,
                "type": 1,
                "voteStatus": 0,
                "publishTime": null,
                "priority": null,
                "perfect": true,
                "problemId": null,
                "authorType": 2,
                "isMine": true,
                "labelList": [{"id": 20, "labelId": 21, "articleModule": 3, "articleId": 8, "del": false}],
                "picList": ["http://www.confucius.mobi/images/subject/subject-pefect5.jpeg"],
                "desc":'学习是为了更好地实践。不妨跟大家分享一下，你运用学习的方法找到了什么本质问题。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！'
            }
        }), Math.random() * 1500)
});

router.post("/rise/practice/warmup/delete/comment/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json({"msg":"ok","code":200});
    },Math.random()*1500);
});

router.post("/rise/practice/delete/comment/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json({"msg":"ok","code":200});
    },Math.random()*1500);
});

router.get("/rise/practice/application/article/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json({
            "msg": {
                "id": null,
                "topic": "用5W1H给多啦A梦找女朋友",
                "description": "<p>测试测试</p >",
                "comments": null,
                "planId": null,
                "integrated": null
            },
            "code": 200
        });
    },Math.random()*1500);
});

router.get("/rise/practice/knowledge/discuss/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json({
            "code": 200,
            "msg": [
                {
                    "id":2,
                    "repliedId": 1,
                    "comment":"新增的评论",
                    "repliedName": "风之伤",
                    "repliedComment": "评论评论评论",
                    "repliedDel":0,
                    "knowledgeId": 49,
                    "name":"Diane",
                    "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
                    "discussTime":"10:30",
                    "isMine":true,
                },

                {
                    "id":1,
                    "repliedId": null,
                    "comment":"评论评论评论",
                    "repliedName": null,
                    "repliedComment": null,
                    "repliedDel":null,
                    "knowledgeId": 49,
                    "name":"风之伤",
                    "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
                    "discussTime":"10:38"
                }
            ]
        });
    },Math.random()*1500);
});

router.post("/rise/practice/knowledge/discuss",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json({"msg":"ok","code":200});
    },Math.random()*1500);
});

router.get("/rise/practice/knowledge/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json({
            "code": 200,
            "msg": {
                "id": 57,
                "knowledge": "故事的三种作用",
                "step": "",
                "analysis": "只有故事，才能达到共情、建立人与人之间的链接、塑造深层次的认同感。\n\n故事是一种有别于逻辑和数据的思维模式，可以被广泛运用与职场管理、市场营销、市场社交的领域。\n",
                "means": "在以说服为目的的情景中，有三种代表性的故事：\n\n第一种：故事化包装，主要起到吸引受众的作用\n\n第二种：类比类故事，主要起到帮助受众理解的作用\n\n第三种：典型事例类故事，主要起到使受众对概念的理解更具象的作用\n",
                "keynote": "\n\n",
                "pic": null,
                "audio": null,
                "appear": 0,
                "example": {
                    "id": 679,
                    "question": "初中语文课本上有一篇古文《邹忌讽齐王纳谏》。齐国的相邹忌，身高八尺多，容貌光艳美丽。有一天邹忌上朝拜见齐威王，说：“城北的徐公，是齐国的美男子。我不相信自己会比徐公美丽。有一天早晨我穿戴好衣帽，照着镜子，问妻子：‘我与城北的徐公相比，谁更美丽呢？’我妻子说：‘您美极了，徐公怎么能比得上您呢！’。我又问小妾，妾说：‘徐公怎么能比得上您呢？’。第二天，有客人从外面来拜访，我问客人，客人说：“徐公不如您美丽啊。”又过了一天，徐公前来拜访，我仔细地端详他，觉得远远比不上人家。晚上，我躺在床上想这件事：我的妻子说我美，是偏爱我；我的小妾说我美，是惧怕我；客人说我美，是想要有求于我。如今的齐国，土地方圆千里，有一百二十座城池，宫中的姬妾和身边的近臣，没有不偏爱大王的；朝廷中的大臣，没有不惧怕大王的；国内的百姓，没有不对大王有所求的：由此看来，大王受蒙蔽一定很厉害了。”请问，邹忌对齐威王讲的这个故事，属于以说服为目的的情景下，三种代表性故事类型的哪一种？起到了什么作用？",
                    "type": 1,
                    "analysis": "明显属于类比类故事，将君王身边的姬妾、大臣、百姓和自己的妻子、小妾、朋友做类比，帮助齐王理解：你面对的不同的人，会因为各自的私心而蒙蔽你，需要有清醒的认识",
                    "pic": null,
                    "difficulty": 2,
                    "knowledgeId": 57,
                    "sceneId": 1,
                    "del": false,
                    "problemId": 13,
                    "sequence": 1,
                    "example": true,
                    "practiceUid": "T014A015B001Y01001",
                    "score": 0,
                    "choiceList": [
                        {
                            "id": 2057,
                            "questionId": 679,
                            "subject": "典型事例类故事，主要起到使受众对概念的理解更具象的作用",
                            "sequence": 1,
                            "isRight": false,
                            "selected": false
                        },
                        {
                            "id": 2058,
                            "questionId": 679,
                            "subject": "类比类故事，主要起到帮助受众理解的作用",
                            "sequence": 2,
                            "isRight": true,
                            "selected": false
                        },
                        {
                            "id": 2059,
                            "questionId": 679,
                            "subject": "故事化包装，主要起到吸引受众的作用",
                            "sequence": 3,
                            "isRight": false,
                            "selected": false
                        }
                    ],
                    "discussList": null,
                    "choice": null,
                    "knowledge": {
                        "id": 57,
                        "knowledge": "故事的三种作用",
                        "step": "",
                        "analysis": "只有故事，才能达到共情、建立人与人之间的链接、塑造深层次的认同感。\n\n故事是一种有别于逻辑和数据的思维模式，可以被广泛运用与职场管理、市场营销、市场社交的领域。\n",
                        "means": "在以说服为目的的情景中，有三种代表性的故事：\n\n第一种：故事化包装，主要起到吸引受众的作用\n\n第二种：类比类故事，主要起到帮助受众理解的作用\n\n第三种：典型事例类故事，主要起到使受众对概念的理解更具象的作用\n",
                        "keynote": "\n\n",
                        "pic": null,
                        "audio": null,
                        "appear": null,
                        "example": null
                    }
                }
            }
        });
    },Math.random()*1500);
});

module.exports = router;
