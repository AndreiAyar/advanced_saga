import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer.js";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
const sagaMiddleware = createSagaMiddleware();

const initialState = {
    messages:[],
    specialTrigger:false,
    user:[],
    onlineUsers:[]
};

const middlewares = [sagaMiddleware];

const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
//Depr. To review.
const store = createStore(rootReducer, initialState, composedEnhancer);

sagaMiddleware.run(rootSaga);
export default store;
