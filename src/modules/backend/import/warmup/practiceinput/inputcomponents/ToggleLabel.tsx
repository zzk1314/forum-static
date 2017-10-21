import * as React from "react";
import { Toggle } from "material-ui";

export default class ToggleLabel extends React.Component<any, any> {

  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Toggle
          label="是否是单选"
        />
      </div>
    )
  }

}
