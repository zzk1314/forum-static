import * as React from "react";
import {connect} from "react-redux";
import {List, ListItem,makeSelectable} from 'material-ui/List';
import * as _ from "lodash";
import "./AsstIndex.less"
import {Grid, Row, Col} from "react-flexbox-grid"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {List, ListItem, makeSelectable} from 'material-ui/List';
import VerticalBarLoading from "../../components/VerticalBarLoading"
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';


const style = {
  divider: {
    backgroundColor: "#f5f5f5",
  },
  listTitle: {
    height: "65px",
    padding: 0,
    overflow: "hidden",
  },
  firstItem: {
    margin: "0px auto",
    padding: "20px 0 25px"
  },
  item: {
    margin: "0 auto",
    padding: "24px 0"
  },
  itemActive: {
    color: "#55cbcb"
  }
}


@connect(state => state)
export default class Fragment extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      problemCatalogs: [],
      doingId: null,
      curProblem: null,
    }
  }

  componentWillMount() {

  }



  render() {

    const renderMenu = () => {
      return (
        <List>
          <Subheader style={style.listTitle}>
            <div className="listTitle">后台评论</div>
          </Subheader>
          <Divider style={style.divider}/>

          <div className="catalog-area">
              <div className="catalog-name" onClick={()=>{
                this.context.router.push({pathname:'/backend/warmup'})
              }}>应用练习评论</div>
              <div className="catalog-name" onClick={()=>{
                this.context.router.push({pathname:'/backend/application/problem/list'})
              }}>小课分享评论</div>
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
          {/*{window.ENV.openFeedBack?renderFeedBack():null}*/}
        </div>
      </div>
    )
  }
}
