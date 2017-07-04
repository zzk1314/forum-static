import * as React from "react"
import { connect } from "react-redux"
import { set, startLoad, endLoad, alertMsg } from "../../../../redux/actions"
import { pget, ppost, mark } from "utils/request"
import { TextField, SelectField, MenuItem, Snackbar } from "material-ui"
import "./Profile.less"
import { loadProfile, loadRegion, updateProfile } from "../async";
import  * as _ from "lodash"

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
  { id: "1", value: "0" },
  { id: "2", value: "0~1年" },
  { id: "3", value: "1~3年" },
  { id: "4", value: "3~5年" },
  { id: "5", value: "5~7年" },
  { id: "6", value: "7~10年" },
  { id: "7", value: "10~15年" },
  { id: "8", value: "15年以上" }
];
interface ProfileStates {
  workingLife: string;
  industry: string;
  job: string;
  province: string;
  city: string;
  // 省市列表
  provinceList: object;
  cityList: object;
  // 联动列表
  cityChoose: object;
  updateable: boolean;
  // 当前页是否加载完成
  isLoadingDone: boolean;
  // 展示弹窗 toast
  showSnackBar: boolean;
}
@connect(state => state)
export default class Profile extends React.Component<any, ProfileStates> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      workingLife: '',
      industry: '',
      job: '',
      province: '',
      city: '',
      provinceList: [],
      cityList: [],
      cityChoose: [],
      updateable: true,
      isLoadingDone: false,
      showSnackBar: false
    }
  }

  componentWillMount() {
    mark({ module: "打点", function: "个人中心", action: "打开我的信息页面" });
    const { dispatch } = this.props
    dispatch(startLoad())
    loadProfile().then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          workingLife: msg.workingLife,
          industry: msg.industry,
          job: msg.function,
          province: msg.province,
          city: msg.city
        })
        loadRegion().then(res => {
          dispatch(endLoad())
          this.setState({
            provinceList: res.msg.provinceList,
            cityList: res.msg.cityList,
          }, () => {
            let provinceObject = _.filter(res.msg.provinceList, { value: this.state.province })
            let parentId = 0;
            if(provinceObject.length > 0) {
              parentId = provinceObject[0].id
            }
            this.setState({ cityChoose: _.filter(res.msg.cityList, { parentId: parentId }), isLoadingDone: true })
          })
        }).catch(e => {
          dispatch(endLoad())
          dispatch(alertMsg(e))
        })
      } else {
        dispatch(endLoad())
        dispatch(alertMsg(msg))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  // 处理工作年限选择
  handleWorkingYear(ev) {
    this.setState({ workingYear: ev.target.textContent })
  }

  // 处理行业选择类别
  handleIndustry(ev) {
    this.setState({ industry: ev.target.textContent })
  }

  handleProvince(ev, index, value) {
    let province = _.filter(this.state.provinceList, { value: value })
    let provinceId = 0
    if(province.length > 0) {
      provinceId = province[0].id
    }
    this.setState({
      province: value,
      provinceText: ev.target.textContent,
      cityChoose: _.filter(this.state.cityList, { parentId: provinceId })
    })
  }

  handleCity(ev, index, value) {
    this.setState({
      city: value,
      cityText: ev.target.textContent
    })
  }

  handleUpdateProfile() {
    const { workingLife, industry, province, city, provinceList, cityList } = this.state
    const { dispatch } = this.props
    const job = document.getElementById("job").value
    let chooseProvince = _.filter(provinceList, { value: province })
    if(chooseProvince.length > 0) {
      let provinceId = chooseProvince[0].id
      if(_.filter(cityList, { parentId: provinceId, value: city }).length === 0) {
        dispatch(alertMsg(null, "请选择城市"))
        return
      }
    }
    this.setState({ updateable: false })
    dispatch(startLoad())
    console.log("各参数：", workingLife, industry, job, province, city)
    updateProfile(workingLife, industry, job, province, city).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ updateable: true, showSnackBar: true }, () => {
          setTimeout(() => {
            this.setState({ showSnackBar: false })
          }, 1000)
        })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  render() {
    const { workingLife, industry, job, province, city, provinceList, cityList, cityChoose, updateable, isLoadingDone, showSnackBar } = this.state

    const renderWorkingLife = () => {
      return (
        <div>
          <div className="profile-item">
            <div className="item-name">工作年限</div>
            <SelectField
              className="item-edit"
              hintText="请选择工作年限"
              value={workingLife}
              onChange={this.handleWorkingYear.bind(this)}
            >
              {
                workingLifeList.map((item, idx) => {
                  return <MenuItem key={idx} className="edit-value" value={item.value} primaryText={item.value}/>
                })
              }
            </SelectField>
          </div>
        </div>
      )
    }

    const renderIndustry = () => {
      return (
        <div>
          <div className="profile-item">
            <div className="item-name">行业</div>
            <SelectField
              className="item-edit"
              hintText="请选择工作行业"
              value={industry}
              onChange={this.handleIndustry.bind(this)}>
              {
                industryList.map((item, idx) => {
                  return <MenuItem key={idx} className="edit-value" value={item.value} primaryText={item.value}/>
                })
              }
            </SelectField>
          </div>
        </div>
      )
    }

    const renderJob = () => {
      if(!job) return

      return (
        <div>
          <div className="profile-item">
            <div className="item-name">职业</div>
            {
              job ?
                <TextField id="job" className="item-edit" defaultValue={job}/> :
                <TextField id="job" className="item-edit" hintText="填写您的职业"/>
            }
          </div>
        </div>
      )
    }

    const renderRegion = () => {
      return (
        <div>
          <div className="profile-item">
            <div className="item-name">省份/城市</div>
            <SelectField
              className="item-edit"
              hintText="请选择省份"
              value={province}
              onChange={this.handleProvince.bind(this)}>
              {
                provinceList.map((item, idx) => {
                  return <MenuItem key={idx} className="edit-value" value={item.value} primaryText={item.value}/>
                })
              }
            </SelectField>
            <SelectField
              className="item-edit item-second"
              hintText="请选择城市"
              value={city}
              onChange={this.handleCity.bind(this)}>
              {
                cityChoose.map((item, idx) => {
                  return <MenuItem key={idx} className="edit-value" value={item.value} primaryText={item.value}/>
                })
              }
            </SelectField>
          </div>
        </div>
      )
    }

    const renderProfilePage = () => {
      if(isLoadingDone) {
        return (
          <div className="profile-page">
            <div className="profile-edit">
              {renderWorkingLife()}
              {renderIndustry()}
              {renderJob()}
              {renderRegion()}
              <div className={`profile-button ${updateable ? "enable" : "disable"}`}
                   onClick={this.handleUpdateProfile.bind(this)}>
                {updateable ? "更新信息" : "更新中" }
              </div>
            </div>
          </div>
        )
      } else {
        return <div/>
      }
    }

    const renderOtherComponents = () => {
      return (
        <Snackbar
          open={showSnackBar}
          message="更新个人信息成功"
          autoHideDuration={1000}
        />
      )
    }

    return (
      <div className="profile-container">
        {renderProfilePage()}
        {renderOtherComponents()}
      </div>
    )
  }

}
