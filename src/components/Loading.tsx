import * as React from "react"
import Paper from 'material-ui/Paper';
import * as _ from "lodash"
import CircularProgress from 'material-ui/CircularProgress';

export default class Loading extends React.Component<any,any>{

  constructor(props){
    super(props);

  }

  render(){
    const {paperStyle={},progressStyle={},zDepth=2,size=150,rounded=false} = this.props;
    if(!_.isUndefined(size)){
      _.set(paperStyle,"width",size+"px");
      _.set(paperStyle,"height",size+"px");
    }
    return (
      <Paper style={paperStyle} zDepth={2} rounded={false} circle={true}>
        <CircularProgress style={progressStyle} size={size} thickness={5}>
          加载中
        </CircularProgress>
      </Paper>
    )
  }
}
