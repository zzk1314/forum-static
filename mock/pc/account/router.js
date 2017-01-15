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


module.exports = router;
