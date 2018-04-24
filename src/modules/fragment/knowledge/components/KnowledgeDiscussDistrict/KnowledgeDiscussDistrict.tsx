/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：forum-static
 2. 文件功能：知识点评论区模块
 3. 作者： duanxianfeng@iquanwai.com
 4. 备注：
  data: 评论内容
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react';
import './KnowledgeDiscussDistrict.less';
import PersonalDiscussDistrict from '../../../components/PersonalDiscussDisctrict/PersonalDiscussDistrict';
import DiscussDistrict from '../../../components/DiscussDistrict/DiscussDistrict';
import { deleteKnowledgeDiscuss } from '../../async';

export default class KnowledgeDiscussDistrict extends React.Component {

  constructor () {
    super();
    this.state = {};
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  componentWillMount () {
    const {
      data = {},
    } = this.props;
    const {
      personal = [],
      priorities = [],
    } = data;
    this.setState({
      personal: personal,
      priorities: priorities,
    });
  }

  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.props = nextProps;
      this.componentWillMount();
    }
  }

  async handleDeleteKnowledgeDiscuss (id) {
    let res = await deleteKnowledgeDiscuss(id);
    if (res.code === 200) {
      this.setState({
        personal: this.state.personal.filter(pair => pair.discuss.id !== id),
      });
    }
  }

  render () {
    const {
      data = {},
      clickFunc = () => {
      },
    } = this.props;
    const {
      personal = [],
      priorities = [],
    } = this.state;

    return (
      <div className="knowledge-discuss-district-component">
        {
          personal.length > 0 && <div className="tips top">我的观点</div>
        }
        {
          personal.map((item, index) => {
            return <PersonalDiscussDistrict key={item.discuss.id}
                                            discuss={item.discuss}
                                            comments={item.comments}
                                            deleteFunc={(id) => this.handleDeleteKnowledgeDiscuss(id)}/>;
          })
        }
        {
          priorities.length > 0 && <div className="tips bottom">同学观点</div>
        }
        {
          priorities.map((priority, index) => {
            return <DiscussDistrict key={index}
                                    originDiscuss={priority.originDiscuss}
                                    priorityDiscuss={priority.priorityDiscuss}/>;
          })
        }
        {
          personal.length === 0 && priorities.length === 0 &&
          <div className="empty-tip">
            <div className="empty-icon"></div>
            <div className="empty-text">优质发言或作业会被精选发布哦</div>
          </div>
        }
      </div>
    );
  }

}
