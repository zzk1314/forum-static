var Router = require("express").Router;
var router = new Router();

router.get("/test", (req, res) => {
  res.setState(200).json({"msg": "test"})
});

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


router.get("/pc/fragment/comment/*/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "list": [{
          "id": 27,
          "content": "test",
          "upName": "薛定谔的猫",
          "upTime": "2017年01月22日",
          "role":3,
          "isMine":true,
          "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0"
        }, {
          "id": 26,
          "content": "最后一次提交评论",
          "upName": "薛定谔的猫",
          "upTime": "2017年01月21日",
          "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0"
        }, {
          "id": 25,
          "content": "提交评论",
          "upName": "薛定谔的猫",
          "upTime": "2017年01月21日",
          "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0"
        }, {
          "id": 24,
          "content": "绯闻绯闻分",
          "upName": "薛定谔的猫",
          "upTime": "2017年01月20日",
          "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0"
        }, {
          "id": 23,
          "content": "fefef",
          "upName": "薛定谔的猫",
          "upTime": "2017年01月20日",
          "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0"
        }], "count": 16
      }, "code": 200
    })
  }, Math.random() * 1500);
});

router.post("/pc/fragment/comment/*/*", (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            "msg": {
                "id": 29,
                "content": "fefef",
                "upName": "薛定谔的猫",
                "upTime": "2017年01月20日",
                "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0"
            },
            "code": 200
        })
    }, Math.random() * 1500);
});

router.post("/pc/fragment/delete/comment/*", (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            "msg": "ok",
            "code": 200
        })
    }, Math.random() * 1500);
});

router.post("/pc/fragment/request/comment/*", (req, res) => {
    setTimeout(() => {
        res.status(200).json({code: 200, msg: "ok"});
    }, Math.random() * 1500)
});


router.get("/pc/fragment/knowledge/load/*", (req, res) => {
    setTimeout(() => {
        res.status(200).json(
            {
                "msg": {
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
                "code":200});
    }, Math.random() * 1500);
});

module.exports = router
