import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from '../../../../redux/actions'
import { loadExport } from './async'

@connect(state => state)
export default class ProblemExport extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      infos: ''
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadExport().then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          infos: msg
        })
      } else {
        alertMsg(msg)
      }

    })

  }

  render() {
    const {infos} = this.state
    return (
      <div>
        {infos}
      </div>
    )

  }

}
