import {actionChannel, race,call, cancel, delay, fork, put, take, takeLatest} from 'redux-saga/effects';
import {buffers, channel, eventChannel} from 'redux-saga'

import io from 'socket.io-client';
import Chance from 'chance'
import {ADD_USER, AUTH, INIT, MESSAGE_REQUEST, UPDATE_ONLINE_USERS} from "../../../../store/types";
import {sendSpecialTrigger} from "../../ChatWrapper/redux/actions";

const chance = new Chance()
const URL = 'http://homesev.tplinkdns.com:4001/'//'http://localhost:4001';


export let socket;

export function connect() {
    socket = io(URL);
    return new Promise((resolve) => {
        socket.on('connect', () => {
            socket.emit('add user', chance.first()) //Adding a random username
            resolve(socket);
        });
    })
}

const chatInstance = socket => eventChannel(emit => {
    const incomingMessageHandler = message => {
        emit(MESSAGE_REQUEST.dispatchers.succeeded(message))
    }
     const incomingUsersHandler = user => {
        emit(UPDATE_ONLINE_USERS.dispatchers.succeeded(user))
}
    socket.on('pull:message', incomingMessageHandler)
    socket.on('pull:users', incomingUsersHandler)
    return () => socket.emit('disconnect')
}, buffers.expanding()); //buffers.expanding()



function* worker(channel) {
    while (true) {
        const action = yield take(channel)// a new task
        if(action.payload.message === ":emoji:"){
           yield delay(5500)// We fetch an expensive API....
        }
        if(action.payload.message === "BUZZ!!!!"){
            yield put(sendSpecialTrigger())
        }
         //{type:"MESSAGE_REQUEST_SUCCEEDED" payload: {username: "Francisco", message: "Hi everyone!", id: "WAnCyI32IsUwnp_MAABR"}
         yield put(action)
    }
}

export function* readMessages(socket) {
    const queueChannel = yield call(chatInstance, socket)
    const workerChannel = yield call(channel, buffers.expanding())
    for (let i = 0; i < 3; i++) {
        yield fork(worker, workerChannel)
    }
    while (true) {
        let queueData = yield take(queueChannel); // in our case the action and the payload
        console.log(queueData)
        //yield delay(2000)
        yield put(workerChannel, queueData);// now, one of the available workers will take the task and display the message
    }

}

function* socketEmit(type, payload) {
    yield delay(1500)
    socket.emit(type, payload)
}

export function* writeMessage() {


            const requestChan = yield actionChannel(MESSAGE_REQUEST.actions.STARTED)
            while (true) {
                const {payload} = yield take(requestChan) //take(MESSAGE_REQUEST.actions.STARTED) or take(requestChan)
                yield call(socketEmit, 'new message', payload)
            }





}
export function* processHandler (readProcess) {

    while(true){
        const {restartTask, cancelTask } = yield race({
            restartTask: take("IGNORE_MODE_OFF"),
            cancelTask: take("IGNORE_MODE_ON")
        })
        if(cancelTask){
            yield cancel(readProcess)
        }
        if(restartTask){
            yield cancel(readProcess);
            if(readProcess.isCancelled()){
                console.log('Restarted')
                readProcess = yield fork(readMessages,socket)
            }
        }
    }
}

    export function* main() {
        yield take(AUTH.actions.SUCCEEDED)
        const socket = yield call(connect)
        yield put({type:ADD_USER, payload:socket.id})
        yield fork(readMessages, socket)
        yield fork(writeMessage, socket)

    }


export default function* saga() {
    yield takeLatest(INIT.actions.SUCCEEDED, main)
}