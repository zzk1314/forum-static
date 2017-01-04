var Router = require("express").Router;
var router = new Router();

const challengeList = [
  {
    "id": 1,
    "problem": "问题描述",
    "status": 1,

  }
]


router.get("/test", (req, res) => {
  res.setState(200).json({"msg": "test"})
});

router.get("/pc/fragment/c/list/mine/*", (req, res) => {
  res.status(200).json({
    code: 200,
    msg: {
      canVote: true,
      content: "测试↵testtest↵能看到我么↵还有图片",
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
    }
  })
})

router.get("/pc/fragment/c/list/other/*", (req, res) => {
  res.status(200).json({
    code: 200,
    msg: [{
      canVote: true,
      content: "测试↵testtest↵能看到我么↵还有图片",
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
    }, {
      canVote: true,
      content: "测试↵testtest↵能看到我么↵还有图片",
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
    }, {
      canVote: true,
      content: "测试↵testtest↵能看到我么↵还有图片",
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
})

router.get("/pc/fragment/page", (req, res) => {
  res.status(200).json({
    code: 200,
    msg: [{
      challengeLis: null,
      id: 1,
      pay: false,
      pic: "http://www.iquanwai.com/images/fragment/problem1.png",
      problem: "与人沟通时条理更清晰",
      status: null,
    },{
      challengeLis: null,
      id: 1,
      pay: false,
      pic: "http://www.iquanwai.com/images/fragment/problem1.png",
      problem: "与人沟通时条理更清晰",
      status: null,
    },{
      challengeLis: null,
      id: 1,
      pay: false,
      pic: "http://www.iquanwai.com/images/fragment/problem1.png",
      problem: "与人沟通时条理更清晰",
      status: null,
    },{
      challengeLis: null,
      id: 1,
      pay: false,
      pic: "http://www.iquanwai.com/images/fragment/problem1.png",
      problem: "与人沟通时条理更清晰",
      status: null,
    },{
      challengeLis: null,
      id: 1,
      pay: false,
      pic: "http://www.iquanwai.com/images/fragment/problem1.png",
      problem: "与人沟通时条理更清晰",
      status: null,
    }]
  })
});

router.get("/pc/fragment/where",(req,res)=>{
  res.status(200).json({
    code:200,
    msg:{
      pathname:"/fragment/c/list",
      query:{
        cid:3,
        planId:3
      }
    }
  })
})


router.get("/pc/challenge/all", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
        "problemList": [
          {
            "id": 2, //问题id
            "problem": "问题描述", //问题描述
            "challengeList": [{
              "id": 3,
              "description": "图文混排内容", //html
              "pic": "http://someurl",  //图片url
              "problemId": 2, //问题id
              "pcurl": "http://someurl", //pc端url
              "submitted": true, //是否提交过
              "content": "balbal" //提交内容
            }, {
              "id": 4,
              "description": "图文混排内容", //html
              "pic": "http://someurl",  //图片url
              "problemId": 2, //问题id
              "pcurl": "http://someurl", //pc端url
              "submitted": false, //是否提交过
              "content": "balbal" //提交内容
            }]
          }
        ]
      }
    }), Math.random() * 1500)
});
router.get("/pc/challenge/*", (req, res) => {
  let items = req.url.trim("/");
  let id = items[items.length - 1];
  if (id === 1) {
    setTimeout(() =>
      res.status(200).json({
        "code": 200,
        "msg": {
          "id": 1,
          "description": "图文混排内容", //html
          "pic": "http://someurl",  //图片url
          "problemId": 1, //问题id
          "pcurl": "http://someurl", //pc端url
          "submitted": true, //是否提交过
          "content": "balbal" //提交内容
        }
      }), Math.random() * 1500)
  } else {
    setTimeout(() =>
      res.status(200).json({
        "code": "200", "msg": {
          "id": 2,
          "description": "图文混排内容", //html
          "pic": "http://someurl",  //图片url
          "problemId": 1, //问题id
          "pcurl": "http://someurl", //pc端url
          "submitted": false, //是否提交过
          "content": null //提交内容
        }
      }), Math.random() * 1500)
  }
});

module.exports = router;
