var express = require("express")
var bodyParser = require("body-parser")
var path = require("path");

var app = express()

// 参考文档: https://codeforgeek.com/2014/09/handle-get-post-request-express-4/
// 可以解析 request payload, 即 res.body
app.use(bodyParser.json())

app.get("/test", function (req, res) {
	res.status(200).json({
		"msg": "ok"
	})
})

app.use("/assets/", express.static(path.join(__dirname, "../assets")))
app.use("/js/", express.static(path.join(__dirname, "../js")))

// API

app.use(require('./common/router'))
app.use(require('./pc/fragment/router'))
app.use(require('./pc/account/router'))
app.use(require('./pc/fragment/problem/router'))
app.use(require('./pc/fragment/challenge/router'))
app.use(require('./pc/fragment/application/router'))
app.use(require('./pc/fragment/subject/router'))
app.use(require('./pc/backend/router'))
app.use(require('./pc/asst/router'))
app.use(require('./pc/plan/router'))
app.use(require('./pc/practice/router'))
app.use(require('./pc/problem/router'))
module.exports = app
