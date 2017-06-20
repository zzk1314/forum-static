import * as React from "react";
import {connect} from "react-redux"
import "./KnowledgeView.less";
import AssetImg from "../../../components/AssetImg";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import {loadKnowledge} from "./async.bak"

@connect(state=>state)
export default class KnowledgeModal extends React.Component<any, any> {
  constructor() {
    super()
    this.state = {
      data:{},
    }
  }

  componentWillMount(){
    const {location,dispatch} = this.props
    const {id} = location.query
    loadKnowledge(id).then(res => {
      if (res.code === 200) {
        this.setState({data:res.msg})
      }else{
        dispatch(alertMsg(res.msg))
      }
    }).catch(err => dispatch(alertMsg(err + "")))
  }

  render() {
    const { data } = this.state
    const { analysis, means, keynote, audio, pic, analysisPic, meansPic, keynotePic,knowledge } = data

    return (
      <div className="knowledge-container">
          <div className="page-header">{knowledge}</div>
          <div className="intro-container">
            { audio ? <div className="context-audio"><audio src={audio}/></div> : null }
            { pic ? <div className="context-img"><img src={pic}/></div> : null }
            { analysis?
                <div>
                  <div className="context-title-img">
                    <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/analysis2.png"/>
                  </div>
                  <div className="text">
                    <pre>{analysis}</pre>
                  </div>
                  { analysisPic ? <div className="context-img"><img width={'90%'} src={analysisPic}/></div> : null }
                </div>
                : null}
            { means?
                <div>
                  <div className="context-title-img">
                    <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/means2.png"/>
                  </div>
                  <div className="text">
                    <pre>{means}</pre>
                  </div>
                  { meansPic ? <div className="context-img"><img width={'90%'} src={meansPic}/></div> : null }
                </div>
                : null }
            {keynote ?
                <div>
                    <div className="context-title-img">
                      <AssetImg width={'60%'} url="https://static.iqycamp.com/images/fragment/keynote2.png"/>
                    </div>
                    <div className="text">
                      <pre>{keynote}</pre>
                    </div>
                    { keynotePic ? <div className="context-img"><img width={'90%'} src={keynotePic}/></div> : null }
                </div>: null}
          </div>
      </div>
    )
  }
}
