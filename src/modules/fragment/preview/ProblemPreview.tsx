import * as React from 'react';
import { connect } from 'react-redux';
import './ProblemPreview.less';
import {
  learnPreview, loadPreview
} from './async';
import { set } from 'redux/actions';
import { mark } from 'utils/request';


@connect(state => state)
export default class ProblemPreview extends React.Component<any, any> {
  constructor () {
    super()
    this.state = {
      preview: {},
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  async componentWillMount () {
    const { dispatch } = this.props;
    mark({ module: '打点', function: '学习', action: '打开知识点页面' });
    const { id, practicePlanId, complete } = this.props.location.query;

    if (practicePlanId) {
      let res = await loadPreview(practicePlanId);
      this.setState({ preview: res.msg });

      if (complete == 'false') {
        // 完成练习动效
        dispatch(set('completePracticePlanId', practicePlanId))
      }
    }
  }



  complete () {
    const { practicePlanId } = this.props.location.query;
    mark({ module: '打点', function: '课前思考', action: '完成课前思考' });
    this.setState({clickedCompleteBtn : true});
    learnPreview(practicePlanId);
    window.history.back();
  }

  render () {
    const { preview, clickedCompleteBtn } = this.state;
    const {
      description, audio, audioWords, videoUrl, videoPoster, videoWords, fileId,
    } = preview;
    const { location } = this.props;
    const { practicePlanId, planId, complete } = location.query;

    return (
        <div className="preview-container">
          <div className="intro-container">
            <div className="description" dangerouslySetInnerHTML={{ __html: description }}>
            </div>
          </div>
          {
            <div className={`button-footer ${clickedCompleteBtn ? "disable" : ""}`} onClick={()=>this.complete()}>
            标记完成</div>
          }
        </div>
    )
  }
}
