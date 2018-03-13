import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'
import { loadTargetDiscuss, loadTodayDiscuss } from './async'
import { Divider, FlatButton, MenuItem, RaisedButton, SelectField } from 'material-ui'
import { removeHtmlTags } from '../../../utils/textUtils'
import './WarmupList.less'

/**
 * 选择题评论列表页
 */

const intervals = [
  { id: 0, value: '今天' },
  { id: 1, value: '一天前' },
  { id: 2, value: '两天前' },
  { id: 3, value: '三天前' },
  { id: 4, value: '四天前' },
  { id: 5, value: '五天前' },
  { id: 6, value: '六天前' },
  { id: 7, value: '七天前' }
]

@connect(state => state)
export default class WarmupList extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      warmupList: [],
      interval: { id: 0, value: '今天' }
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    const { interval } = this.state
    dispatch(startLoad())
    loadTargetDiscuss(interval.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          warmupList: msg
        })
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  view(practice) {
    const { interval } = this.state
    window.open(`/backend/warmup/view?id=${practice.id}&interval=${interval.id}`)
  }

  loadSelectDay() {
    const { dispatch } = this.props
    const { interval } = this.state
    dispatch(startLoad())
    loadTargetDiscuss(interval.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          warmupList: msg
        })
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  render() {
    const { warmupList = [], interval } = this.state

    /*加载7天选择期*/
    const renderSevenDays = () => {
      return (
        <div>
          <SelectField
            value={interval} style={{ 'text-align': 'center' }}
            onChange={(event, index, value) => this.setState({ interval: value })}
            maxHeight={400}
          >
            {
              intervals.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item} primaryText={item.value}/>
                )
              })
            }
          </SelectField>
          <div>
            <RaisedButton
              style={{ marginLeft: 60 }}
              label="确定" primary={true}
              onClick={() => this.loadSelectDay()}/>
          </div>
        </div>
      )
    }

    const renderWarmupList = (warmupList) => {
      return (
          warmupList.map((practice, index) => {
          return (
            <div key={index}>
              <div className="show-warm-up" onClick={() => {
                this.view(practice)
              }}>
                {
                  removeHtmlTags(practice.question).length > 40 ?
                    removeHtmlTags(practice.question).substring(0, 40).concat(' ...') : removeHtmlTags(practice.question)
                }
              </div>
              <Divider/>
            </div>
          )
        })
      )
    }

    return (
      <div className="warm-up-list">
        {renderSevenDays()}
        {renderWarmupList(warmupList)}
      </div>
    )
  }
}
