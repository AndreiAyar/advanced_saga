import {all} from 'redux-saga/effects'
import messagesSaga from '../components/Chat/ChatWindow/redux/saga'
import specialTriggerSaga from '../components/Chat/ChatWrapper/redux/saga'

export default function* rootSaga() {
    yield all([
        messagesSaga(),
        specialTriggerSaga()
    ])
}