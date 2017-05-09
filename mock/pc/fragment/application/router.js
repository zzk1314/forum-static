var Router = require("express").Router;
var router = new Router();

router.get("/pc/fragment/application/title/*",(req,res)=>{
  setTimeout(() => {
    res.status(200).json({
      "msg":"tet",
      "code":200
    })
  },Math.random()*1500);
})


router.get("/pc/fragment/application/list/mine/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "title": "即兴演讲",
        "upName": "薛定谔的猫",
        "upTime": "2017年01月15日",
        "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
        "content": "fewfwefnn\n\n\nergreg rgreg\n继英彦章",
        "voteCount": 0,
        "submitId": 2,
        "role":3,
        "type": 11,
        "isMine":true,
        "requestCommentCount":1,
        "request":false,
      }, "code": 200
    })
  }, Math.random() * 1500);
});


router.get("/pc/fragment/application/list/other/*",(req,res)=>{
  setTimeout(()=>{
    res.status(200).json({
      "msg": [
        {
          "title": null,
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


router.get("/pc/fragment/application/show/*",(req,res)=>{
  setTimeout(()=>{
    res.status(200).json({
      "msg": {
        "title": "反向提问，思考美国留学低龄化",
        "upName": "HolyHolly",
        "upTime": "2017年01月20日",
        "headImg": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7PUFkia02HFNasGiaXhvPiaJrljjzkOMpibWkCdJCCPu7CGeauTdF1DJ7Q4Z4SBR7XCq0bkjibEib6HmmQ/0",
        "content": "1231112",
        "submitId": 33,
        "type": "application",
        "isMine": true,
        "requestCommentCount":2,
        "request":false,
        "voteCount": 0,
        "voteStatus": 0,
        "planId": null,
        "workId": null,
        "picList": [],
        "commentList": [
          {
            "id": 3,
            "content": `
            与人沟通时条理更清晰
            跟老板/家人提要求时更有说服力
            面对前所未有的新问题时撬开脑洞
            临场发言也能掷地有声
            与人撕逼时找到对方漏洞
            返回列表
            反向提问，思考美国留学低龄化`,
            "upName": "薛定谔的猫",
            "upTime": "2017年01月20日",
            "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0"
          },{
            "id": 3,
            "content": `
            与人沟通时条理更清晰
            跟老板/家人提要求时更有说服力
            面对前所未有的新问题时撬开脑洞
            临场发言也能掷地有声
            与人撕逼时找到对方漏洞
            返回列表
            反向提问，思考美国留学低龄化`,
            "upName": "薛定谔的猫",
            "upTime": "2017年01月20日",
            "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0"
          }
        ]
      },
      "code": 200
    })
  }, Math.random() * 1500);
})

router.get("/pc/fragment/application/load/*",(req,res)=>{
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": {
                "id": 1,
                "description": "balbal",
                "pic": "http://www.iquanwai.com/images/cintro1.png",
                "knowledgeId": 1,
                "sceneId": 1,
                "difficulty": null,
                "content": null, //提交内容
                "submitId": 1, //提交id
                "submitUpdateTime": "2017-02-15" ,//最后提交时间
                "voteCount": 0,
                "commentCount": 0,
                "voteStatus": 0
            }
        }), Math.random() * 1500)
})



module.exports = router;
