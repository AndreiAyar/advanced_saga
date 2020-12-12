import {combineReducers} from 'redux'
import {messagesReducer, userReducer} from "../components/Chat/ChatWindow/redux/reducer";
import {specialTriggerReducer} from '../components/Chat/ChatWrapper/redux/reducer';
import {onlineUsersReducer} from "../components/UsersView/redux/reducer";

const rootReducer = combineReducers({
        messages: messagesReducer,
        user:userReducer,
        specialTrigger:specialTriggerReducer,
        onlineUsers: onlineUsersReducer
})

export default rootReducer;