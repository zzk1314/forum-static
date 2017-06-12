import * as React from "react";
import "./Tutorial.less"
import SwipeableViews from 'react-swipeable-views';

export default class Tutorial extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      bgList: props.bgList || ["https://static.iqycamp.com/images/fragment/rise_tutorial_1_0522.jpg?imageslim",
        "https://static.iqycamp.com/images/fragment/rise_tutorial_2_0522.jpg?imageslim",
        "https://static.iqycamp.com/images/fragment/rise_tutorial_3_0522.jpg?imageslim",
        "https://static.iqycamp.com/images/fragment/rise_tutorial_4_0522.jpg?imageslim",
        "https://static.iqycamp.com/images/rise_tutorial_2_0516.png?imageslim"],
      index: 0,
      onShowEnd: props.onShowEnd || function () {
      },
      close:false
    }
  }


  componentWillMount() {

  }

  next() {
    const {index, bgList} = this.state;
    if (index >= bgList.length - 1) {
      this.state.onShowEnd();
    } else {
      this.setState({index: index + 1});
    }

  }


  onSwitching(index,type){
    const {bgList,onShowEnd,close} = this.state;
    switch(type){
      case 'end':{
        if(index===bgList.length-1 && close){
          onShowEnd();
        } else {
          this.setState({index:index,close:false});
        }
        break;
      }
      case 'move':{
        if(index>bgList.length-1){
          this.setState({close:true});
        }
        break;
      }
      default: console.log(index,type);
    }

  }

  render() {
    const {index, bgList} = this.state;

    return (
      this.props.show?<div className="tutorial-mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.0)',position:'fixed',top:0,left:0}}>

      <div className="tutorial" onClick={()=>this.next()}>
        <SwipeableViews style={{height:'100%',width:'100%'}} slideStyle={{height:"100%",width:"100%",overflow:'hidden'}} containerStyle={{height:'100%',width:'100%'}}
                        index={index} onSwitching={(index,type)=>this.onSwitching(index,type)} resistance={true}>
          {this.state.bgList.map((item, seq) => {
            return (<div className="item">
              <img key={seq} src={item}/>
            </div>)
          })}
        </SwipeableViews>
        {<div className="sequence-dot" style={{marginLeft:`-${this.state.bgList.length * 18 / 2}px`}}>
          {this.state.bgList.length > 1 && this.state.bgList.map((item, seq) => {
            return (<button className="dot-box">
              <div className="dot"
                   style={{backgroundColor:`${index==seq?'rgb(49, 159, 214)':'rgb(228, 230, 231)'}`}}></div>
            </button>)
          })}
        </div>}
      </div>
      </div>:null
    )
  }
}
