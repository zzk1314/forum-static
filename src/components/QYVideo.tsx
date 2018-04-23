import * as React from 'react';
import './QYVideo.less';
import { mark } from '../utils/request';
import { randomStr } from '../utils/helpers';

export default class QYVideo extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {};
    this.player = null; //腾讯视频player
    this.playerId = randomStr(12); //player id
  }

  componentDidMount() {
    const { fileId, videoPoster } = this.props;
    if(fileId) {
      // 初始化腾讯播放器
      this.player = new TCPlayer(this.playerId, { // player-container-id 为播放器容器ID，必须与html中一致
        fileID: fileId, // 请传入需要播放的视频fileID 必须
        appID: '1256115011', // 请传入点播账号的appID 必须
        playsinline: true, // 行内播放模式
        plugins:{
          ContinuePlay: { // 开启续播功能
            // auto: true, //[可选] 是否在视频播放后自动续播
            // text:'上次播放至 ', //[可选] 提示文案
            // btnText: '恢复播放' //[可选] 按钮文案
          },
        }
      });
    }
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   点击展开或者折叠文字稿
   -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  handleClickShowWords(showWords) {
    const { beforeShowWords, cantShowWords } = this.props;
    if(!showWords) {
      // 原来是关闭的，现在展开
      if(beforeShowWords) {
        beforeShowWords().then(res => {
          if(res.code === 200) {
            if(res.msg !== 'ok') {
              if(cantShowWords) {
                cantShowWords(res.msg)
              }
            } else {
              this.setState({ showWords: !showWords })
            }
          }
        })
      } else {
        this.setState({ showWords: !showWords })
      }
      mark({ module: '打点', function: '视频', action: '查看视频文稿', memo: this.props.url })
    } else {
      this.setState({ showWords: !showWords })
    }
  }

  render() {
    const { videoUrl, videoPoster, videoWords, fileId } = this.props;
    const { showWords } = this.state;
    return (
      <div className="video-container">
        { fileId ?
          <video id={this.playerId} poster={videoPoster} className="video">
          </video>
          :
          <video ref="video" src={videoUrl} poster={videoPoster} controls="controls" width="100%"
                 playsinline webkit-playinline x5-playinline></video>
        }
        { videoWords &&
        <div className={`video-words-container ${showWords ? 'show-all' : 'hide'}`}>
          <div className={`video-words`} dangerouslySetInnerHTML={{ __html: videoWords }}/>
          <div className={`words-text-mask`}>
            <div className={`words-mask-tips`} onClick={() => this.handleClickShowWords(showWords)}>
            <span className={`awb-tips ${showWords ? 'hide' : 'show'}`}>
              {showWords ? '收起' : '查看视频文稿'}
            </span>
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}


