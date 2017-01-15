var Router = require("express").Router;
var router = new Router();


// 获取问题列表
router.get("/pc/fragment/problem/list", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": [{"id": 1, "problem": "与人沟通时条理更清晰"}, {"id": 2, "problem": "跟老板/家人提要求时更有说服力"},
        {"id": 3,"problem": "面对前所未有的新问题时撬开脑洞"}, {"id": 4, "problem": "临场发言也能掷地有声"},
        {"id": 5, "problem": "与人撕逼时找到对方漏洞"}], "code": 200
    })
  }, Math.random() * 1500)
});


router.get("/pc/fragment/problem/current", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "id": 4,
        "status": 1,
        "pay": true,
        "problem": null,
        "pic": null,
        "challengeList": [{
          "id": 4,
          "description": "描述描述描述",
          "pic": null,
          "problemId": 4,
          "submitted": true,
          "content": "egwegrqr",
          "picList": null,
          "submitId": 48,
          "moduleId": null,
          "headImg": null,
          "upName": null,
          "upTime": null,
          "voteCount": null,
          "canVote": null,
          "planId": null
        }]
      }, "code": 200
    });
  }, Math.random() * 1500);
});

router.get("/pc/fragment/problem/curId",(req,res)=>{
  setTimeout(() => {
    res.status(200).json({"msg":4,"code":200})
  }, Math.random() * 1500)
})


module.exports = router;
