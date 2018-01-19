import * as React from 'react'
import './CommentTip.less'
import Paper from 'material-ui/Paper'
import _ from 'lodash'

const style = {
  paper: {
    width: 120,
    left: '80%',
    position: 'fixed',
    height: 60,
    textAlign: 'center',
    marginTop: -45,
    zIndex: 1000,
  }
}

export default class CommentTip extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
  }

  componentWillReceiveProps(props) {
    this.render()
  }

  onMouseOver() {
    this.refs.total.style.color = '#55cbcb'
  }

  onMouseOut() {
    this.refs.total.style.color = '#999999'
  }

  render() {
    const { todayComment, totalComment } = this.props

    return (
      <Paper style={style.paper}>
        <div className="comment-count">今日点评<span>{todayComment}</span>份</div>
        <div className="comment-count"><a href="/asst/commented" onMouseOut={this.onMouseOut.bind(this)}
                                          onMouseOver={this.onMouseOver.bind(this)}>
          共点评过{' '}
          <div ref="total">{totalComment}</div>
          {' '}份</a></div>
      </Paper>
    )
  }
}
