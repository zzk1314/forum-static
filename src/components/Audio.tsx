import * as React from "react";
import "./Audio.less";
import Slider from "react-rangeslider";
import AssetImg from "./AssetImg";

let timer;
let duration_load_timer;

enum Device {
  IPHONE = 1,
  ANDROID,
  OTHER
}

export default class Audio extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      duration: 0,
      currentSecond: 0,
      cntSecond: 0,
      device: "",
      playing: false,
      pause: false,
      loading: false,
    }
  }

  componentWillMount() {
    if(window.navigator.userAgent.indexOf("Android") > 0) {
      this.setState({device: Device.ANDROID})
    } else if(window.navigator.userAgent.indexOf("iPhone") > 0 || window.navigator.userAgent.indexOf("iPad") > 0) {
      this.setState({device: Device.IPHONE})
    } else {
      this.setState({device: Device.OTHER})
    }
  }

  componentDidMount(){
    const {device} = this.state
    // alert(window.navigator.userAgent)
    if(device == Device.ANDROID){
      try{
        //华为某些机型不支持https的语音
        this.refs.sound.src = this.refs.sound.src.replace('https','http')
        this.refs.sound.load()
      }catch (e){
        alert(e)
      }
    }
  }

  onEnd() {
    this.setState({currentSecond: this.state.duration, playing: false})
    clearInterval(timer)
  }

  start() {
    let self = this
    // 首次点击播放按钮
    this.setState({playing: true})
    // 首次加载
    if(this.state.duration === 0) {
      // 加载音频
      this.setState({loading: true})
      self.refs.sound.load()
      duration_load_timer = setInterval(() => {
        if(self.state.duration) {
          clearInterval(duration_load_timer)
          return
        }
        //【IOS bug解决方法】先播放，再暂停，获取控件duration
        self.refs.sound.play()
        self.refs.sound.pause()
        if(self.refs.sound.duration) {
          self.setState({duration: Math.floor(self.refs.sound.duration), loading: false})
          self.play()
        }
      }, 500)
    } else {
      // 暂停后重新播放
      if(this.state.pause) {
        this.play()
        this.setState({pause: false})
      }
    }
  }

  play() {
    const self = this
    if(timer) {
      clearInterval(timer)
    }
    this.setState({playing: true}, () => {
      self.refs.sound.play()
      timer = setInterval(() => {
        if(this.state.currentSecond < this.state.duration) {
          //设置已播放时长
          self.setState({currentSecond: self.refs.sound.currentTime})
        } else {
          this.setState({playing: false})
          clearInterval(timer)
        }
      }, 100)
    })
  }

  pause() {
    this.setState({playing: false, pause: true})
    clearInterval(timer)
    this.refs.sound.pause()
  }

  //手动更改时间
  onProgressChange(value) {
    //如果没有加载完成，不允许拖动
    if(this.state.duration === 0) {
      return
    }
    clearInterval(timer)
    this.setState({playing: true, currentSecond: value}, () => {
      this.refs.sound.currentTime = value
      this.play()
    })
  }

  //使用原生audio标签
  renderOrigin(url) {
    return (
      <audio ref="sound" src={url} controls="controls"/>
    )
  }

  //使用定制化audio组件
  renderCustomize(url) {
    const {currentSecond, playing, duration, loading} = this.state
    return (
      <div className="audio">
        <div className="audio-container">
          { loading ?
            <div className="audio-btn" onClick={this.pause.bind(this)}>
              <AssetImg url="https://www.iqycamp.com/images/audio_loading.gif" size={20}/>
            </div>
            : playing ?
              <div className="audio-btn" onClick={this.pause.bind(this)}>
                <AssetImg url="https://www.iqycamp.com/images/audio_pause.png" size={20}/>
              </div> :
              <div className="audio-btn" onClick={this.start.bind(this)}>
                <AssetImg url="https://www.iqycamp.com/images/audio_play.png" size={20}/>
              </div>
          }
          <div className="audio-progress">
            <Slider min={0} max={duration} value={currentSecond} onChange={this.onProgressChange.bind(this)}
                    withBars={true}/>
          </div>
          <div className="audio-duration">
            {intToTime(currentSecond)} / {intToTime(duration)}
          </div>
          <audio ref="sound" src={url}
                 onEnded={this.onEnd.bind(this)}
          />
        </div>
      </div>
    )
  }

  render() {
    const {url} = this.props
    return (
      this.state.device === Device.ANDROID
        ? this.renderOrigin(url)
        : this.renderCustomize(url)
    )
  }
}

function intToTime(val) {
  return new Date(val * 1000).toISOString().substr(14, 5)
}
