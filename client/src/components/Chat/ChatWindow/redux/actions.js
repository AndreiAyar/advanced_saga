import {MESSAGE_REQUEST} from "../../../../store/types";


export const sendMessage =(message) => {

    return MESSAGE_REQUEST.dispatchers.started(message)
}