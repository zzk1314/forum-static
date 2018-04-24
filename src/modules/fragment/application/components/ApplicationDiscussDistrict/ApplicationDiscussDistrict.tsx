/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：forum-static
 2. 文件功能：应用题评论区组件
 3. 作者： duanxianfeng@iquanwai.com
 4. 备注：
    data 评论区数据
    id applicationId
    planId 计划 id
    showApplicationCache: boolean 是否有未提交内容
    submitCallback: function 应用题提交回调
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react';
import './ApplicationDiscussDistrict.less';
import PersonalDiscussDistrict from '../../../components/PersonalDiscussDisctrict/PersonalDiscussDistrict';
import { vote } from '../../async';
import ApplicationSubmit from '../ApplicationSubmit/ApplicationSubmit';

export default class ApplicationDiscussDistrict extends React.Component {
  constructor () {
    super();
    this.state = {
      showSubmit: false,
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  render () {
    const {
      data,
      id,
      planId,
      showApplicationCache = false,
      submitCallback = () => {
      },
    } = this.props;
    const {
      personal = [],
      priorities = [],
    } = data;
    const {
      editable = false,
    } = this.state;

    return (
      <div className="application-discuss-district-component">
        {personal.length > 0 && <div className="tips top">我的作业</div>}
        {
          personal.length > 0 && !editable && !showApplicationCache ?
            personal.map((item, index) => {
              return <PersonalDiscussDistrict key={index}
                                              discuss={item.discuss}
                                              comments={item.comments}
                                              showRequestComment={true}
                                              showVote={true}
                                              showSwitchEdit={true}
                                              switchFunc={() => this.setState({ editable: true })}
                                              voteFunc={(id) => vote(id)}/>;
            }) :
            <ApplicationSubmit id={id}
                               planId={planId}
                               submitCallback={() => {
                                 submitCallback();
                                 this.setState({
                                   editable: false,
                                 });
                               }}/>
        }
        {priorities.length > 0 && <div className="tips bottom">同学作业</div>}
        {
          priorities.map((item, index) => {
            return <PersonalDiscussDistrict key={personal.length + index}
                                            discuss={item.priorityDiscuss}
                                            comments={item.multiComments}
                                            showVote={true}
                                            voteFunc={(id) => vote(id)}/>;
          })
        }
      </div>
    );
  }

}
