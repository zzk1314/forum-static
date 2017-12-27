import * as React from "react";
import "./ModuleHeader.less";

 interface ModuleHeaderProps {
  content: string
}
interface ModuleHeaderStates {

}
export default class ModuleHeader extends React.Component<ModuleHeaderProps, ModuleHeaderStates> {

  constructor() {
    super()
  }

  render() {

    const { content } = this.props

    return (
      <div className="module-header">{content}</div>
    )
  }

}
