var Router = require("express").Router;
var router = new Router();

router.get("/pc/asst/application/problem/list", (req, res) => {
    setTimeout(() => {
        res.status(200).json({"msg":[{"name":"沟通人际","problems":[{"id":1,"problem":"与人沟通时条理更清晰","status":null, "underCommentCount":2},{"id":2,"problem":"跟老板/家人提要求时更有说服力","status":null},{"id":5,"problem":"与人撕逼时找到对方逻辑漏洞","status":null}]},{"name":"思维方法","problems":[{"id":3,"problem":"面对前所未有的新问题时撬开脑洞","status":null},{"id":4,"problem":"临场发言也能掷地有声","status":null},{"id":9,"problem":"找到本质问题，减少无效努力","status":null},{"id":10,"problem":"普通人的第一堂营销课","status":null},{"id":11,"problem":"洞察他人行为背后的真相","status":null},{"id":12,"problem":"面对热点事件保持独立思考","status":null}]},{"name":"职业发展","problems":[{"id":6,"problem":"写出令HR过目难忘的简历","status":null},{"id":7,"problem":"在面试中脱颖而出","status":null},{"id":8,"problem":"给自己的未来定个发展策略","status":null}]}],"code":200});
    }, Math.random() * 1500);
});

router.get("/pc/asst/subject/problem/list", (req, res) => {
    setTimeout(() => {
        res.status(200).json({"msg":[{"name":"沟通人际","problems":[{"id":1,"problem":"与人沟通时条理更清晰","status":null, "underCommentCount":1},{"id":2,"problem":"跟老板/家人提要求时更有说服力","status":null},{"id":5,"problem":"与人撕逼时找到对方逻辑漏洞","status":null}]},{"name":"思维方法","problems":[{"id":3,"problem":"面对前所未有的新问题时撬开脑洞","status":null},{"id":4,"problem":"临场发言也能掷地有声","status":null},{"id":9,"problem":"找到本质问题，减少无效努力","status":null},{"id":10,"problem":"普通人的第一堂营销课","status":null},{"id":11,"problem":"洞察他人行为背后的真相","status":null},{"id":12,"problem":"面对热点事件保持独立思考","status":null}]},{"name":"职业发展","problems":[{"id":6,"problem":"写出令HR过目难忘的简历","status":null},{"id":7,"problem":"在面试中脱颖而出","status":null},{"id":8,"problem":"给自己的未来定个发展策略","status":null}]}],"code":200});
    }, Math.random() * 1500);
});

router.get("/pc/asst/application/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json({
            "msg": [
                {
                    "title": "孩子教育",
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11,
                    "priority":1,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11,
                    "priority":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11,
                    "priority":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
            ],
            "code": 200
        })
    }, Math.random() * 1500);
})

router.get("/pc/asst/subject/*", (req, res) => {
    setTimeout(()=>{
        res.status(200).json({
            "msg": [
                {
                    "title": "孩子教育",
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11,
                    "priority":1,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11,
                    "priority":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11,
                    "priority":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
            ],
            "code": 200
        })
    }, Math.random() * 1500);
});

router.get("/pc/asst/comment/count", (req, res) => {
    setTimeout(() => {
        res.status(200).json(
            {
                "msg":
                {"totalComment":13,
                 "todayComment":0
                },
            "code":200});
    }, Math.random() * 1500);
});

router.get("/pc/asst/commented/list", (req, res) => {
    setTimeout(()=>{
        res.status(200).json({
            "msg": [
                {
                    "title": "孩子教育",
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11,
                    "priority":1,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11,
                    "priority":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11,
                    "priority":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？\n  答：中学阶段，孩子相对能独立生活，......",
                    "voteCount": 1,
                    "submitId": 27,
                    "type": 11
                },
            ],
            "code": 200
        })
    }, Math.random() * 1500);
});

module.exports = router;
