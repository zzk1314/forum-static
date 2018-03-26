import * as React from "react";
import './ProblemView.less'
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
  // firstItem: {
  //   margin: "0px auto",
  //   padding: "20px 0 25px"
  // },
  item: {
    margin: "0 auto",
    padding: "24px 0",
    borderTop:"solid 1px #f5f5f5",
    borderBottom:"solid 1px #f5f5f5",
    marginRight:'24px',
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
                  <div className="catalog-area" key={index}>
                    <div className="catalog-name">{catalog.name}</div>
                    {catalog.problems.map((item,seq)=>{
                      return (
                        <div style={{position:'relative'}}>
                            <ListItem
                                key={seq}
                                onClick={()=>chooseProblem(item.id)}
                                innerDivStyle={style.item}
                                children={textItem(item)}
                                value={item.id}
                            >
                            </ListItem>
                          {item.underCommentCount?<div className="notification">{item.underCommentCount}</div>:null}
                        </div>

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
        <div className="problem-view-div">{renderProblemList()}</div>
    )
  }
}
