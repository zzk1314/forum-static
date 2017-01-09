import * as React from "react"
import Upload from "rc-upload"
import "./PicUpload.less"
import FlatButton from 'material-ui/FlatButton';
import * as _ from "lodash"
import AlertMessage from "./AlertMessage"
import Loader from "./Loader"

export default class PicUpload extends React.Component<any,any>{
  constructor(props){
    super(props);
    const {disabled=false} = props;

    this.state = {
      disabled:disabled,
      open:false,
      title:"",
      content:"",
      load:false,
    }
    this.supportTypes = Array.from(["jpeg","jpg","png","bmp"]);
  }


  private supportTypes:Array<String>;

  onError(err,response,file){
    this.setState({disabled:false,load:false});
    this.alertMsg("网络异常，请稍后重试");
  }

  onSuccess(response,file){
    this.setState({disabled:false,load:false});
    let {code} = response;
    if(_.isEqual(code,200)){
      this.props.onUploadSuccess(response.msg.picUrl);
      this.alertMsg("上传成功");
    } else {
      this.alertMsg("上传失败:"+response.msg);
    }
  }

  onStart(){
    this.setState({disabled:true,load:true});
  }

  beforeUpload(file,files){
    if(file){
      // 检查moduleId和ReferencedId是否存在
      if(!this.props.moduleId || !this.props.referencedId){
        this.alertMsg("上传失败,请检查网页链接是否正确");
        return false;
      }

       // 选中文件
      let {name,size} = file;

      if(name && _.includes(name,".")){
        // name一定不空，因为accept里限定了不能没有后缀
        let typeName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
        if(_.includes(this.supportTypes,typeName)){
          // 支持的图片类型
          // 再走其他判断逻辑
        } else {
          this.alertMsg("该图片类型不支持,请转换为一下类型:"+this.supportTypes.toString());
          return false;
        }
      } else {
        this.alertMsg("该图片无法上传");
        return false;
      }

      if (size && size > 2048*1024) {
        this.alertMsg("上传的图片大小请不要超过2M");
        return false;
      }
    } else {
      this.alertMsg("请选择要上传的图片");
      return false;
    }
    // 出现异常时不要上传
    // file字段为空/name为空
    return true;
  }

  alertMsg(content,title){
      this.setState({title:title,content:content,open:true});
  }




  render(){
    const {load} = this.state;
    const handleClose = () => {
      this.setState({open:false});
    };

    return (
      <div>
        <Upload className="upload"
                action={`/file/image/upload/${this.props.moduleId}/${this.props.referencedId}`} onSuccess={(response,file)=>{this.onSuccess(response,file);}}
                onError={(err,response,file) => {this.onError(err,response,file);}}
                beforeUpload={(file,files)=>{return this.beforeUpload(file,files);}}
                onStart={(file)=>{this.onStart(file);}}
                accept="image/jpeg,image/jpg,image/png,image/bmp"
                component="span"
                disabled={this.state.disabled}
                style={{float:"left"}}
        >
            <FlatButton
              style={{border:"1px solid #55cbcb",borderRadius:"4px",width:"120px",height:"42px",margin:"0 90px"}}
              labelStyle={{color:"#55cbcb"}}
              label="上传图片"/>
        </Upload>
        <AlertMessage title={this.state.title} content={this.state.content} open={this.state.open} handleClose={()=>handleClose(this)}/>
        {load?<Loader/>:null}
      </div>
    )
  }

}
