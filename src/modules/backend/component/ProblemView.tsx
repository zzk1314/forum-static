import * as React from "react";
import * as _ from "lodash";
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"


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

export default class ProblemView extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
  }

  componentWillReceiveProps(props){
    this.render()
  }

  render() {
    const {chooseProblem, problemList} = this.props

    const renderProblemList = () => {
      return (
          <List>
            <Subheader style={style.listTitle}>
              <div className="listTitle">小课</div>
            </Subheader>
            <Divider style={style.divider}/>
            {problemList.map((catalog, index) => {

              return (
                  <div className="catalog-area" key={index} style={{marginTop:`${index==0?0:40}px`}}>
                    <div className="catalog-name">{catalog.name}</div>
                    {catalog.problems.map((item,seq)=>{
                      return (
                          <ListItem
                              key={seq}
                              onClick={()=>chooseProblem(item.id)}
                              innerDivStyle={_.isEqual(seq,0)?style.firstItem:style.item}
                              children={textItem(item)}
                              value={item.id}
                          >
                          </ListItem>
                      )
                    })}
                  </div>
              )
            })}
          </List>
      )
    }

    const textItem = (item) => {
      return item.chosen?
        <div key={item.id}
                  className="listItem done choose done-chose">{item.abbreviation}
        </div>:
        <div key={item.id}
               className="listItem done">{item.abbreviation}
        </div>
    }

    return (
        renderProblemList()
    )
  }
}
