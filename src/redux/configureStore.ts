import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import rootReducer from "./rootReducer"
// import createLogger from "redux-logger"

declare var module

// const logger = createLogger();

export default function configureStore(initialState = {}) {
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunkMiddleware)
		)
	)

	if (module.hot) {
		module.hot.accept("./rootReducer", () => {
			const nextReducer = require("./rootReducer")
			store.replaceReducer(nextReducer)
		})
	}

	return store
}
