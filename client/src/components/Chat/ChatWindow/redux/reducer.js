import {ADD_USER, MESSAGE_REQUEST, SPECIAL_ACTION} from "../../../../store/types";

export const messagesReducer = (state = [], action) => {
    switch (action.type) {
        case MESSAGE_REQUEST.actions.STARTED:
            return state
        case MESSAGE_REQUEST.actions.SUCCEEDED:
            let newState = [...state]
            newState.push({
                username:action.payload.username,
                message:action.payload.message,
                id:action.payload.id,
            })
            return newState
        default:
            return state
    }

}

export const userReducer = (state =[], action) =>{
    switch (action.type) {
        case ADD_USER:
            let newState = [...state]
            newState.push({
                id:action.payload
            })
            return newState

        default:
            return state
    }

}