import * as React from "react"
import {connect} from "react-redux"
import { Grid,Row,Col } from "react-flexbox-grid"

@connect(state => state)
export default class extends React.Component<any,any>{

  render(){
    return (
        <Grid >
          <Row center="xs">
            <Col xsOffset={1} xs={3}>

            </Col>
          </Row>
        </Grid>
    )
  }
}
