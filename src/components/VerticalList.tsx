import React, {Component, PropTypes} from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
let SelectableList = makeSelectable(List);
import * as _ from "lodash";
import "./VerticalList.less"
import Divider from 'material-ui/Divider';
import {set, startLoad, endLoad, alertMsg} from "redux/actions"

const style = {
  divider: {
    backgroundColor: "#f5f5f5"
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
  }
}

export default class VerticalList extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      onChangeCall: props.onChangeCall
    }
  }

  componentWillMount() {

  }

  handleRequestChange = (event, index) => {
    console.log("click",index);
    this.state.onChangeCall(index);
  };


  render() {
    const {problemList, defaultValue} = this.props;
    console.log("problemList",problemList);
    console.log("defaultValue",defaultValue);
    const textItem = (item) => {
      console.log('equal',typeof defaultValue);
      return <div key={item.id}
                  className={_.isEqual(Number(defaultValue),item.id)?"listItem-choose":"listItem"}>{item.problem}</div>
    }

    return (
      <SelectableList
        value={defaultValue}
        onChange={this.handleRequestChange}>
        <Subheader style={style.listTitle}>
          <div className="listTitle">难题</div>
        </Subheader>
        <Divider style={style.divider}/>
        {problemList.map((item, index) => {
          return (
            <ListItem
              key={index}
              innerDivStyle={_.isEqual(index,0)?style.firstItem:style.item}
              children={textItem(item)}
              value={item.id}
            >
            </ListItem>
          )
        })}
      </SelectableList>
    )
  }
}
