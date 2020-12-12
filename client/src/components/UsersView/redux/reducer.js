import {UPDATE_ONLINE_USERS} from "../../../store/types";

export const onlineUsersReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATE_ONLINE_USERS.actions.SUCCEEDED:
            console.log(action.payload)

            return action.payload
        default:
            return state
    }

}