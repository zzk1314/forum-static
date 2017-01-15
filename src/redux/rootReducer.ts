import ReducerFactory from "./ReducerFactory"

export default new ReducerFactory()
	.setInitialState({
		base: {
		  showModal:false,
		  alertMsg:{}
		},
	})
	.getReducer()
