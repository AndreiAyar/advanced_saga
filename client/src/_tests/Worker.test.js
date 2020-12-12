import { cloneableGenerator, createMockTask } from '@redux-saga/testing-utils';
import {buffers,channel, eventChannel} from 'redux-saga';
import { call,take, put,fork} from "redux-saga/effects";
import {  main , connect, worker, socket, readMessages,writeMessage,processHandler } from '../store/../components/Chat/ChatWindow/redux/saga'
import { AUTH, ADD_USER } from '../store/types'

    describe("Main test", () => {
        const generator = cloneableGenerator(main)();
        const mockSocket = {
            status:200,
            id: 2,
        }
        test("Take Auth", () => {
            expect(generator.next().value).toEqual(take(AUTH.actions.SUCCEEDED));
        })
        test("Socket Connect", () => {
            expect(generator.next().value).toEqual(call(connect));
        })
        test("Add User", () => {
            expect(generator.next(mockSocket).value).toEqual(put({type:ADD_USER, payload:mockSocket.id}));
        })
        test('Fork Read Process', () => {
           expect(generator.next().value).toEqual(fork(readMessages,mockSocket));
        })
        test('Fork Write Process', () => {
            expect(generator.next().value).toEqual(fork(writeMessage,mockSocket));
        })

    })



