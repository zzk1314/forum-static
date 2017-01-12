var Router = require("express").Router;
var router = new Router();


// 获取问题列表
router.get("/pc/fragment/problem/problems", (req, res) => {
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
          "status": null,
          "pay": false,
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
        }], "doingId": 1
      }, "code": 200
    })
  }, Math.random() * 1500)
});


router.get("/pc/fragment/problem/current", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      code:200,
      msg:{
        id:3,
        pay:true,
        status:1,

      }
    })
  }, Math.random() * 1500);
});
