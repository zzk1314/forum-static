import * as React from "react";
import Avatar from 'material-ui/Avatar';



export default class Author extends React.Component{
  constructor(props){
    super(props);
    this.style = {
      author:{},
      avatar:{float:'left'},
      upInfo:{marginLeft:'35px'},
      upName:{
        fontSize: '16px',
        color: '#333333',
        lineHeight: '18px',
        display: 'inline-block',
      },
      upTime:{
        color: '#999999',
        fontSize: '12px',
        float: 'right',
      },
      role:{
        display: 'inline-block',
        marginLeft: 5,
      },
      img: {
        verticalAlign: 'bottom',
        width: 53,
        height: 23,
      }
    }
  }



  render(){
    const {headPic,upName,upTime, role} = this.props;
    return (
      <div style={this.style.author}>
        <div style={this.style.avatar}>
          <Avatar
            src={headPic}
            size={30}
          />
        </div>
        <div style={this.style.upInfo}>
          <div style={this.style.upName}>{upName}</div>
          {role==3||role==4?<div style={this.style.role}><img style={this.style.img} src='http://www.iqycamp.com/images/coach.png'/></div>:null}
          {role==5?<div style={this.style.role}><img style={this.style.img} src='http://www.iqycamp.com/images/senior_coach.png'/></div>:null}
          {role==6||role==8?<div style={this.style.role}><img style={this.style.img} src='http://www.iqycamp.com/images/first_coach.png'/></div>:null}
          {role==7?<div style={this.style.role}><img style={this.style.img} src='http://www.iqycamp.com/images/vip.png'/></div>:null}
          <div style={this.style.upTime}>{upTime + "上传"}</div>
        </div>
      </div>
    )
  }
}
