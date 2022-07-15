import rootReducer from "./reducers/index"

import { legacy_createStore as createStore } from "redux"

let store = createStore(rootReducer)


export default store;