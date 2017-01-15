var Router = require("express").Router;
var router = new Router();


router.get("/pc/fragment/homework/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "challengeWorkList": [
          {
            "type": 21,
            "title": "挑战任务",
            "score": 500,
            "unlocked": true,
            "status": 1,
            "planId": 95,
            "workId": 4
          }
        ],
        "applicationWorkList": [
          {
            "type": 11,
            "title": "即兴演讲",
            "score": 30,
            "unlocked": true,
            "status": 1,
            "planId": 95,
            "workId": 26
          },
          {
            "type": 11,
            "title": "压力缓解",
            "score": 20,
            "unlocked": true,
            "status": 1,
            "planId": 95,
            "workId": 33
          },
          {
            "type": 11,
            "title": "行业报告",
            "score": 30,
            "unlocked": true,
            "status": 1,
            "planId": 95,
            "workId": 4
          },
          {
            "type": 11,
            "title": "职场问题",
            "score": 30,
            "unlocked": true,
            "status": 1,
            "planId": 95,
            "workId": 12
          },
          {
            "type": 11,
            "title": "共享单车小报告",
            "score": 20,
            "unlocked": true,
            "status": 3,
            "planId": 95,
            "workId": 25
          },
          {
            "type": 11,
            "title": "上级沟通",
            "score": 20,
            "unlocked": true,
            "status": 3,
            "planId": 95,
            "workId": 31
          },
          {
            "type": 11,
            "title": "资产配置",
            "score": 20,
            "unlocked": false,
            "status": 3,
            "planId": 95,
            "workId": 5
          },
          {
            "type": 11,
            "title": "工作计划",
            "score": 20,
            "unlocked": false,
            "status": 3,
            "planId": 95,
            "workId": 22
          },
          {
            "type": 11,
            "title": "学会提问",
            "score": 20,
            "unlocked": false,
            "status": 3,
            "planId": 95,
            "workId": 35
          }
        ]
      },
      "code": 200
    });
  }, Math.random() * 1500);
});

router.get("/pc/fragment/application/list/mine/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "title": "即兴演讲",
        "upName": "薛定谔的猫",
        "upTime": "2017年01月15日",
        "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
        "content": "fewfwefnn\n\n\nergreg rgreg\n继英彦章",
        "voteCount": 0,
        "submitId": 2,
        "type": 11
      }, "code": 200
    })
  }, Math.random() * 1500);
});


module.exports = router;
