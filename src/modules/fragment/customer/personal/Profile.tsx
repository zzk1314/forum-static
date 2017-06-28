import * as React from "react"
import { connect } from "react-redux"
import { set, startLoad, endLoad, alertMsg } from "../../../../redux/actions"
import { pget, ppost, mark } from "utils/request"
import { TextField, SelectField, MenuItem } from "material-ui"
import "./Profile.less"

const industryList = [
  { id: "1", value: "互联网/电商" },
  { id: "2", value: "软件/IT服务" },
  { id: "3", value: "咨询" },
  { id: "4", value: "人力资源" },
  { id: "5", value: "法律" },
  { id: "6", value: "快消品" },
  { id: "7", value: "银行/证券/保险" },
  { id: "8", value: "机械/重工" },
  { id: "9", value: "房地产" },
  { id: "10", value: "学术/科研/院校" },
  { id: "11", value: "医药/医疗设备" },
  { id: "12", value: "通信/电子" },
  { id: "13", value: "计算机硬件/半导体" },
  { id: "14", value: "能源/化工" },
  { id: "15", value: "物流" },
  { id: "16", value: "政府/公共事业/非营利" },
  { id: "17", value: "其他" }
];

const workingLifeList = [
  { id: "2", value: "0" },
  { id: "3", value: "0~1年" },
  { id: "4", value: "1~3年" },
  { id: "5", value: "3~5年" },
  { id: "6", value: "5~7年" },
  { id: "7", value: "7~10年" },
  { id: "8", value: "10~15年" },
  { id: "9", value: "15年以上" }
];

@connect(state => state)
export default class Profile extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      workingYear: ''
    }
  }

  handleWorkingYear(ev) {
    console.log(ev)
    console.log(ev.target.textContent)
    this.setState({ workingYear: ev.target.textContent })
  }

  render() {
    return (
      <div className="profile-container">
        <div className="profile-page">
          <div className="profile-edit">
            <div className="profile-item">
              <div className="item-name">工作年限</div>
              <div className="item-edit">
                <SelectField
                  hintText="请选择工作年限"
                  value={this.state.workingYear}
                  onChange={this.handleWorkingYear.bind(this)}>
                  {
                    workingLifeList.map((item, index) => {
                      return <MenuItem key={index} className="edit-value" value={item.value} primaryText={item.value}/>
                    })
                  }
                </SelectField>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
