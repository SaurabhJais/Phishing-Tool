import { combineReducers } from "redux"

import {isLoggedIn, userDetails} from "./auth_reducers"


const rootReducer = combineReducers({
    isLoggedIn, userDetails
})


export default rootReducer;