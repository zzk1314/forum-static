import * as React from 'react'
import './Main.less'
import { connect } from 'react-redux'
import { getCertificate } from './async'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'

@connect(state => state)
export default class Main extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      initialScale: 0,
      backgroundPicWidth: 750,
      backgroundPicHeight: 1334
    }
  }

  domtoimage = require('dom-to-image')

  componentWillMount() {
    const { dispatch, location } = this.props
    this.fit()
    const { certificateNo } = location.query
    dispatch(startLoad())
    getCertificate(certificateNo).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        //用户没有填姓名时，跳转填写姓名
        if(!res.msg.name) {
          this.context.router.push({ pathname: '/rise/static/customer/certificate/profile', query: { certificateNo } })
        } else {
          this.setState(res.msg)
        }
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch((err) => {
      dispatch(alertMsg(err))
    })
  }

  fit() {
    let windowWidth = window.innerWidth
    let pageWidth = this.state.backgroundPicWidth

    let initialScale = windowWidth / pageWidth

    this.setState({ initialScale })
  }

  componentDidMount() {
    const { hiddenTab } = this.props
    hiddenTab()
  }

  generateSvg() {
    let node = document.getElementById('container')
    this.domtoimage.toPng(node).then(function(dataUrl) {
      let a = document.createElement('a')
      a.href = dataUrl
      a.download = '证书'
      console.log(a)
      a.click()
    })
  }

  render() {
    const {
      initialScale, backgroundPicHeight, backgroundPicWidth,
      month, name, typeName, congratulation, problemName, certificateNo, type
    } = this.state
    return (
      <div onClick={() => this.generateSvg()}
           id="container" className="certificate-container"
           style={{ height: backgroundPicHeight * initialScale }}>
        {type ?
          <div className={`certificate ${type === 5 ? 'ordinary' : 'excellent'}`} style={{
            width: backgroundPicWidth, height: backgroundPicHeight, transform: `scale(${initialScale})`,
            WebkitTransform: `scale(${initialScale})`
          }}>
            <div className="certificate-description">
              <div className="description-text1">圈外同学 • {month}月小课训练营</div>
              <div className="description-text2">《{problemName}》</div>
            </div>
            <div className="certificate-name">
              {typeName}
            </div>
            <div className="name">
              {name}
            </div>
            <pre className="cong">
            {congratulation}
          </pre>
            <div className={`certificate-number ${type === 5 ? 'ordinary' : ''}`}>
              证书编号：{certificateNo}
            </div>
          </div> : null
        }
      </div>
    )
  }
}
