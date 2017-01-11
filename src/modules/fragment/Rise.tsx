import * as React from "react"
import Loader from "../../components/Loader"
import { loadCurrentProblem } from "./async";

export default class Rise extends React.Component<any,any>{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    //
    loadCurrentProblem()
      .then(res=>{

      }).catch(err=>console.log(err));
  }
  render(){
    return (
      <Loader/>
    )
  }
}
