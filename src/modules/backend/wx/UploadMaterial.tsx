import * as React from 'react'
import { connect } from 'react-redux'
import PicUpload from '../../../components/wx/PicUpload'
import RaisedButton from 'material-ui/RaisedButton'
import './UploadMaterial.less'
import TextField from 'material-ui/TextField'

@connect(state => state)
export default class UploadMaterial extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      media_id: '',
      remark:''
    }
  }

  showMedia(media_id) {
    this.setState({
      media_id: media_id
    })
  }

  render() {
    const { media_id,remark} = this.state
    const renderUpload = () => {
      return (
        <div className="material-upload">
          <div className="material-remark">
            <TextField
              value={remark} floatingLabelText='图片说明'
              onChange={(e, v) => this.setState({ remark: v })}
            /><br/>
          </div>
          <PicUpload action={`/wx/file/upload/image/?tmp=1&remark=${remark}`} flatLabel={`上传临时素材`}
                     showMedia={this.showMedia.bind(this)}/>
          <PicUpload action={`/wx/file/upload/image/?tmp=0&remark=${remark}`} flatLabel={`上传永久素材`}
                     showMedia={this.showMedia.bind(this)}/>
          {media_id != '' && <div className="media-id-container">{`media_id:${media_id}`}</div>}
        </div>
      )
    }

    return (
      <div className="upload-material-body-container">
        {renderUpload()}
      </div>
    )
  }
}
