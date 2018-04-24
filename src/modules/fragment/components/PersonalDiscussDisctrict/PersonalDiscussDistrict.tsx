/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：forum-static
 2. 文件功能：个人评论区内容组件
 3. 作者：duanxianfeng@iquanwai.com
 4. 备注：
  deleteFunc:function 评论删除方法
  showVote:boolean 是否展示点赞
  showRequestComment:boolean 是否显示求点评
  showSwitchEdit:boolean 是否展示切换编辑按钮
  switchFunc: function 切换外部编辑方法
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react';
import './PersonalDiscussDistrict.less';
import AssetImg from '../../../../components/AssetImg';
import { formatDate, getRealLength, removeHtmlTags } from '../../../../utils/helpers';
import { requestApplicationComment } from '../async';
import AlertMessage from '../../../../components/AlertMessage';

export default class PersonalDiscussDistrict extends React.Component {
  constructor () {
    super();
    this.state = {
      confirmParams: {},
      showConfirm: false,
      confirmContent: '',
    };
  }

  componentWillMount () {
    let {
      discuss = {},
      comments = [],
    } = this.props;
    comments.map(comment => comment.showCommentAll = false);
    this.setState({
      discuss: discuss,
      comments: comments,
    });
  }

  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.props = nextProps;
      this.componentWillMount();
    }
  }

  handleClickToggleDiscussShow () {
    this.setState({
      showDiscussAll: !this.state.showDiscussAll,
    });
  }

  handleClickToggleCommentsShow (index) {
    let targetCommenst = JSON.parse(JSON.stringify(this.state.comments));
    targetCommenst.map((comment, seq) => {
      if (seq === index) {
        comment.showCommentAll = !comment.showCommentAll;
      }
    });
    this.setState({
      comments: targetCommenst,
    });
  }

  handleClickDeleteComment (id) {
    const { deleteFunc, } = this.props;
    this.setState({
      confirmParams: {
        buttons: [
          { label: '取消', onClick: () => this.setState({ showConfirm: false }) },
          {
            label: '确认',
            onClick: () => {
              this.setState({
                showConfirm: false,
              });
              deleteFunc(id);
            },
          },
        ],
      },
      showConfirm: true,
      confirmContent: '确认删除此评论？',
    });
  }

  async handleRequestApplicationComment (id) {
    let res = await requestApplicationComment(id);
    if (res.code === 200) {
      this.setState({
        confirmParams: {
          buttons: [
            { label: '我知道了', onClick: () => this.setState({ showConfirm: false }) },
          ],
        },
        showConfirm: true,
        confirmContent: '求点评成功',
      });
    } else {
      this.setState({
        confirmParams: {
          buttons: [
            { label: '我知道了', onClick: () => this.setState({ showConfirm: false }) },
          ],
        },
        showConfirm: true,
        confirmContent: '本课程求点评次数已用完',
      });
    }
  }

  async handleClickVote (discuss) {
    const { id, selfVoted } = discuss;
    if (selfVoted) {
      return;
    }
    const {
      voteFunc = () => {
      },
    } = this.props;
    let targetDiscuss = JSON.parse(JSON.stringify(this.state.discuss));
    targetDiscuss.selfVoted = true;
    targetDiscuss.voteCount = targetDiscuss.voteCount + 1;
    this.setState({
      discuss: targetDiscuss,
    });
    voteFunc(id);
  }

  render () {
    const {
      discuss = {
        id: 0,
        avatar: '',
        addTime: '',
        content: '',
        nickname: '',
        publishTime: '',
      },
      comments = [],
      showDiscussAll = false,
      confirmParams = {},
      showConfirm = false,
      confirmContent = '',
    } = this.state;
    const {
      deleteFunc,
      showVote = false,
      showRequestComment = false,
      showSwitchEdit = false,
      switchFunc = () => {
      },
    } = this.props;

    return (
      <div className="personal-discuss-district-component">
        <div className="personal-block">
          <AssetImg url={discuss.avatar}
                    className="headimg"/>
          <div className="right-block">
            <div className="person-detail">
              <div className="nickname">{discuss.nickname}</div>
              {
                discuss.isAsst &&
                <AssetImg className="person-title"
                          url="https://static.iqycamp.com/asst-gh4skljm.png"></AssetImg>
              }
              {
                showSwitchEdit &&
                <div className="switch-edit"
                     style={{ color: '#56cec0' }}
                     onClick={() => switchFunc()}>
                  <AssetImg className="icon"
                            url="https://static.iqycamp.com/request_comment-1wsx0d4q.png"/>
                  <span className="edit-span">编辑</span>
                </div>
              }
              {
                showRequestComment &&
                <div className="request-comment"
                     style={{ color: '#56cec0' }}
                     onClick={() => this.handleRequestApplicationComment(discuss.id)}>
                  <AssetImg className="icon"
                            url="https://static.iqycamp.com/request_comment-1wsx0d4q.png"/>
                  <span className="request-span">求点评</span>
                </div>
              }
              {
                showVote &&
                <div className="vote-data"
                     onClick={() => this.handleClickVote(discuss)}>
                  <AssetImg className="icon"
                            url={discuss.selfVoted ? 'https://static.iqycamp.com/voted-nm7ga1oc.png' : 'https://static.iqycamp.com/vote-9467wr3b.png'}/>
                  <span className="vote-count">&nbsp;&nbsp;{discuss.voteCount}</span>
                </div>
              }
            </div>
            <div className={`comment ${showDiscussAll ? '' : 'hidden'}`}>
              <div dangerouslySetInnerHTML={{ __html: showDiscussAll ? discuss.content : removeHtmlTags(discuss.content), }}></div>
            </div>
            {
              (discuss.content && (getRealLength(removeHtmlTags(discuss.content)) > 90 || discuss.content.indexOf('<p') > -1 || discuss.content.indexOf('<img') > -1)) &&
              <div className="show-tips"
                   onClick={() => this.handleClickToggleDiscussShow()}>
                {showDiscussAll ? '收起' : '展开'}
              </div>
            }
            <div className="bottom-data">
              <div className="publish">{formatDate(new Date(discuss.publishTime), 'yyyy-MM-dd hh:mm')}</div>
              {
                deleteFunc &&
                <div className="delete"
                     onClick={() => this.handleClickDeleteComment(discuss.id)}>删除</div>
              }
            </div>
          </div>
        </div>
        {
          comments.map((item, index) => {
            return (
              <div key={index}
                   className="personal-block comment-block">
                <AssetImg url={item.avatar}
                          className="headimg"/>
                <div className="right-block">
                  <div className="person-detail">
                    <div className="nickname">{item.nickname}</div>
                    {
                      item.isAsst &&
                      <AssetImg className="person-title"
                                url="https://static.iqycamp.com/asst-gh4skljm.png"></AssetImg>
                    }
                  </div>
                  <pre className={`comment ${item.showCommentAll ? '' : 'hidden'}`}>{item.showCommentAll ? item.content : removeHtmlTags(item.content)}</pre>
                  {
                    getRealLength(removeHtmlTags(item.content)) > 75 &&
                    <div className="show-tips"
                         onClick={() => this.handleClickToggleCommentsShow(index)}>
                      {item.showCommentAll ? '收起' : '展开'}
                    </div>
                  }
                  <div className="bottom-data">
                    <div className="publish">{formatDate(new Date(item.publishTime), 'yyyy-MM-dd hh:mm')}</div>
                  </div>
                </div>
              </div>
            );
          })
        }

        <AlertMessage open={showConfirm}
                      content={confirmContent}
                      actions={confirmParams.buttons}/>
      </div>
    );
  }

}
