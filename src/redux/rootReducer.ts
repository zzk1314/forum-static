import ReducerFactory from "./ReducerFactory"

export default new ReducerFactory()
	.setInitialState({
		base: {},
	})
	.getReducer()
