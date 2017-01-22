var Router = require("express").Router;
var router = new Router();


router.get("/pc/fragment/challenge/list/mine/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "title": null,
        "upName": "薛定谔的猫",
        "upTime": "2017年01月13日",
        "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
        "content": "egwegrqrffwfwefwefewffwefewf\n\n\n\ntweew",
        "voteCount": 1,
        "submitId": 48,
        "type": 21
      },
      "code": 200
    })
  }, Math.random() * 1500);
});


router.get("/pc/fragment/challenge/list/other/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": [
        {
          "title": null,
          "upName": "Diane",
          "upTime": "2017年01月07日",
          "headPic": "http://wx.qlogo.cn/mmopen/JeB8LAjhPIcjw65snUszv31ea8a1icLicIOWRxkZicHL46ePIRyStHo4rxsVQ3jice8XmKg1e68QGfM1f5ns3HpeOdAtsyLQU8Xp/0",
          "content": "视觉设计大胜利大街卡死的啊啥的精神可嘉读书卡链接到阿斯兰的圣诞节熟练度可骄傲的的刷卡或借记卡回到家看撒谎的卡的还是的杀毒和肯德基和撒旦按时第三节课哈的好时机蝴蝶结卡哈萨克简单的回单卡的后就开始对哈市 ",
          "voteCount": 2,
          "submitId": 33,
          "type": 21
        }
      ],
      "code": 200
    })
  }, Math.random() * 1500);
});


router.get("/pc/fragment/challenge/mine/**", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "id": 4,
        "description": "Hi，欢迎来到圈外社区。<br/>请按照手机端挑战任务的页面提示，在这里记录下你学习的小目标、感悟或经历吧！",
        "pic": null,
        "problemId": 4,
        "submitted": true,
        "content": "egwegrqrffwfwefwefewffwefewf\n\n\n\ntweew",
        "picList": [
          {
            "moduleId": 2,
            "referencedId": 4,
            "picSrc": "http://www.confucius.mobi/images/challenge/challenge-20170113142735-8fn5yadq5-48.png"
          }
        ],
        "submitId": 48,
        "moduleId": 2,
        "headImg": null,
        "upName": null,
        "upTime": null,
        "voteCount": null,
        "canVote": null,
        "planId": null
      },
      "code": 200
    });
  }, Math.random() * 3000)
});


router.post("/pc/fragment/challenge/submit/**", (req, res) => {
  setTimeout(() => {
    res.status(200).json({code: 200, msg: {ff: "ok"}})
  }, Math.random() * 1500)
});

router.get("/pc/fragment/challenge/show/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "title": "用分层归类法让你的朋友圈发文更有条理",
        "upName": "薛定谔的猫",
        "upTime": "2017年01月21日",
        "headImg": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
        "content": "hhr gggrgfefefewffeffew",
        "submitId": 43,
        "type": "application",
        "isMine": true,
        "voteCount": 1,
        "voteStatus": 1,
        "planId": 144,
        "workId": 3,
        "picList": ["http://www.confucius.mobi/images/application/application-20170121000607-ktzmpmwjd-43.png"]
      }, "code": 200
    })
  }, Math.random() * 1500)
});
module.exports = router;
