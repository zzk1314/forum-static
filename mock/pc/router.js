var Router = require("express").Router;
var router = new Router();

const challengeList = [
  {
    "id":1,
    "problem":"问题描述",
    "status":1,

  }
]



router.get("/test",(req,res)=>{
  res.setState(200).json({"msg":"test"})
});

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
