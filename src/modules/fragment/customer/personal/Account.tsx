import * as React from "react";
import { connect } from "react-redux";
import { alertMsg, startLoad, endLoad } from "redux/actions";
import { mark } from "../../../../utils/request";
import { loadAccount, loadMember, sendValidCode, validPhone } from "../async";
import "./Account.less";
import { TextField, Snackbar } from "material-ui"

interface AccountStates {
  // 显示手机号码更改编辑区
  showMobileEdit: boolean;
  // 个人相关信息
  data: object;
  // 是否是 RISE 会员
  riseMember: boolean;
  // 会员类型
  memberType: string;
  // 一分钟计时
  timeCount: number;
  // 是否处于等待时间
  isWaiting: boolean;
  // 用于显示的手机号
  displayPhoneNo: number;
  // 展示弹窗 toast
  showSnackBar: boolean;
}
@connect(state => state)
export default class Account extends React.Component<any, AccountStates> {

  constructor() {
    super()
    this.state = {
      showMobileEdit: false,
      data: {},
      riseMember: false,
      memberType: '',
      timeCount: 60,
      isWaiting: false,
      showSnackBar: false
    }
    this.timeCountTimer = null
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: "打点", function: "个人中心", action: "打开我的账户页面" });
    const { dispatch } = this.props
    dispatch(startLoad())
    loadAccount().then(res => {
      if(res.code === 200) {
        this.setState({ data: res.msg, displayPhoneNo: res.msg.mobile })
      }
    }).catch(e => {
      dispatch(alertMsg(e))
    })
    loadMember().then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        if(msg) {
          this.setState({ riseMember: true, memberType: msg })
        } else {
          this.setState({ riseMember: false })
        }
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  memberDescription(memberType) {
    return (
      <div>
        <p className="q">基于个体势能模型的课程体系</p>
        <p>圈圈用9年时间，经历6个行业50家公司400多个岗位的人才发展体系的设计和深入研究，搭建出完善的个体势能模型，用顶级公司培养人才的方式，培养你自己。</p><br/>
        <p className="q">支撑碎片时间学习的移动工具</p>
        <p>在圈外小课，每个知识点都拆成5分钟可以学习的结构，而串联起来又是极其系统的课程内容。 不管你用手机、iPad还是电脑，通勤的路上还是下班回家，都可以利用时间，学习起来。</p><br/>
        <p className="q">全年50+节课&amp;100+场学习活动</p>
        <p>
          一个在职场中具备竞争力的人，不同阶段所需的能力，可以用个体势能模型来总结，圈外的小课就是根据此设计（过去一个月我们更新了7节，所以可能超过50节）<br/>
          除了学习，我们还有各领域大咖直播（大咖选择标准：不看流量看干货，目前我们请到的大咖都是那些只在重要场合露脸，平时极少愿意对外宣传的行业牛人）、好评率超过99.9999%的案例吊打、帮助你累积职场资源的线下学习工作坊、游戏化学习的地域PK.......
        </p><br/>
        <p className="q">输入+输出+讨论的刻意练习环境</p>
        <p>
          能力的学习，跟我们去学习某个知识（比如牛奶是白色的）不同，不会只是信息理解和记忆。因为从我们知道一个方法，到真正理解它跟其它知识的联系，再到能够用它来解决问题，最终内化为自己的能力，中间需要一系列的刻意练习。<br/>
          圈外小课都分了章节，而每小节都由知识点、选择题、应用题组成。<br/>
          其中，知识点是本节内容的讲解，选择题是通过一些选择题，将内容融入到生活工作场景中，巩固我们对内容的理解。<br/>
          而应用题，则是真正将所学内容用于实际问题的解决。比如，让你用学到的讲故事方法，设计一段表白词，等等。
        </p><br/>
        <p className="q">连接高质量职场资源的校友会</p>
        <p>
          在持续成长中，每个人都离不开这三类人，自己、伙伴和导师。一个人的思考也是有限的，你需要有相同意愿、智商相近的人，与你同行。在你做的好时，给你赞扬，做得不好时，给你建议和鼓励。<br/>
          在圈外学员中，不乏各类大厂、世界500强等企业的童鞋。所以我们在线上设立了各个地区的校友会，并且定期举办各种学习活动，组织大家一起升级打怪，在学习中找到良师益友。
        </p><br/>
        <p className="q">优秀学员的助教&amp;奖学金计划</p>
        <p>
          1、圈外助教，预计每季度从优秀学员中选拔一次。这意味着什么呢？<br/>
          &nbsp;1）免费学习圈外所有课程 <br/>
          &nbsp;2）圈圈多年职场经验，倾囊相授 <br/>
          &nbsp;3）全年持续全面的不定期培训，圈外有完备的助教培养体系，帮助大家加速职场发展。<br/>
          &nbsp;4）跟一帮能力超强的小伙伴一起玩耍<br/>
          2、奖学金计划，认真学习的童鞋，我们会根据学习积分情况返回一部分学费。<br/>
          3、跟圈圈一对一交流，如你所知，对外咨询费3000+，视童鞋们的学习情况而定，每季度至少一个名额。<br/>
          4、工作机会推荐 ，包括圈外工作机会。
        </p><br/>
        {
          memberType === 3 ?
            <div>
              <p className="q">精英学员优先得到作业点评和案例分析</p>
              <p>职场中并不是每个人都那么幸运，有mentor天天来指导自己，给自己反馈。<br/>
                【圈外同学】的学习模式是我们提供体系化课程，你负责输出，我们负责反馈，帮助你提升思维能力和方法。<br/>
                &nbsp;1）圈外专业教练点评小课。（前几天圈圈还亲自跑去大家的作业下点评呢，总之会时常有一些小惊喜喔）<br/>
                &nbsp;2）作业案例直播：针对各个课程，以学员作业为案例，进行语音直播讲解和答疑，帮助理解，俗称“吊打”。在【圈外同学】首批吊打中，参加人数超过了2000人，当天大家讨论到晚上10点半才结束。
              </p><br/>
              <p className="q">精英学员可以免费参加线下活动，结识伙伴&amp;导师</p>
              <p>线下我们会定期举办学习工作坊，很多童鞋还通过线下工作坊勾搭到行业人士，解决了自己的职业困惑。除此之外，各个分舵也会不定期举办一些线下活动，很多童鞋在这里找到了志同道合的朋友。</p><br/>
            </div> :
            <div>
              <p className="q">专业版用户可参加作业案例分析</p>
              <p>
                职场中并不是每个人都那么幸运，有mentor天天来指导自己，给自己反馈。<br/>
                【圈外同学】的学习模式是我们提供体系化课程，你负责输出，我们负责反馈，帮助你提升思维能力和方法。<br/>
                针对各个课程，我们会以学员作业为案例，进行语音直播讲解和答疑，帮助理解，俗称“吊打”。在【圈外同学】首批吊打中，参加人数超过了2000人，当天大家讨论到晚上10点半才结束。
              </p><br/>
              <p className="q">专业版用户可优惠参加线下活动</p>
              <p>
                线下我们会定期举办学习工作坊，很多童鞋还通过线下工作坊勾搭到行业人士，解决了自己的职业困惑。<br/>
                除此之外，各个分舵也会不定期举办一些线下活动，很多童鞋在这里找到了志同道合的朋友。<br/>
                专业版会员，可以以覆盖场地、物料等基本成本的价格，优惠参加线下学习活动。
              </p><br/>
            </div>
        }
      </div>
    )
  }

  renderMemberTips() {
    const { memberType, riseMember } = this.state;

    if(riseMember) {
      return (
        <div className="point-tip-container">
          <b>当前会员：{memberType.name}</b><br/>
          微信昵称：{window.ENV.userName}<br/>
          有效期至：{memberType.endTime}<br/><br/>
          会员专享：<br/>
          {this.memberDescription(memberType.memberTypeId)}
        </div>
      )
    } else {
      return null;
    }
  }

  handleClickSendVerifyCode() {
    const areacode = document.getElementById("areacode").value.slice(1)
    const phone = document.getElementById("phone").value
    const { dispatch } = this.props
    dispatch(startLoad())
    sendValidCode(phone, areacode).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.timeCountTimer = setInterval(() => {
          this.setState({ timeCount: this.state.timeCount - 1 })
          if(this.state.timeCount <= 1) {
            clearInterval(this.timeCountTimer)
            this.setState({ isWaiting: false, timeCount: 60 })
          }
        }, 1000)
        this.setState({ isWaiting: true })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  handleClickOnSubmit() {
    const code = document.getElementById("code").value
    const phone = document.getElementById("phone").value
    const { dispatch } = this.props
    dispatch(startLoad())
    validPhone(code).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ displayPhoneNo: phone, showMobileEdit: false, showSnackBar: true }, () => {
          setTimeout(() => {
            this.setState({ showSnackBar: false })
          }, 1000)
        })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  render() {

    const { showMobileEdit, timeCount, isWaiting, displayPhoneNo, showSnackBar } = this.state
    const { mobile, riseId, memberType } = this.state.data

    const renderPhoneNoBindArea = () => {
      return (
        <div className="phoneno-edit">
          <div>
            <div className="profile-item">
              <div className="item-name-area">国家/地区</div>
              <TextField id="areacode" className="item-edit-area" hintText="国际区号" defaultValue="+86"/>
            </div>
          </div>
          <div>
            <div className="profile-item">
              <div className="item-name-phone">手机号</div>
              <TextField id="phone" className="item-edit" hintText="请输入手机号"/>
            </div>
          </div>
          <div>
            <div className="profile-item">
              <div className="item-name-verify">验证码</div>
              <TextField id="code" className="item-edit" hintText="请输入验证码"/>
              {
                isWaiting ?
                  <div className="verify-code-btn disable">{timeCount}S之后重新发送</div> :
                  <div className="verify-code-btn" onClick={() => this.handleClickSendVerifyCode()}>发送验证码</div>
              }
            </div>
          </div>
          <div className="phoneno-submit" onClick={() => this.handleClickOnSubmit()}>提交</div>
        </div>
      )
    }

    const renderAccountDesc = () => {
      return (
        <div className="account">
          <div className="item">
            <div className="label">手机号：{displayPhoneNo ? displayPhoneNo : `未绑定`}</div>
            <div className="mobile-change-btn"
                 onClick={() => this.setState({ showMobileEdit: true })}>{mobile ? `修改手机号` : `手机号`}</div>
          </div>
          <div className="item">
            <div className="label">圈外 ID：{riseId}</div>
          </div>
          <div className="item">
            <div className="label">圈外会员：{memberType}</div>
          </div>
          {this.renderMemberTips()}
          <div className="padding-footer"/>
        </div>
      )
    }

    const renderOtherComponents = () => {
      return (
        <Snackbar
          open={showSnackBar}
          message="绑定手机号成功"
          autoHideDuration={1000}
        />
      )
    }

    return (
      <div className="account-container">
        <div className="account-page">
          {
            showMobileEdit ?
              renderPhoneNoBindArea() :
              renderAccountDesc()
          }
        </div>
        {renderOtherComponents()}
      </div>
    )
  }

}
