import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'
import { loadTargetDiscuss, loadTodayDiscuss } from './async'
import { Divider, FlatButton, MenuItem, RaisedButton, SelectField } from 'material-ui'
import { removeHtmlTags } from '../../../utils/textUtils'
import './WarmupList.less'
import * as _ from "lodash"
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
      interval: { id: 0, value: '今天' },
      current: 1,
      total: ''
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
    const { warmupList = [], interval, current } = this.state

    const renderTotal = () => {
      return (
        <div className="display-total">
          {warmupList.length>0 && <div>{current}/{warmupList.length}</div>}
        </div>
      )
    }

    /*加载7天选择期*/
    const renderSevenDays = () => {
      return (
        <div>
          <SelectField
            value={interval} style={{ 'text-align': 'center' }}
            onChange={(event, index, value) => this.setState({ interval: value,current:1})}
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
              style={{ marginLeft: 60, marginBottom: 50, marginTop: 20 }}
              label="确定" primary={true}
              onClick={() => this.loadSelectDay()}/>
          </div>
        </div>
      )
    }

    const renderWarmupList = (warmupList) => {
      return (
        <div>
          {!_.isEmpty(warmupList) &&
            <div>
            <div className="show-warm-up" onClick={() => {
              this.view(warmupList[current - 1])
            }}>
              {
                removeHtmlTags(warmupList[current - 1].question).length > 40 ?
                  removeHtmlTags(warmupList[current - 1].question).substring(0, 40).concat(' ...') :
                  removeHtmlTags(warmupList[current - 1].question)}<Divider/>
            </div>
              <div>
                <RaisedButton
                  style={{ marginLeft: 60, marginBottom: 50, marginTop: 20 }}
                  label="下一题" primary={true}
                  onClick={() => this.setState({current:current+1})}/>
              </div>
            </div>
          }



        </div>
      )
    }

    return (
      <div className="warm-up-list">
        {renderSevenDays()}
        {renderTotal()}
        {renderWarmupList(warmupList)}
      </div>
    )
  }
}
