import * as React from 'react'
import './QYVideo.less'
import { mark } from '../utils/request'

export default class QYVideo extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {}
  }

  handleClickShowWords(showWords) {
    const { beforeShowWords, cantShowWords } = this.props
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
    const { videoUrl, videoPoster, videoWords } = this.props
    const { showWords } = this.state
    return (
      <div>
        <video  src={videoUrl} poster={videoPoster} controls="controls" width="100%">您的设备不支持Video标签
        </video>
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
      </div>
    )
  }
}


