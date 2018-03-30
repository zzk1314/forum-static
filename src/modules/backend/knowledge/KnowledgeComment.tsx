import * as React from 'react'
import { RaisedButton, SelectField, MenuItem } from 'material-ui'
import { ProblemSelector } from '../import/component/ProblemSelector'
import { queryKnowledgeDiscuss, queryProblemKnowledges } from './async'
import KnowledgeComments from './components/KnowledgeComments'

export default class KnowledgeComment extends React.Component {

  constructor () {
    super()
    this.state = {
      knowledges: [],
      selectKnowledgeId: -1,
      discusses: [],
    }
  }

  handleSelectProblem (problemId) {
    this.setState({
      selectProblemId: problemId,
      selectKnowledgeId: -1,
    }, () => {
      this.loadKnowledges(problemId)
    })
  }

  async loadKnowledges (problemId) {
    let res = await queryProblemKnowledges(problemId)
    if (res.code === 200) {
      this.setState({ knowledges: res.msg })
    }
  }

  async loadKnowledgeDiscuss (knowledgeId) {
    if (knowledgeId == -1) return
    let res = await queryKnowledgeDiscuss(knowledgeId)
    if (res.code === 200) {
      this.setState({ discusses: res.msg })
    }
  }

  render () {
    const {
      knowledges,
      selectKnowledgeId,
      discusses,
    } = this.state

    return (
      <div style={{ padding: '50px 80px' }}>
        <ProblemSelector ref={'problemSelector'}
                         select={(problemId) => this.handleSelectProblem(problemId)}></ProblemSelector>

        <SelectField floatingLabelText="选择知识点"
                     value={selectKnowledgeId}
                     onChange={(event, index, value) => this.setState({ selectKnowledgeId: value })}>
          {
            knowledges.map((knowledge) => {
              return <MenuItem key={knowledge.id} value={knowledge.id} primaryText={knowledge.knowledge}/>
            })
          }
        </SelectField>
        <br/><br/>
        <RaisedButton label={'查询知识点评论'}
                      primary={true}
                      onClick={() => this.loadKnowledgeDiscuss(selectKnowledgeId)}></RaisedButton>
        <br/><br/>
        <KnowledgeComments data={discusses}/>
      </div>
    )
  }

}
