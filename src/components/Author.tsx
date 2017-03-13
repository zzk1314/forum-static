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
      },
      upTime:{
        color: '#999999',
        fontSize: '12px'
      },
    }
  }



  render(){
    const {headPic,upName,upTime} = this.props;
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
          <div style={this.style.upTime}>{upTime + "上传"}</div>
        </div>
      </div>
    )
  }
}
