import { pget } from "utils/request"
import * as _ from "lodash"

export function config(apiList) {
	pget(`/rise/wx/js/signature?url=${encodeURIComponent(window.location.href)}`).then(res => {
		if (res.code === 200) {
			wx.config(_.merge({
				debug: false,
				jsApiList: ['hideOptionMenu'].concat(apiList),
			}, res.msg))
			wx.ready(() => {
				hideOptionMenu()
			})
			wx.error(function (e) {
				console.log(e)
			})
		} else {
		}
	}).catch((err) => {
	})
}


export function preview(current, picList) {
	wx.previewImage({
		current: current, // 当前显示图片的http链接
		urls: picList // 需要预览的图片http链接列表
	});
}

export function closeWindow(current, picList) {
	wx.closeWindow();
}

export function hideOptionMenu(current, picList) {
	wx.hideOptionMenu();
}

export function pay(config, success) {
	wx.chooseWXPay({
		timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		nonceStr: '', // 支付签名随机串，不长于 32 位
		package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
		signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
		paySign: '', // 支付签名
		success: success
	})
}
