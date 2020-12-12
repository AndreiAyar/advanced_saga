import { put, delay,takeLatest} from 'redux-saga/effects';
import {SPECIAL_ACTION} from "../../../../store/types";

function* specialActionSaga (){

        yield put({type:SPECIAL_ACTION.actions.SUCCEEDED})
}
export default function* saga() {
    yield takeLatest(SPECIAL_ACTION.actions.STARTED, specialActionSaga)
}