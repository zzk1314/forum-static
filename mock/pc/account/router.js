var Router = require("express").Router;
var router = new Router();


router.get("/account/get", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
          "weixinName": "薛定谔的猫",
          "headimgUrl": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4UicyBgqKRVJttibsFibo0UqPwPDw2IWXae7OFWhODmGp90A1Gy8kCmbxrMdc995HqiaJkWe9HLozbicicr4VyK6lGPmqC1Xbke9cqQ/0",
          "role": "stundent"
      }
    }), Math.random() * 1500)
});

router.post("/file/image/upload/**", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      msg:{picUrl:"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4UicyBgqKRVJttibsFibo0UqPwPDw2IWXae7OFWhODmGp90A1Gy8kCmbxrMdc995HqiaJkWe9HLozbicicr4VyK6lGPmqC1Xbke9cqQ/0",},
      code:200
    })}, Math.random() * 5000)
});

router.get("/rise/customer/pc/plans", (req, res) => {
    setTimeout(() => {
        res.status(200).json({"msg":{"riseId":"afpacdw","runningPlans":[{"name":"如何改变自己","point":60,"problemId":15,"planId":6953,"pic":"https://www.iqycamp.com/images/fragment/problem15_3.png"}],"donePlans":[{"name":"给自己的未来定个发展策略","point":254,"problemId":8,"planId":6911,"pic":"https://www.iqycamp.com/images/fragment/problem8_3.png"},{"name":"如何用故事说服别人","point":1006,"problemId":14,"planId":6919,"pic":"https://www.iqycamp.com/images/fragment/problem14_3.png"},{"name":"如何结识比自己牛的人","point":122,"problemId":19,"planId":6936,"pic":"https://www.iqycamp.com/images/fragment/problem19_1.png"}],"riseMember":true,"memberType":null,"point":2376},"code":200})}, Math.random() * 5000)
});



module.exports = router;
