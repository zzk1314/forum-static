import * as React from "react"
import { loadApplicationProblems } from "../../../asst/async";

export default class ApplicationProblemCategory extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      category: [],
    }
  }

  componentWillMount() {
    loadApplicationProblems().then(res => {
      this.setState({category: res.msg})
    }).catch(e => {
      console.error(e)
    })
  }

  onClickProblemCategory(problemId) {
    console.log("category", problemId)
    this.context.router.push({
      pathname: "/backend/application/edit/list",
      query: {problemId: problemId}
    })
  }

  renderCategory(category) {
    return (
      <div>
        {category.map(item =>
          <div key={item.name}>
            <h5>{item.name}</h5>
            {this.renderProblems(item.problems)}
          </div>
        )}
      </div>
    )
  }

  renderProblems(problems) {
    return (
      problems.map(item =>
        <h5 key={item.problem} onClick={this.onClickProblemCategory.bind(this, item.id)}>{item.problem}</h5>
      )
    )
  }

  render() {
    return (
      <div>
        {this.renderCategory(this.state.category)}
      </div>
    )
  }

}


