const asyncActionHelper = (actionName) =>
    typeof actionName !== "string"
        ? new Error("Please provide a string to actionName!")
        : {
            actions: {
                INITIALIZED: `${actionName}_INITIALIZED`,
                STARTED: `${actionName}_STARTED`,
                FETCHING: `${actionName}_FETCHING`,
                SUCCEEDED: `${actionName}_SUCCEEDED`,
                FAILED: `${actionName}_FAILED`,
            },
            dispatchers: {
                started: (payload)=>({type:`${actionName}_STARTED`, payload:payload}),
                succeeded: (payload) => ({ type: `${actionName}_SUCCEEDED`, payload: payload }),
                failed: (error) => ({ type: `${actionName}_FAILED`, payload: error }),
            },
};

export const MESSAGE_REQUEST = asyncActionHelper('MESSAGE_REQUEST')

export const INIT = asyncActionHelper('INIT')

export const AUTH = asyncActionHelper('AUTH')

export const ADD_USER ="ADD_USER"

export const UPDATE_ONLINE_USERS =asyncActionHelper("UPDATE_ONLINE_USERS")

export const SPECIAL_ACTION = asyncActionHelper("SPECIAL_ACTION")