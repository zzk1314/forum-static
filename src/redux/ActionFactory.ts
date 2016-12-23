import { ActionMap } from "./Const"
import _ from "lodash"

export interface IActionFactoryObj {
	[actionType: string]: Function
}

export interface IAction {
	actionType: string,
	actionCreator: Function
}

function identity(t?) {
	return t
}

function createAction(name, actionCreator) {
	const finalActionCreator = typeof actionCreator === "function"
		? actionCreator
		: identity

	function action(...args) {
		return {
			type: name,
			payload: finalActionCreator(...args),
		}
	}

	return action
}

export default class ActionFactory {
	protected actions: any = {}

	constructor() {
		this.setActions({
			set: (path, value) => ({ path, value }),
			push: (path, value) => ({ path, value }),
			splice: (path, value) => ({ path, value }),
			start: (path) => ({ path }),
			end: (path) => ({ path }),
			open: (path) => ({ path }),
			close: (path) => ({ path }),
			startLoad: (path) => ({ path }),
			endLoad: (path) => ({ path }),
			alertMsg: (msg) => ({ msg })
		})
	}

	private setActions(actionFactoryList: IActionFactoryObj) {
		this.actions = _.reduce<IActionFactoryObj, IAction>(actionFactoryList, (result, value, key) => {
			result[key] = createAction(ActionMap[key], value)
			return result
		}, this.actions)
		return this
	}

	public getActions(): {
		set: Function,
		push: Function,
		splice: Function,
		start: Function,
		end: Function,
		open: Function,
		close: Function,
		startLoad: Function,
		endLoad: Function,
		alertMsg: Function
	} {
		return this.actions
	}
}
