var Router = require("express").Router;
var router = new Router();


// 获取问题列表
router.get("/pc/fragment/problem/list", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
        {
            "msg": [
                {
                    "name": "沟通人际",
                    "problems": [
                        {
                            "id": 1,
                            "problem": "与人沟通时条理更清晰",
                            "status": -1
                        },
                        {
                            "id": 2,
                            "problem": "跟老板/家人提要求时更有说服力",
                            "status": -1
                        },
                        {
                            "id": 5,
                            "problem": "与人撕逼时找到对方逻辑漏洞",
                            "status": -1
                        }
                    ]
                },
                {
                    "name": "思维方法",
                    "problems": [
                        {
                            "id": 3,
                            "problem": "面对前所未有的新问题时撬开脑洞",
                            "status": 1
                        },
                        {
                            "id": 4,
                            "problem": "临场发言也能掷地有声",
                            "status": -1
                        },
                        {
                            "id": 9,
                            "problem": "找到本质问题，减少无效努力",
                            "status": -1
                        },
                        {
                            "id": 10,
                            "problem": "普通人的第一堂营销课",
                            "status": -1
                        },
                        {
                            "id": 11,
                            "problem": "洞察他人行为背后的真相",
                            "status": -1
                        },
                        {
                            "id": 12,
                            "problem": "面对热点事件保持独立思考",
                            "status": -1
                        }
                    ]
                },
                {
                    "name": "职业发展",
                    "problems": [
                        {
                            "id": 6,
                            "problem": "写出令HR过目难忘的简历",
                            "status": -1
                        },
                        {
                            "id": 7,
                            "problem": "在面试中脱颖而出",
                            "status": -1
                        },
                        {
                            "id": 8,
                            "problem": "给自己的未来定个发展策略",
                            "status": -1
                        }
                    ]
                }
            ],
            "code": 200
        }
    )
  }, Math.random() * 1500)
});


// router.get("/pc/fragment/problem/current", (req, res) => {
//   setTimeout(() => {
//     res.status(200).json({
//       "msg": {
//         "id": 4,
//         "status": 1,
//         "pay": true,
//         "problem": null,
//         "pic": null,
//         "challengeList": [{
//           "id": 4,
//           "description": "描述描述描述",
//           "pic": null,
//           "problemId": 4,
//           "submitted": true,
//           "content": "egwegrqr",
//           "picList": null,
//           "submitId": 48,
//           "moduleId": null,
//           "headImg": null,
//           "upName": null,
//           "upTime": null,
//           "voteCount": null,
//           "canVote": null,
//           "planId": null
//         }]
//       }, "code": 200
//     });
//   }, Math.random() * 1500);
// });

router.get("/pc/fragment/problem/curId", (req, res) => {
  setTimeout(() => {
    res.status(200).json({"msg": 4, "code": 200})
  }, Math.random() * 1500)
})


module.exports = router;
