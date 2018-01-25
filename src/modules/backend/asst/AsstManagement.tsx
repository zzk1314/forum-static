import * as React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import './AsstManagement.less'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import { Menus } from '../../../utils/Invariables'

const style = {
  divider: {
    backgroundColor: '#f5f5f5'
  },
  listTitle: {
    height: '65px',
    padding: 0,
    overflow: 'hidden'
  },
  firstItem: {
    margin: '0px auto',
    padding: '20px 0 25px'
  },
  item: {
    margin: '0 auto',
    padding: '24px 0'
  },
  itemActive: {
    color: '#55cbcb'
  }
}

@connect(state => state)
export default class AsstManagement extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      problemCatalogs: [],
      doingId: null,
      curProblem: null
    }
  }

  componentWillMount() {

  }

  onClick(pathname, index){
    this.setState({index});
    this.context.router.push({pathname});
  }

  render() {
    const renderMenu = () => {
      return (
        <List>
          <ListItem
            style={this.state.index === 1 ? style.itemActive : style.item}
            value={1}
            primaryText="助教测评标准"
            onTouchTap={()=>this.onClick('/backend/assist/standard', 1)} />
          <ListItem
            style={this.state.index === 2 ? style.itemActive : style.item}
            value={2}
            primaryText="助教完成情况"
            onTouchTap={()=>this.onClick('/backend/assist/execution', 2)} />
          <ListItem
            style={this.state.index === 3 ? style.itemActive : style.item}
            value={3}
            primaryText="助教升降级"
            onTouchTap={()=>this.onClick('/backend/assist/upgrade', 3)} />
        </List>
      )
    }

    return (
      <div className="asst-backendContent">
        <div className="leftList">
          {renderMenu()}
        </div>
        <div className="asst-scroll"></div>
        <div className="rightContent">
          {this.props.children}
        </div>
      </div>
    )
  }
}
