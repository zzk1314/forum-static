var Router = require("express").Router;

var router = new Router();

router.get("/rise/problem/list/unchoose", (req, res) => {
	setTimeout(() =>
		res.status(200).json(
      {
        "msg": {
          "name": "风之伤",
          "catalogList": [
            {
              "name": "测试分类",
              "pic": "http://www.iquanwai.com/images/fragment/problem5_1.png",
              "problemList": null
            },
            {
              "name": "测试分类2",
              "pic": "http://www.iquanwai.com/images/fragment/problem5_1.png",
              "problemList": [
                {
                  "id": 2,
                  "problem": "跟老板/家人提要求时更有说服力",
                  "pic": "http://www.iquanwai.com/images/fragment/problem2.png",
                  "length": 5,
                  "warmupCount": 10,
                  "applicationCount": 5,
                  "challengeCount": 1,
                  "description": "以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握<br/>1）提出明确的诉求<br/>2）讲好故事<br/>3）有效使用证据<br/>结合运用理性和感性，能更好说服他人。<br/><br/>对应这三个目标，你未来将要学习的知识点如下：<br/>1）明确提出诉求——概括主题<br/>2）讲好故事——SCQA<br/>3）有效使用证据——证据的效力<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。",
                  "catalogId": "1",
                  "status": 2,
                  "newProblem":true,
                },
                {
                  "id": 1,
                  "problem": "与人沟通时条理更清晰",
                  "pic": "http://www.iquanwai.com/images/fragment/problem1.png",
                  "length": 5,
                  "warmupCount": 10,
                  "applicationCount": 5,
                  "challengeCount": 1,
                  "description": "以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握<br/>1）提出明确的诉求<br/>2）讲好故事<br/>3）有效使用证据<br/>结合运用理性和感性，能更好说服他人。<br/><br/>对应这三个目标，你未来将要学习的知识点如下：<br/>1）明确提出诉求——概括主题<br/>2）讲好故事——SCQA<br/>3）有效使用证据——证据的效力<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握<br/>1）提出明确的诉求<br/>2）讲好故事<br/>3）有效使用证据<br/>结合运用理性和感性，能更好说服他人。<br/><br/>对应这三个目标，你未来将要学习的知识点如下：<br/>1）明确提出诉求——概括主题<br/>2）讲好故事——SCQA<br/>3）有效使用证据——证据的效力<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。",
                  "catalogId": "1",
                  "audio": "http://www.iquanwai.com/images/fragment/rise_p1.m4a",
                  "status": 0,
                  "trial": true,
                }
              ]
            }
          ]
        },
        "code": 200
      }
    ), Math.random() * 1500)
});

router.post("/rise/problem/select", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": "ok"
		}), Math.random() * 1500)
});

router.get("/rise/problem/load/mine", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"problemList": [
					{
						"problemId": 1, //问题id
						"problem": "问题描述", //问题描述
						"status": 0 //0-待解决，1-解决中，2-已解决
            },
            {
              "problemId": 2, //问题id
              "problem": "问题描述", //问题描述
              "status": 0 //0-待解决，1-解决中，2-已解决
            }
				]
			}
		}), Math.random() * 1500)
});

router.get("/rise/problem/get/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({"msg":{"id":1,"problem":"与人沟通时条理更清晰","pic":"https://www.iqycamp.com/images/fragment/problem1_3.png","length":9,"description":"为什么有些人的文章思路特别清晰，令人读后印象深刻，而有些人的文章却让人不知所云？<br/><br/>为什么有些人即兴发言也能侃侃而谈，而有些人一开口却大脑一片空白？<br/><br/>如果做到以下四点，你的沟通就能更有条理，更容易被理解。<br/>1）表达时主题先行<br/>2）将同类信息归在一组<br/>3）确保信息归类不重叠不遗漏<br/>4）按逻辑顺序组织每组信息","catalogId":1,"subCatalogId":1,"author":"孙圈圈","authorDesc":"孙圈圈，原名孙园媛，移动学习品牌“圈外” （iquanwai）创始人&CEO，前外资管理咨询公司咨询总监，曾为6大行业、50多家大型企业设计过人才发展战略。著有职场干货畅销书《请停止无效努力：如何用正确的方法快速进阶》，豆瓣评分8.7。","difficultyScore":3.2542,"subjectDesc":"学习是为了更好地实践。不妨跟大家分享一下，你的沟通条理。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！","descPic":"https://www.iqycamp.com/images/problem_desc_1_2.jpeg","audio":"https://www.iqycamp.com/audio/rise_p1.m4a","who":"希望提升沟通表达条理性的学生或职场人士","what":"对应4个要点，以下是课程表：","how":"如果做到以下4点，你的沟通就能更有条理，更容易被理解。\n1）先抛主题\n2）将同类信息/内容归在一组\n3）确保信息/内容归类不重叠不遗漏\n4）按逻辑顺序组织每组信息/内容","why":"为什么有些人即兴发言也能侃侃而谈，而有些人一开口却大脑一片空白？\n\n为什么有些人写的报告思路特别清晰，令人读后印象深刻，而有些人的报告却让人不知所云？\n","del":false,"trial":false,"categoryPic":"https://www.iqycamp.com/images/fragment/category2_4.jpeg","done":null,"status":null,"hasProblemScore":false,"chapterList":[{"chapter":1,"sections":[{"section":1,"knowledgeId":1,"name":"将信息归类分组","series":1,"chapter":1,"integrated":false,"chapterName":"结构清晰","practices":[]},{"section":2,"knowledgeId":6,"name":"确保归类不重不漏","series":2,"chapter":1,"integrated":false,"chapterName":"结构清晰","practices":[]}],"name":"结构清晰","integrated":false},{"chapter":2,"sections":[{"section":1,"knowledgeId":2,"name":"用时间顺序组织表达","series":3,"chapter":2,"integrated":false,"chapterName":"有序递进","practices":[]},{"section":2,"knowledgeId":3,"name":"用空间顺序组织表达","series":4,"chapter":2,"integrated":false,"chapterName":"有序递进","practices":[]},{"section":3,"knowledgeId":4,"name":"用程度顺序组织表达","series":5,"chapter":2,"integrated":false,"chapterName":"有序递进","practices":[]},{"section":4,"knowledgeId":5,"name":"用三种顺序组织表达","series":6,"chapter":2,"integrated":false,"chapterName":"有序递进","practices":[]}],"name":"有序递进","integrated":false},{"chapter":3,"sections":[{"section":1,"knowledgeId":7,"name":"表达时主题先行","series":7,"chapter":3,"integrated":false,"chapterName":"主题鲜明","practices":[]}],"name":"主题鲜明","integrated":false},{"chapter":4,"sections":[{"section":1,"knowledgeId":57,"name":"内容回顾 & 综合练习1","series":8,"chapter":4,"integrated":true,"chapterName":"复习","practices":[]},{"section":2,"knowledgeId":58,"name":"内容回顾 & 综合练习2","series":9,"chapter":4,"integrated":true,"chapterName":"复习","practices":[]}],"name":"复习","integrated":true}]},"code":200}), Math.random() * 1500)
});

router.post("/rise/problem/grade/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg":"ok"
        }), Math.random() * 1500)
});

module.exports = router;
