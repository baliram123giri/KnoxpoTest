import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk"
// import logger from "redux-logger"
import { rootReducer } from "./RootReducer";

const middleware = [reduxThunk]
// if(process.env.NODE_ENV === "development"){
//     middleware.push(logger)
// }

//create the stor
export const store = createStore(rootReducer, applyMiddleware(...middleware))