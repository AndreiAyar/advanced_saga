import {ADD_USER, MESSAGE_REQUEST, SPECIAL_ACTION} from "../../../../store/types";

export const specialTriggerReducer = (state = false, action) => {
    switch (action.type) {
        case SPECIAL_ACTION.actions.STARTED:
            return true
        case SPECIAL_ACTION.actions.SUCCEEDED:
            return false
        default:
            return state
    }

}
