import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    contador: counterReducer,
    logeo: loggedReducer
})

export default allReducers;