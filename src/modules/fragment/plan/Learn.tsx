



const typeMap = {
  1: '巩固练习',
  2: '巩固练习',
  11: '应用练习',
  12: '综合练习',
  21: '小目标',
  31: '知识理解',
  32: '知识回顾',
}

@connect(state => state)
export class PlanMain extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      planData: {},
      knowledge: {},
      showScoreModal: false,
      showCompleteModal: false,
      showConfirmModal: false,
      showDoneAll: false,
      currentIndex: 0,
      showProblem: false,
      selectProblem: {},
      defeatPercent: 0,
      expired: false,
      questionList: [
        {
          id: 1,
          subject: "你已完成了本小课的训练<br/>对本小课的学习难度打个分吧",
          choiceList: [
            {
              id: 5,
              subject: "非常难"
            }, {
              id: 4,
              subject: "比较难"
            }, {
              id: 3,
              subject: "适中"
            }, {
              id: 2,
              subject: "较简单"
            }, {
              id: 1,
              subject: "很简单"
            }
          ]
        },
        {
          id: 2,
          subject: "本小课的训练对工作/生活有用吗？",
          choiceList: [
            {
              id: 5,
              subject: "非常实用，大部分能马上应用"
            }, {
              id: 4,
              subject: "较为实用，不少能实际应用"
            }, {
              id: 3,
              subject: "实用性一般，要找找应用场景"
            }, {
              id: 2,
              subject: "不太实用，偶尔能用上"
            }, {
              id: 1,
              subject: "大部分不能应用"
            }
          ]
        }
      ],
      showedPayTip: false,
      // nextSeriesModal: {
      //   buttons: [
      //     {label: '我不听', onClick: () => this.next(true)},
      //     {label: '做本节练习', onClick: () => this.setState({showNextSeriesModal: false})}
      //   ],
      // },
      nextModal: {
        buttons: [
          {label: '我不听', onClick: () => this.confirmComplete(true)},
          {label: '好的', onClick: () => this.setState({showWarningModal: false})}
        ],
      },

      sidebarOpen: false,
      showEmptyPage: false,
    }

    changeTitle('RISE');
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

}
