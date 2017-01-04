var Router = require("express").Router;

var router = new Router();

router.post("/b/log", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"msg": {
				"mobileNo": "13712345678",
				"email": "aaa@mail.com",
				"industry": "IT",
				"function": "软件开发",
				"workingLife": "10"
			},
			"code": 200
		}), Math.random() * 1500)
});

router.get("/wx/js/signature", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				appId: '', // 必填，公众号的唯一标识
				timestamp: '', // 必填，生成签名的时间戳
				nonceStr: '', // 必填，生成签名的随机串
				signature: '',// 必填，签名，见附录1
			}
		}), Math.random() * 1500)
});

module.exports = router;
