import React, {Component, PropTypes} from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import * as _ from "lodash";
import "./VerticalList.less"
import Divider from 'material-ui/Divider';
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {imgSrc} from "utils/imgSrc"

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
    margin: "16px auto 50px",
    padding: "24px 0"
  },
  item: {
    margin: "50px auto",
    padding: "24px 0"
  },
  itemActive: {
    color: "#55cbcb"
  }
}

export default class VerticalList extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      onChangeCall: props.onChangeCall,
      activeNav: props.activeNav,
    }
  }

  handleRequestChange = (event, index) => {
    this.state.onChangeCall(index);
  };

  render() {
    const {problemList = [], activeNav} = this.props;
    const textItem = (item) => {
      return <div key={item.id}
                  className={_.isEqual(Number(activeNav),item.id)?"listItem-choose":"listItem"}>{item.problem}
        {_.isEqual(Number(activeNav), item.id) ?
          <div style={{    float: "right", marginRight: "10px"}}><img src={imgSrc.curNav}/></div>: null}
      </div>
    }

    return (
      <List>
        <Subheader style={style.listTitle}>
          <div className="listTitle">主题</div>
        </Subheader>
        <Divider style={style.divider}/>
        {problemList.map((item, index) => {
          return (
            <ListItem
              key={index}
              onClick={(e)=>this.handleRequestChange(e,item.id)}
              innerDivStyle={_.isEqual(index,0)?style.firstItem:style.item}
              children={textItem(item)}
              value={item.id}
            >
            </ListItem>
          )
        })}
      </List>
    )
  }
}
