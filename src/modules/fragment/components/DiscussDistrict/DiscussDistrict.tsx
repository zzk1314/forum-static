/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：forum-static
 2. 文件功能：他人精华评论区内容组件
 3. 作者：duanxianfeng@iquanwai.com
 4. 备注：
   originDiscuss = {} 原始评论
   priorityDiscuss = {} 精华评论
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react';
import './DiscussDistrict.less';
import AssetImg from '../../../../components/AssetImg';
import { formatDate, getRealLength, removeHtmlTags, splitContent } from '../../../../utils/helpers';

export default class DiscussDistrict extends React.Component {

  constructor () {
    super();
    this.state = {};
  }

  componentWillMount () {
    let {
      originDiscuss = {},
      priorityDiscuss = {},
    } = this.props;
    if (!originDiscuss) {
      originDiscuss = JSON.parse(JSON.stringify(priorityDiscuss));
      priorityDiscuss = null;
    }
    if (originDiscuss) {
      originDiscuss.showAll = false;
    }
    if (priorityDiscuss) {
      priorityDiscuss.showAll = false;
    }
    this.setState({
      originDiscuss: originDiscuss,
      priorityDiscuss: priorityDiscuss,
    });
  }

  handleClickToggleOriginDiscuss () {
    let targetOriginDiscuss = Object.assign({}, this.state.originDiscuss);
    targetOriginDiscuss.showAll = !this.state.originDiscuss.showAll;
    this.setState({
      originDiscuss: targetOriginDiscuss,
    });
  }

  handleClickTogglePriorityDiscuss () {
    let targetPriorityDiscuss = Object.assign({}, this.state.priorityDiscuss);
    targetPriorityDiscuss.showAll = !this.state.priorityDiscuss.showAll;
    this.setState({
      priorityDiscuss: targetPriorityDiscuss,
    });
  }

  render () {
    let {
      originDiscuss = {},
      priorityDiscuss = {},
    } = this.state;

    return (
      <div className="discuss-district-component">
        <div className="origin-block">
          <AssetImg url={originDiscuss.avatar}
                    className="headimg"/>
          <div className="right-block">
            <div className="person-detail">
              <div className="nickname">{originDiscuss.nickname}</div>
              {
                originDiscuss.isAsst &&
                <AssetImg className="person-title"
                          url="https://static.iqycamp.com/asst-gh4skljm.png"></AssetImg>
              }
            </div>
            <pre className={`comment ${originDiscuss.showAll ? '' : 'hidden'}`}>
              {originDiscuss.showAll ? originDiscuss.content : removeHtmlTags(originDiscuss.content)}
            </pre>
            {
              getRealLength(removeHtmlTags(originDiscuss.content)) > 90 &&
              <div className="show-tips"
                   onClick={() => this.handleClickToggleOriginDiscuss()}>
                {originDiscuss.showAll ? '收起' : '展开'}
              </div>
            }
            <div className="publish">{formatDate(new Date(originDiscuss.publishTime), 'yyyy-MM-dd hh:mm')}</div>
          </div>
        </div>
        {
          priorityDiscuss &&
          <div className="origin-block priority-block">
            <AssetImg url={priorityDiscuss.avatar}
                      className="headimg"/>
            <div className="right-block">
              <div className="person-detail">
                <div className="nickname">{priorityDiscuss.nickname}</div>
                {
                  priorityDiscuss.isAsst &&
                  <AssetImg className="person-title"
                            url="https://static.iqycamp.com/asst-gh4skljm.png"></AssetImg>
                }
              </div>
              <pre className={`comment ${priorityDiscuss.showAll ? '' : 'hidden'}`}>
                {priorityDiscuss.showAll ? priorityDiscuss.content : removeHtmlTags(priorityDiscuss.content)}
              </pre>
              {
                getRealLength(removeHtmlTags(priorityDiscuss.content)) > 75 &&
                <div className="show-tips"
                     onClick={() => this.handleClickTogglePriorityDiscuss()}>
                  {priorityDiscuss.showAll ? '收起' : '展开'}
                </div>
              }
              <div className="publish">{formatDate(new Date(priorityDiscuss.publishTime), 'yyyy-MM-dd hh:mm')}</div>
            </div>
          </div>
        }
      </div>
    );
  }

}
