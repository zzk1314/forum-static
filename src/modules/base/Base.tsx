import * as React from "react"
import { connect } from "react-redux"
import { set } from "redux/actions"
const P = "base"

@connect(state => state)
export default class Main extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
    }
  }


  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
