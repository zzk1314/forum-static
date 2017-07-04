import * as React from "react"
import {connect} from "react-redux"
import "./Discuss.less"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {replyDiscuss} from "./async"
import VerticalBarLoading from "../../../components/VerticalBarLoading"

@connect(state => state)
export default class Discuss extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      submitLoading:false,
      alert: {
        actions: null,
        modal: true
      },
      content:"",
      showAlertModal: false,
      snackOpen: false,
      snackMessage: "提交中，请稍后",
    }
  }

  componentWillUnmount(){
    window.onbeforeunload = null;
  }

  componentWillMount() {
    window.onbeforeunload = (e)=>{ return "你还有未提交的内容，离开页面会丢失"; }
  }

  onSubmit() {
    const {location,dispatch} = this.props;
    // 根据 cid和planid加载
    const {repliedId, warmupPracticeId} = location.query;
    const {content} = this.state
    if (_.isEmpty(content)) {
      this.showAlert("作业还没写完哦","提示");
      return;
    }
    const param = {comment:content, repliedId, warmupPracticeId}
    replyDiscuss(param)
      .then(res => {
      if (res.code === 200) {
        this.showAlert(`提交成功`);
        setTimeout(() => {
          this.context.router.push({
            pathname: this.props.location.pathname,
            query: {
              id: warmupPracticeId
            }
          })
        }, 1000);
      } else {
        this.showAlert(_.toString(res.msg));
      }
    }).catch((err) => {
      this.showAlert(_.toString(err));
    });
  }

  showAlert(content, title) {
    const {dispatch} = this.props;
    dispatch(alertMsg(title,content));
    setTimeout(() => {
      dispatch(set("base.showModal",false));
    }, 1000);
  }

  render() {
    const {location} = this.props;
    const renderDoWorkArea = () => {
      return (
        <div className="doWorkArea">
          <textarea cols={30} rows={10} onChange={(e)=>this.setState({content:e.currentTarget.value})}/>
          <div className="submitBtnGroup">
            <FlatButton style={{borderRadius:"4px",width:"120px",height:"42px",margin:"0 90px"}}
                        backgroundColor="#55cbcb" labelStyle={{color:"#FFF"}} label="提交"
                        onClick={(e)=>this.onSubmit()}/>
          </div>
        </div>
      )
    }

    return (
      <div className="discuss-container">
        {this.state.submitLoading?<VerticalBarLoading/>:renderDoWorkArea()}
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.snackMessage}
          autoHideDuration={2000}
        />
      </div>
    )
  }
}
