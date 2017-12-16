import * as React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import './BackendIndex.less'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import { Menus } from '../../utils/Invariables'

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
export default class Fragment extends React.Component<any, any> {

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
          <Subheader style={style.listTitle}>
            <div className="listTitle">内容功能</div>
          </Subheader>
          <Divider style={style.divider}/>
          <div className="catalog-area">
            {
              window.ENV.isDevelopment ?
                <div className="catalog-name" onClick={() => {
                  this.context.router.push({ pathname: '/backend/problem/import' })
                }}>小课导入</div> : null
            }
            {
              window.ENV.isDevelopment ?
                <div className="catalog-name" onClick={() => {
                  this.context.router.push({ pathname: '/backend/knowledge/import' })
                }}>小课知识导入</div> : null
            }
            {
              window.ENV.isDevelopment ?
                <div className="catalog-name" onClick={() => {
                  this.props.dispatch(set('menu', Menus.WARM_UP_NEWPRACTICE))
                  this.context.router.push({ pathname: '/backend/warmup/import' })
                }}>选择题导入</div> : null
            }
            {
              window.ENV.isDevelopment ?
                <div className="catalog-name" onClick={() => {
                  this.props.dispatch(set('menu', Menus.WARM_UP_MANAGE))
                  this.context.router.push({ pathname: '/backend/warmup/management' })
                }}>选择题管理</div> : null
            }
            {
              window.ENV.isDevelopment ?
                <div className="catalog-name" onClick={() => {
                  this.context.router.push({ pathname: '/backend/application/import' })
                }}>应用题导入</div> : null
            }
            {
              window.ENV.isDevelopment ?
                <div className="catalog-name" onClick={() => {
                  this.props.dispatch(set('menu', Menus.APPLICATION_MANAGE))
                  this.context.router.push({ pathname: '/backend/application/management' })
                }}>应用题管理</div> : null
            }
          </div>

          <Subheader style={style.listTitle}>
            <div className="listTitle">运营功能</div>
          </Subheader>
          <Divider style={style.divider}/>
          <div className="catalog-area">
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/camp/add' })}}>
              学员录入
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/camp/group' })}}>
              学员分组
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/camp/info' })}}>
              学员详情
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/camp/identity' })}}>
              优秀学员
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/message/reply' })}}>
              自动回复
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/message/subscribe' })}}>
              关注回复
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/business/school/application' })}}>
              商学院申请审批
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/survey/config' })}}>
              问卷链接设置
            </div>
          </div>

          <Subheader style={style.listTitle}>
            <div className="listTitle">管理员功能</div>
          </Subheader>
          <Divider style={style.divider}/>
          <div className="catalog-area">
            <div className="catalog-name" onClick={() => {
              this.context.router.push({ pathname: '/backend/admin/config' })
            }}>项目配置
            </div>
            <div className="catalog-name" onClick={() => {
              this.context.router.push({ pathname: '/backend/admin/refund' })
            }}>退款
            </div>
          </div>
        </List>
      )
    }

    return (
      <div className="backendContent">
        <div className="leftList">
          {renderMenu()}
        </div>
        <div className="rightContent">
          {this.props.children}
        </div>
      </div>
    )
  }
}
