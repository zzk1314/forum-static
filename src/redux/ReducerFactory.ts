import { SET, CLOSE, OPEN, END, START, SPLICE, PUSH, START_LOAD, END_LOAD, ALERT_MSG } from "./Const"
import update from "./update"
import _ from "lodash"

interface IAction {
	payload: {
		path: string | Array,
		value: any
	}
}

export default class ReducerFactory {

	constructor() {
		this.setHandlers({
			[SET]: (state, action: IAction) => {
				return _.set(_.merge({}, state), action.payload.path, action.payload.value)
			},
			[PUSH]: (state, action: IAction) => {
				let updateObj = _.set({}, action.payload.path, { $push: action.payload.value });
				return update(state, updateObj);
			},
			[SPLICE]: (state, action) => {
				let updateObj = _.set({}, action.payload.path, { $splice: action.payload.value });
				return update(state, updateObj);
			},
			[START]: (state, action) => {
				return _.set(_.merge({}, state), ["$view", "$pending", action.payload.path], true)
			},
			[END]: (state, action) => {
				return _.set(_.merge({}, state), ["$view", "$pending", action.payload.path], false)
			},
			[OPEN]: (state, action) => {
				return _.set(_.merge({}, state), ["$view", "$show", action.payload.path], true)
			},
			[CLOSE]: (state, action) => {
				return _.set(_.merge({}, state), ["$view", "$show", action.payload.path], false)
			},
			[START_LOAD]: (state, action) => {
				return _.set(_.merge({}, state), ["$view", "$pending", "base.loading"], true)
			},
			[END_LOAD]: (state, action) => {
				return _.set(_.merge({}, state), ["$view", "$pending", "base.loading"], false)
			},
			[ALERT_MSG]: (state, action) => {
				console.log(1)
				const temp_state = _.set(_.merge({}, state), ["base", "showModal"], true)
				console.log(temp_state)
				return _.set(_.merge({}, temp_state), ["base", "alertMsg"], action.payload.msg)
			}
		})
	}

	protected handlers: any = {}
	protected initialState: any = {}

	private setHandlers(handlers) {
		this.handlers = _.assign(this.handlers, handlers)
		return this
	}

	public setInitialState(initialState: Object) {
		this.initialState = _.assign({}, this.initialState, initialState)
		return this
	}

	public getReducer() {
		return (state, action) => {
			if (_.isEmpty(state)) {
				state = this.initialState
			}

			if (this.handlers.hasOwnProperty(action.type)) {
				return this.handlers[action.type](state, action)
			}
			return state
		}
	}

}
