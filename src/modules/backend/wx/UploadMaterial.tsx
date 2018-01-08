import * as React from 'react'
import { connect } from 'react-redux'
import PicUpload from '../../../components/wx/PicUpload'
import RaisedButton from 'material-ui/RaisedButton'
import './UploadMaterial.less'

@connect(state => state)
export default class UploadMaterial extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      select: false,
      tmp: 0
    }
  }

  render() {
    const { select, tmp } = this.state
    const renderSelect = () => {

      return (
        <div>
          <RaisedButton
            label="上传永久素材" primary={true}
            style={{ marginRight: 50 }}
            onClick={() => this.setState({ tmp: 0, select: true })}
          />
          <RaisedButton
            label="上传临时素材" primary={true}
            onClick={() => this.setState({ tmp: 1, select: true })}
          />
        </div>
      )
    }
    const renderUpload = () => {
      // let uploadUrl = ''
      // if(tmp){
      //   uploadUrl = '/wx/file/tmp/upload/image'
      // }else {
      //   uploadUrl = '/wx/file/per/upload/image'
      // }
      return (
        <div>
          <PicUpload action={`/wx/file/upload/image/?tmp=${tmp}`}/>
        </div>
      )
    }

    return (
      <div className="upload-material-body-container">
        {select ? renderUpload() : renderSelect()}
      </div>
    )
  }
}
