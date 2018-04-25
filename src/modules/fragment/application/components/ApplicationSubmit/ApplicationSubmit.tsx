/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：forum-static
 2. 文件功能：应用题编辑区提交组件
 3. 作者： duanxianfeng@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react';
import './ApplicationSubmit.less';
import { autoSaveApplicationDraft, loadApplicationPractice, submitApplicationPractice } from '../../async';
import requestProxy from '../../../../../components/proxy/requestProxy';
import Editor from '../../../../../components/editor/Editor';

const APPLICATION_AUTO_SAVING = 'rise_application_autosaving';

export default class ApplicationSubmit extends React.Component {

  autoSaveTimer = null;

  constructor () {
    super();
    this.state = {
      value: '',
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  async componentDidMount () {
    const { id, planId } = this.props;
    let res = await loadApplicationPractice(id, planId);
    const { msg } = res;
    let storageDraft = JSON.parse(window.localStorage.getItem(APPLICATION_AUTO_SAVING));
    if (storageDraft && storageDraft.id === id) {
      if (res.msg.overrideLocalStorage || res.msg.isSynchronized) {
        this.setState({
          value: res.msg.isSynchronized ? res.msg.content : res.msg.draft,
        }, () => {
          this.autoSaveApplicationDraft();
        });
      } else {
        this.setState({
          value: storageDraft.content,
        }, () => {
          this.autoSaveApplicationDraft();
        });
      }
    } else {
      this.setState({
        value: res.msg.isSynchronized ? res.msg.content : res.msg.draft,
      }, () => {
        this.autoSaveApplicationDraft();
      });
    }
  }

  componentWillUnmount () {
    clearInterval(this.autoSaveTimer);
  }

  // 开启自动保存草稿的功能
  autoSaveApplicationDraft () {
    clearInterval(this.autoSaveTimer);
    const { id, planId } = this.props;
    this.autoSaveTimer = setInterval(() => {
      if (this.refs.editor) {
        let draft = this.refs.editor.getValue();
        if (draft.trim().length > 0) {
          autoSaveApplicationDraft(planId, id, draft);
        }
      }
    }, 10000);
  }

  // 自动保存
  autoSave () {
    if (this.refs.editor) {
      let value = this.refs.editor.getValue();
      if (value) {
        window.localStorage.setItem(APPLICATION_AUTO_SAVING, JSON.stringify({
          id: this.props, content: value,
        }));
      }
    }
  }

  clearStorage () {
    window.localStorage.removeItem(APPLICATION_AUTO_SAVING);
  }

  // 点击提交应用题内容
  async handleSubmitApplicationSubmit () {
    const {
      hideCallback = () => {
      },
      submitCallback = () => {
      },
    } = this.props;
    const value = this.refs.editor.getValue();
    if (!value || value.length === 0) {
      requestProxy.alertMessage('请填写作业');
      return;
    } else {
      const { id, planId } = this.props;
      let res = await submitApplicationPractice(planId, id, { answer: value });
      if (res.code === 200) {
        this.clearStorage();
        hideCallback();
        submitCallback();
      }
    }
  }

  render () {
    const {
      id,
      planId,
      hideCallback = () => {
      },
      submitCallback = () => {
      },
    } = this.props;
    const { value } = this.state;

    return (
      <div className="application-submit-component">
        <div className="editor-box">
          <Editor ref="editor"
                  className="editor"
                  moduleId="6"
                  toolbarFloat={false}
                  value={value}
                  autoSave={() => this.autoSave()}
                  placeholder="有灵感时马上记录在这里吧，系统会自动为你保存。完成后点上方按钮提交，就会得到点赞和专业点评哦！"/>
          <div className="footerbutton">
            <div className="pc-submit"
                 onClick={() => this.handleSubmitApplicationSubmit()}>提交
            </div>
          </div>
        </div>
      </div>
    );
  }

}
