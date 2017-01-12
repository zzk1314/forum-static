var Router = require("express").Router;
var router = new Router();

router.get("/test", (req, res) => {
  res.setState(200).json({"msg": "test"})
});

router.get("/pc/fragment/c/list/mine/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      code: 200,
      msg: [{
        canVote: true,
        content: "测试 \n testtest\n能看到我么\n还有图片",
        description: "描述描述描述",
        headImg: "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
        id: 3,
        moduleId: null,
        pcurl: "http://tinyurl.com/h4amdar",
        pic: null,
        picList: null,
        planId: 46,
        problemId: 3,
        submitId: 23,
        submitUrl: "/fragment/c?id=usej06",
        submitted: true,
        upName: "薛定谔的猫",
        upTime: "2017年01月04日",
        voteCount: 1,
      }]
    })
  }, Math.random() * 1500);
});

router.get("/pc/fragment/c/list/other/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": [{
        "id": null,
        "description": null,
        "pic": null,
        "problemId": null,
        "pcurl": null,
        "submitted": null,
        "content": "fqrgrg",
        "picList": null,
        "submitId": 25,
        "moduleId": null,
        "submitUrl": null,
        "headImg": "http://wx.qlogo.cn/mmopen/DRC1udVVibvVx3HW1ha4UP24Grs1Pfwu2Rm7mYEOofNQKibosic8O0A1DMMkpAHH2cxagMO5moGgeMDTxk6cU4h7mYwtMzFJ5Xm/0",
        "upName": "圈外助手",
        "upTime": "2017年01月04日",
        "voteCount": 1,
        "canVote": false,
        "planId": null
      }, {
        "id": null,
        "description": null,
        "pic": null,
        "problemId": null,
        "pcurl": null,
        "submitted": null,
        "content": "fqrgrg",
        "picList": null,
        "submitId": 25,
        "moduleId": null,
        "submitUrl": null,
        "headImg": "http://wx.qlogo.cn/mmopen/DRC1udVVibvVx3HW1ha4UP24Grs1Pfwu2Rm7mYEOofNQKibosic8O0A1DMMkpAHH2cxagMO5moGgeMDTxk6cU4h7mYwtMzFJ5Xm/0",
        "upName": "圈外助手",
        "upTime": "2017年01月04日",
        "voteCount": 1,
        "canVote": false,
        "planId": null
      }], "code": 200
    })
  }, Math.random() * 1500);
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


router.get("/pc/fragment/c/mine/**", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "id": 3,
        "description": "描述描述描述",
        "pic": null,
        "problemId": 3,
        "pcurl": null,
        "submitted": true,
        "content": "测试\ntesttest\n能看到我么\n还有图片\n\nceshi 测试作业提交效果\ntest",
        "picList": [{
          "moduleId": 2,
          "referencedId": 3,
          "picSrc": "http://www.confucius.mobi/images/challenge/challenge-20170110191544-j2x2j8tpo-43.png"
        }, {
          "moduleId": 2,
          "referencedId": 3,
          "picSrc": "http://www.confucius.mobi/images/challenge/challenge-20170111060101-pxc4whoai-43.png",
        },{
          "moduleId": 2,
          "referencedId": 3,
          "picSrc": "http://www.confucius.mobi/images/challenge/challenge-20170111060101-pxc4whoai-43.png",
        }],
        "submitId": 23,
        "moduleId": 2,
        "submitUrl": null,
        "headImg": null,
        "upName": null,
        "upTime": null,
        "voteCount": null,
        "canVote": null,
        "planId": null
      }, "code": 200
    });
  }, Math.random() * 3000)
});

router.post("/pc/fragment/c/submit/**", (req, res) => {
  setTimeout(() => {
    res.status(200).json({code: 200, msg: "ok"})
  }, Math.random() * 1500)
});

router.get("/b/log", (req, res) => {
  setTimeout(() => {
    res.status(200).json({code: 200, msg: "ok"});
  }, Math.random() * 1500)
});

router.get("/pc/fragment/c/show/**", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "title": "面对前所未有的新问题时撬开脑洞",
        "upName": "mao",
        "upTime": "2017年01月06日",
        "headImg": null,
        "content": "测试\ntesttest\n能看到我么\n还有图片\n\nceshi 测试作业提交效果\ntest",
        "submitId": 23,
        "type": "challenge",
        "isMine": true,
        "problemId": 3,
        "voteCount": 3,
        "voteStatus": 1,
        "planId": 46,
        "challengeId": 3,
        "picList": [{
          "moduleId": 2,
          "referencedId": 23,
          "picSrc": "http://www.confucius.mobi/images/challenge/challenge-20170104150312-8r2wqjuov-23.png"
        }, {
          "moduleId": 2,
          "referencedId": 23,
          "picSrc": "http://www.confucius.mobi/images/challenge/challenge-20170105094542-269i6z7vw-23.png"
        }]
      }, "code": 200
    })
  }, Math.random() * 1500)
})

module.exports = router
