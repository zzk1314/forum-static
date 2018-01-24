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

  render() {
    const renderMenu = () => {
      return (
        <List>
              <div className="catalog-area">
                {/*<div className="catalog-name" onClick={()=>{*/}
                  {/*this.context.router.push({pathname:'/backend/assist/default'})*/}
                {/*}}>*/}
                  {/*助教默认标准*/}
                {/*</div>*/}
                <div className="catalog-name" onClick={() => {
                  this.context.router.push({ pathname: '/backend/assist/standard' })
                }}>助教测评标准
                </div>
                <div className="catalog-name" onClick={() => {
                  this.context.router.push({ pathname: '/backend/assist/execution' })
                }}>助教完成情况
                </div>
                <div className="catalog-name" onClick={() => {
                  this.context.router.push({ pathname: '/backend/assist/upgrade' })
                }}>助教升降级
                </div>
              </div>
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
