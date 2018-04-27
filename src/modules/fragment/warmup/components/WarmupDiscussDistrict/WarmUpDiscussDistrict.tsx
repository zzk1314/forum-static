import * as React from 'react';
import './WarmUpDiscussDistrict.less';
import DiscussDistrict from '../../../components/DiscussDistrict/DiscussDistrict';
import PersonalDiscussDistrict from '../../../components/PersonalDiscussDisctrict/PersonalDiscussDistrict';
import { deleteComment } from '../../async';

export default class WarmUpDiscussDistrict extends React.Component {
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
    if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
      this.props = nextProps;
      this.componentWillMount();
    }
  }

  async handleDeleteWarmUpDiscuss (id) {
    let res = await deleteComment(id);
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
      <div className="warmup-discuss-district-component">
        {
          personal.length > 0 && <div className="tips top">我的观点</div>
        }
        {
          personal.map((item, index) => {
            return <PersonalDiscussDistrict key={item.discuss && item.discuss.id ? item.discuss.id : index}
                                            discuss={item.discuss}
                                            comments={item.comments}
                                            deleteFunc={(id) => this.handleDeleteWarmUpDiscuss(id)}/>;
          })
        }
        {
          priorities.length > 0 && <div className="tips bottom">同学观点</div>
        }
        {
          priorities.map((priority, index) => {
            return <DiscussDistrict key={priority.priorityDiscuss && priority.priorityDiscuss.id ? priority.priorityDiscuss.id : index}
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
