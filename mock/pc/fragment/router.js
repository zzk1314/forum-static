var Router = require("express").Router;
var router = new Router();

router.get("/test", (req, res) => {
  res.setState(200).json({"msg": "test"})
});


router.get("/pc/fragment/page", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "problemList": [{
          "id": 1,
          "status": null,
          "pay": false,
          "problem": "与人沟通时条理更清晰",
          "pic": "http://www.iquanwai.com/images/fragment/problem1.png",
          "challengeLis": null
        }, {
          "id": 2,
          "status": null,
          "pay": false,
          "problem": "跟老板/家人提要求时更有说服力",
          "pic": "http://www.iquanwai.com/images/fragment/problem2.png",
          "challengeLis": null
        }, {
          "id": 3,
          "status": 1,
          "pay": true,
          "problem": "面对前所未有的新问题时撬开脑洞",
          "pic": "http://www.iquanwai.com/images/fragment/problem3_1.png",
          "challengeLis": null
        }, {
          "id": 4,
          "status": null,
          "pay": false,
          "problem": "临场发言也能掷地有声",
          "pic": "http://www.iquanwai.com/images/fragment/problem4_1.png",
          "challengeLis": null
        }, {
          "id": 5,
          "status": null,
          "pay": false,
          "problem": "与人撕逼时找到对方漏洞",
          "pic": "http://www.iquanwai.com/images/fragment/problem5_1.png",
          "challengeLis": null
        }], "doingId": 3
      }, "code": 200
    })
  }, 1);
});

router.get("/pc/fragment/where", (req, res) => {
  setTimeout(() => {
    res.redirect("http://127.0.0.1:4000/fragment/c/list?cid=3");
  }, Math.random() * 1500);
})

router.get("/pc/fragment/problem/where", (req, res) => {
  console.log(req.query);
  const problemId = req.query.problemId;
  setTimeout(() => {
    console.log(problemId)
    if (problemId == 3) {
      res.status(200).json({"msg": {"pathName": "/fragment/c/list", "query": {"cid": 3}}, "code": 200})
    } else {
      res.status(200).json({"msg": {"pathName": "/servercode", "query": null}, "code": 200})
    }
  }, Math.random() * 1500);
});


router.get("/pc/fragment/comment/*/*", (req, res) => {
  console.log(req.query);
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "list": [{
          "id": 27,
          "content": "test",
          "upName": "薛定谔的猫",
          "upTime": "2017年01月22日",
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

router.get("/b/log", (req, res) => {
  setTimeout(() => {
    res.status(200).json({code: 200, msg: "ok"});
  }, Math.random() * 1500)
});

module.exports = router
