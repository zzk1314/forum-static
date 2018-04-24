import * as React from 'react'
import proxy from './requestProxy'
import { Dialog, FlatButton } from 'material-ui'
import Loading from '../Loading'

export default class ProxyComponent extends React.Component {

  constructor () {
    super()
    this.state = {
      showToast: false,
      showAlert: false,
      alertParams: [],
      alertContent: '',
    }
  }

  componentWillMount () {
    proxy.addObserver(this)
  }

  startLoad () {
    this.setState({
      showToast: true,
    })
  }

  endLoad () {
    this.setState({
      showToast: false,
    })
  }

  alertMessage (message) {
    if (message && typeof message === 'string') {
      this.setState({
        showAlert: true,
        alertParams: [
          <FlatButton label="我知道了"
                      primary={true}
                      onClick={() => this.setState({ showAlert: false })}/>,
        ],
        alertContent: message,
      })
    }
  }

  render () {
    const {
      showToast,
      showAlert,
      alertParams,
      alertContent,
    } = this.state

    const renderToast = () => {
      return showToast && <Loading/>
    }

    const renderAlert = () => {
      return (
        <Dialog open={showAlert}
                modal={false}
                actions={alertParams}>
          {alertContent}
        </Dialog>
      )
    }

    return (
      <div>
        {renderToast()}
        {renderAlert()}
      </div>
    )
  }

}
