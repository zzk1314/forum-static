import * as React from 'react';
import { merge } from 'lodash';

export default class AssetImg extends React.Component<any, any> {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
    };

  }

  sizeCheck (size) {
    if (size) {
      if (size.toString().indexOf('px') !== -1 || size.toString().indexOf('%') !== -1) {
        return size;
      } else {
        return `${size}px`;
      }
    } else {
      return size;
    }
  }

  render () {
    const { size, type, width, height, marginTop, style, marginRight, onClick, marginLeft, marginBottom } = this.props;
    let { url } = this.props;
    //来自七牛云的图片，自动添加瘦身参数
    if (url) {
      if (url.indexOf('static.iqycamp.com') != -1 && url.indexOf('imageslim') != -1) {
        url = url + '?imageslim';
      }
    }
    const { loading } = this.state;
    const _style = {
      width: this.sizeCheck(size || width),
      height: this.sizeCheck(size || height),
      marginTop: this.sizeCheck(marginTop),
      marginRight: this.sizeCheck(marginRight),
      marginBottom: this.sizeCheck(marginBottom),
      marginLeft: this.sizeCheck(marginLeft),
    };

    return (
      <img className={`${loading ? 'loading' : ''} ${this.props.className ? this.props.className : ''}`}
           src={type ? require(`./../../assets/img/${type}.png`) : url}
           onClick={() => onClick()}
           onLoad={() => this.setState({ loading: false })}
           style={merge(_style, style)}/>
    );
  }
}
