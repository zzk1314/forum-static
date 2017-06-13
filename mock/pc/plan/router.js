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
        "id": 6925,
        "openid": null,
        "problemId": 16,
        "startDate": "2017-06-12",
        "endDate": "2017-06-20",
        "closeDate": "2017-07-12",
        "completeTime": null,
        "status": 1,
        "point": 0,
        "warmupComplete": 0,
        "applicationComplete": 0,
        "total": null,
        "keycnt": 0,
        "currentSeries": 1,
        "completeSeries": 0,
        "totalSeries": 8,
        "riseMember": true,
        "requestCommentCount": 1,
        "profileId": 9210,
        "problem": {
          "id": 16,
          "problem": "影响力：让他人不再对我们说不",
          "pic": "https://www.iqycamp.com/images/fragment/problem16_1.png",
          "length": 8,
          "description": "为什么有些人即便不在领导岗位上，也能一呼百应？而你提出的新点子却经常被大家忽略？为什么有些人在领导岗位上，能赢得下属的认可和信任？而你在和下属沟通时却时常碰壁？\n\n怎么样提高自己的影响力，让大家不再对自己说“不”？按照以下3个角度来学习，你便可以轻松掌握让他人顺从你的意愿的方法。因为这3个角度，是从最基本的心里原则衍生出来的。你可以利用这些心里原则，来洞察他人的行为，从而去影响和改变他人的态度和行为。\n\n首先，你可以从自身出发，建立影响力。心理学研究表明，人们更容易答应自己喜欢的人所提出的要求，同时人们倾向服从于权威。因此赢得他人的好感、树立起权威，可以让人们更加信任你，从而更愿意答应你的请求。\n\n其次，你可以从事件出发，建立影响力。\n有一个心理学术语叫社会认同，指的是人们更愿意相信大多数人的选择。因此当你在向他人提要求时，强调你想做的这件事，大多数人也在做，那么他们会更容易接受你的要求。\n心理学研究还表明，对于失去某种东西的恐惧，比对获得同一物品的渴望，更能激发人们的行动力。这时，你需要制造稀缺，让大家不舍得放弃你所提供的请求。\n\n最后，你可以通过建立关系，来提高影响力。与关系相关的两种心理学原则分别是：人们会对他人的恩惠给予丰厚回报\n，以及，人们会兑现之前承诺过的事情。前者告诉我们可以建立互惠，你可以通过给他人一点小恩小惠，来让对方在你未来对他们提出请求的时候，主动帮忙。以及通过某些方式让对方许下承诺，那么未来他们一定会兑现承诺。\n\n接下来，我们将会用8节训练依次学习这些影响力原则。其中，最后2节是对前期所学知识的综合复习和应用。通过刻意练习，从学习到应用，真正提高我们的影响力。",
          "catalogId": 1,
          "subCatalogId": 6,
          "author": "孙圈圈",
          "authorDesc": "孙圈圈，原名孙园媛，移动学习品牌“圈外” （iquanwai）创始人&CEO，前外资管理咨询公司咨询总监，曾为6大行业、50多家大型企业设计过人才发展战略。著有职场干货畅销书《请停止无效努力：如何用正确的方法快速进阶》，豆瓣评分8.7。",
          "difficultyScore": 3.5,
          "subjectDesc": "学习是为了更好地实践。不妨跟大家分享一下，你是如何发挥影响力的吧。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！",
          "descPic": "https://www.iqycamp.com/images/fragment/problem_desc_16_1.png",
          "audio": "https://www.iqycamp.com/audio/problem_16.m4a",
          "who": "所有想要提高自己的影响力、不再让他人对我们说“不”的人",
          "what": "",
          "how": "培养影响力，需要从三个角度入手，每个角度下面对应2种要点：\n\n首先，从个人角度，建立影响力——\n1）赢得好感：人们更容易答应自己喜欢的人所提出的要求\n2）树立权威：人们倾向于服从权威\n\n其次，从事件角度，建立影响力——\n1）提升社会认同：人们更相信大多数人的选择\n2）制造稀缺：对于失去某种东西的恐惧，比对获得同一物品的渴望，更能激发人们的行动力\n\n最后，从关系角度，建立影响力——\n1）建立互惠：人们会对他人的恩惠给予丰厚回报\n2）获取承诺：人们会兑现之前承诺过的事情",
          "why": "为什么客户不赞同你的方案？为什么老板总是忽略你的提议？为什么同事不愿意帮你的忙？为什么团队不听你的指挥？为什么觉得自己没有什么气场，不能够成为一呼百应的那个人？\n要解决这些问题，你需要培养自己的影响力，让他人不再拒绝你，而是对你说“行”。\n\n成为一个具有影响力的人，对于我们的工作和生活来说，非常重要。你可以结交更多的朋友，成功地影响人们的态度，你可以巧妙地说服他人，更轻松地与人达成合作。",
          "del": false,
          "newProblem": false,
          "trial": true,
          "categoryPic": "https://www.iqycamp.com/images/fragment/category2_5.jpeg",
          "done": null,
          "status": null,
          "hasProblemScore": null,
          "chapterList": [{
            "chapter": 1,
            "sections": [{
              "section": 1,
              "knowledgeId": 81,
              "name": "赢得好感",
              "series": 1,
              "chapter": 1,
              "integrated": false,
              "chapterName": "建立个人影响力",
              "practices": [{
                "type": 31,
                "status": 1,
                "unlocked": true,
                "practiceIdList": [81],
                "series": 1,
                "sequence": 1,
                "practicePlanId": 204661,
                "optional": false,
                "planId": 6925
              }, {
                "type": 1,
                "status": 0,
                "unlocked": true,
                "practiceIdList": [834, 835, 836, 837, 838, 839],
                "series": 1,
                "sequence": 2,
                "practicePlanId": 204669,
                "optional": false,
                "planId": 6925
              }, {
                "type": 11,
                "status": 0,
                "unlocked": true,
                "practiceIdList": [276],
                "series": 1,
                "sequence": 3,
                "practicePlanId": 204677,
                "optional": true,
                "planId": 6925
              }, {
                "type": 11,
                "status": 0,
                "unlocked": true,
                "practiceIdList": [277],
                "series": 1,
                "sequence": 4,
                "practicePlanId": 204678,
                "optional": true,
                "planId": 6925
              }, {
                "type": 21,
                "status": 0,
                "unlocked": true,
                "practiceIdList": [16],
                "series": 0,
                "sequence": 5,
                "practicePlanId": 204689,
                "optional": true,
                "planId": 6925
              }]
            }, {
              "section": 2,
              "knowledgeId": 82,
              "name": "树立权威",
              "series": 2,
              "chapter": 1,
              "integrated": false,
              "chapterName": "建立个人影响力",
              "practices": [{
                "type": 31,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [82],
                "series": 2,
                "sequence": 1,
                "practicePlanId": 204662,
                "optional": false,
                "planId": 6925
              }, {
                "type": 1,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [840, 841, 842, 843, 844],
                "series": 2,
                "sequence": 2,
                "practicePlanId": 204670,
                "optional": false,
                "planId": 6925
              }, {
                "type": 11,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [278],
                "series": 2,
                "sequence": 3,
                "practicePlanId": 204679,
                "optional": true,
                "planId": 6925
              }, {
                "type": 11,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [279],
                "series": 2,
                "sequence": 4,
                "practicePlanId": 204680,
                "optional": true,
                "planId": 6925
              }]
            }],
            "name": "建立个人影响力",
            "myWarmScore": null,
            "totalWarmScore": null,
            "integrated": false
          }, {
            "chapter": 2,
            "sections": [{
              "section": 1,
              "knowledgeId": 83,
              "name": "提升社会认同",
              "series": 3,
              "chapter": 2,
              "integrated": false,
              "chapterName": "建立事件影响力",
              "practices": [{
                "type": 31,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [83],
                "series": 3,
                "sequence": 1,
                "practicePlanId": 204663,
                "optional": false,
                "planId": 6925
              }, {
                "type": 1,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [845, 846, 847, 848],
                "series": 3,
                "sequence": 2,
                "practicePlanId": 204671,
                "optional": false,
                "planId": 6925
              }, {
                "type": 11,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [280],
                "series": 3,
                "sequence": 3,
                "practicePlanId": 204681,
                "optional": true,
                "planId": 6925
              }]
            }, {
              "section": 2,
              "knowledgeId": 84,
              "name": "制造稀缺",
              "series": 4,
              "chapter": 2,
              "integrated": false,
              "chapterName": "建立事件影响力",
              "practices": [{
                "type": 31,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [84],
                "series": 4,
                "sequence": 1,
                "practicePlanId": 204664,
                "optional": false,
                "planId": 6925
              }, {
                "type": 1,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [849, 850, 851, 852],
                "series": 4,
                "sequence": 2,
                "practicePlanId": 204672,
                "optional": false,
                "planId": 6925
              }, {
                "type": 11,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [281],
                "series": 4,
                "sequence": 3,
                "practicePlanId": 204682,
                "optional": true,
                "planId": 6925
              }]
            }],
            "name": "建立事件影响力",
            "myWarmScore": null,
            "totalWarmScore": null,
            "integrated": false
          }, {
            "chapter": 3,
            "sections": [{
              "section": 1,
              "knowledgeId": 85,
              "name": "建立互惠",
              "series": 5,
              "chapter": 3,
              "integrated": false,
              "chapterName": "建立关系影响力",
              "practices": [{
                "type": 31,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [85],
                "series": 5,
                "sequence": 1,
                "practicePlanId": 204665,
                "optional": false,
                "planId": 6925
              }, {
                "type": 1,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [853, 854, 855, 856, 857],
                "series": 5,
                "sequence": 2,
                "practicePlanId": 204673,
                "optional": false,
                "planId": 6925
              }, {
                "type": 11,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [282],
                "series": 5,
                "sequence": 3,
                "practicePlanId": 204683,
                "optional": true,
                "planId": 6925
              }, {
                "type": 11,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [283],
                "series": 5,
                "sequence": 4,
                "practicePlanId": 204684,
                "optional": true,
                "planId": 6925
              }]
            }, {
              "section": 2,
              "knowledgeId": 86,
              "name": "获取承诺",
              "series": 6,
              "chapter": 3,
              "integrated": false,
              "chapterName": "建立关系影响力",
              "practices": [{
                "type": 31,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [86],
                "series": 6,
                "sequence": 1,
                "practicePlanId": 204666,
                "optional": false,
                "planId": 6925
              }, {
                "type": 1,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [858, 859, 860, 861, 862],
                "series": 6,
                "sequence": 2,
                "practicePlanId": 204674,
                "optional": false,
                "planId": 6925
              }, {
                "type": 11,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [284],
                "series": 6,
                "sequence": 3,
                "practicePlanId": 204685,
                "optional": true,
                "planId": 6925
              }, {
                "type": 11,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [285],
                "series": 6,
                "sequence": 4,
                "practicePlanId": 204686,
                "optional": true,
                "planId": 6925
              }]
            }],
            "name": "建立关系影响力",
            "myWarmScore": null,
            "totalWarmScore": null,
            "integrated": false
          }, {
            "chapter": 4,
            "sections": [{
              "section": 1,
              "knowledgeId": 57,
              "name": "内容回顾 & 综合练习1",
              "series": 7,
              "chapter": 4,
              "integrated": true,
              "chapterName": "复习",
              "practices": [{
                "type": 32,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [57],
                "series": 7,
                "sequence": 1,
                "practicePlanId": 204667,
                "optional": false,
                "planId": 6925
              }, {
                "type": 2,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [863, 864, 865, 866, 867],
                "series": 7,
                "sequence": 2,
                "practicePlanId": 204675,
                "optional": false,
                "planId": 6925
              }, {
                "type": 12,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [286],
                "series": 7,
                "sequence": 3,
                "practicePlanId": 204687,
                "optional": false,
                "planId": 6925
              }]
            }, {
              "section": 2,
              "knowledgeId": 58,
              "name": "内容回顾 & 综合练习2",
              "series": 8,
              "chapter": 4,
              "integrated": true,
              "chapterName": "复习",
              "practices": [{
                "type": 32,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [58],
                "series": 8,
                "sequence": 1,
                "practicePlanId": 204668,
                "optional": false,
                "planId": 6925
              }, {
                "type": 2,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [868, 869, 870, 871, 872],
                "series": 8,
                "sequence": 2,
                "practicePlanId": 204676,
                "optional": false,
                "planId": 6925
              }, {
                "type": 12,
                "status": 0,
                "unlocked": false,
                "practiceIdList": [287],
                "series": 8,
                "sequence": 3,
                "practicePlanId": 204688,
                "optional": false,
                "planId": 6925
              }]
            }],
            "name": "复习",
            "myWarmScore": null,
            "totalWarmScore": null,
            "integrated": true
          }]
        },
        "sections": [{
          "section": 1,
          "knowledgeId": 81,
          "name": "赢得好感",
          "series": 1,
          "chapter": 1,
          "integrated": false,
          "chapterName": "建立个人影响力",
          "practices": [{
            "type": 31,
            "status": 1,
            "unlocked": true,
            "practiceIdList": [81],
            "series": 1,
            "sequence": 1,
            "practicePlanId": 204661,
            "optional": false,
            "planId": 6925
          }, {
            "type": 1,
            "status": 0,
            "unlocked": true,
            "practiceIdList": [834, 835, 836, 837, 838, 839],
            "series": 1,
            "sequence": 2,
            "practicePlanId": 204669,
            "optional": false,
            "planId": 6925
          }, {
            "type": 11,
            "status": 0,
            "unlocked": true,
            "practiceIdList": [276],
            "series": 1,
            "sequence": 3,
            "practicePlanId": 204677,
            "optional": true,
            "planId": 6925
          }, {
            "type": 11,
            "status": 0,
            "unlocked": true,
            "practiceIdList": [277],
            "series": 1,
            "sequence": 4,
            "practicePlanId": 204678,
            "optional": true,
            "planId": 6925
          }, {
            "type": 21,
            "status": 0,
            "unlocked": true,
            "practiceIdList": [16],
            "series": 0,
            "sequence": 5,
            "practicePlanId": 204689,
            "optional": true,
            "planId": 6925
          }]
        }, {
          "section": 2,
          "knowledgeId": 82,
          "name": "树立权威",
          "series": 2,
          "chapter": 1,
          "integrated": false,
          "chapterName": "建立个人影响力",
          "practices": [{
            "type": 31,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [82],
            "series": 2,
            "sequence": 1,
            "practicePlanId": 204662,
            "optional": false,
            "planId": 6925
          }, {
            "type": 1,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [840, 841, 842, 843, 844],
            "series": 2,
            "sequence": 2,
            "practicePlanId": 204670,
            "optional": false,
            "planId": 6925
          }, {
            "type": 11,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [278],
            "series": 2,
            "sequence": 3,
            "practicePlanId": 204679,
            "optional": true,
            "planId": 6925
          }, {
            "type": 11,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [279],
            "series": 2,
            "sequence": 4,
            "practicePlanId": 204680,
            "optional": true,
            "planId": 6925
          }]
        }, {
          "section": 1,
          "knowledgeId": 83,
          "name": "提升社会认同",
          "series": 3,
          "chapter": 2,
          "integrated": false,
          "chapterName": "建立事件影响力",
          "practices": [{
            "type": 31,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [83],
            "series": 3,
            "sequence": 1,
            "practicePlanId": 204663,
            "optional": false,
            "planId": 6925
          }, {
            "type": 1,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [845, 846, 847, 848],
            "series": 3,
            "sequence": 2,
            "practicePlanId": 204671,
            "optional": false,
            "planId": 6925
          }, {
            "type": 11,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [280],
            "series": 3,
            "sequence": 3,
            "practicePlanId": 204681,
            "optional": true,
            "planId": 6925
          }]
        }, {
          "section": 2,
          "knowledgeId": 84,
          "name": "制造稀缺",
          "series": 4,
          "chapter": 2,
          "integrated": false,
          "chapterName": "建立事件影响力",
          "practices": [{
            "type": 31,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [84],
            "series": 4,
            "sequence": 1,
            "practicePlanId": 204664,
            "optional": false,
            "planId": 6925
          }, {
            "type": 1,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [849, 850, 851, 852],
            "series": 4,
            "sequence": 2,
            "practicePlanId": 204672,
            "optional": false,
            "planId": 6925
          }, {
            "type": 11,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [281],
            "series": 4,
            "sequence": 3,
            "practicePlanId": 204682,
            "optional": true,
            "planId": 6925
          }]
        }, {
          "section": 1,
          "knowledgeId": 85,
          "name": "建立互惠",
          "series": 5,
          "chapter": 3,
          "integrated": false,
          "chapterName": "建立关系影响力",
          "practices": [{
            "type": 31,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [85],
            "series": 5,
            "sequence": 1,
            "practicePlanId": 204665,
            "optional": false,
            "planId": 6925
          }, {
            "type": 1,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [853, 854, 855, 856, 857],
            "series": 5,
            "sequence": 2,
            "practicePlanId": 204673,
            "optional": false,
            "planId": 6925
          }, {
            "type": 11,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [282],
            "series": 5,
            "sequence": 3,
            "practicePlanId": 204683,
            "optional": true,
            "planId": 6925
          }, {
            "type": 11,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [283],
            "series": 5,
            "sequence": 4,
            "practicePlanId": 204684,
            "optional": true,
            "planId": 6925
          }]
        }, {
          "section": 2,
          "knowledgeId": 86,
          "name": "获取承诺",
          "series": 6,
          "chapter": 3,
          "integrated": false,
          "chapterName": "建立关系影响力",
          "practices": [{
            "type": 31,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [86],
            "series": 6,
            "sequence": 1,
            "practicePlanId": 204666,
            "optional": false,
            "planId": 6925
          }, {
            "type": 1,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [858, 859, 860, 861, 862],
            "series": 6,
            "sequence": 2,
            "practicePlanId": 204674,
            "optional": false,
            "planId": 6925
          }, {
            "type": 11,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [284],
            "series": 6,
            "sequence": 3,
            "practicePlanId": 204685,
            "optional": true,
            "planId": 6925
          }, {
            "type": 11,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [285],
            "series": 6,
            "sequence": 4,
            "practicePlanId": 204686,
            "optional": true,
            "planId": 6925
          }]
        }, {
          "section": 1,
          "knowledgeId": 57,
          "name": "内容回顾 & 综合练习1",
          "series": 7,
          "chapter": 4,
          "integrated": true,
          "chapterName": "复习",
          "practices": [{
            "type": 32,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [57],
            "series": 7,
            "sequence": 1,
            "practicePlanId": 204667,
            "optional": false,
            "planId": 6925
          }, {
            "type": 2,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [863, 864, 865, 866, 867],
            "series": 7,
            "sequence": 2,
            "practicePlanId": 204675,
            "optional": false,
            "planId": 6925
          }, {
            "type": 12,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [286],
            "series": 7,
            "sequence": 3,
            "practicePlanId": 204687,
            "optional": false,
            "planId": 6925
          }]
        }, {
          "section": 2,
          "knowledgeId": 58,
          "name": "内容回顾 & 综合练习2",
          "series": 8,
          "chapter": 4,
          "integrated": true,
          "chapterName": "复习",
          "practices": [{
            "type": 32,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [58],
            "series": 8,
            "sequence": 1,
            "practicePlanId": 204668,
            "optional": false,
            "planId": 6925
          }, {
            "type": 2,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [868, 869, 870, 871, 872],
            "series": 8,
            "sequence": 2,
            "practicePlanId": 204676,
            "optional": false,
            "planId": 6925
          }, {
            "type": 12,
            "status": 0,
            "unlocked": false,
            "practiceIdList": [287],
            "series": 8,
            "sequence": 3,
            "practicePlanId": 204688,
            "optional": false,
            "planId": 6925
          }]
        }],
        "openRise": true,
        "deadline": 30,
        "hasProblemScore": false,
        "doneAllIntegrated": false,
        "lockedStatus": -1,
        "reportStatus": -1
      }, "code": 200
    }), Math.random() * 1500);
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
