import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Container, Header, Navigation, UserInfo, UtilsArea} from './ChatWrapper.style'
import {INIT, AUTH} from "../../../store/types";
import {sendMessage} from "../ChatWindow/redux/actions";

import ChatWindow from "../ChatWindow/ChatWindow";
import MessageSender from '../ChatWindow/MessageSender'

import flames from '../../../assets/flames.png'
import game from '../../../assets/game.png'
import mic from '../../../assets/mic.png'
import webcam from '../../../assets/webcam.png'
import happy from '../../../assets/happy.gif'
import im from '../../../assets/im.png'
import frame from '../../../assets/frame.png'
import attach from '../../../assets/attach.png'
import deny from '../../../assets/deny.png'
import allow from '../../../assets/allow.png'
import text from '../../../assets/text.png'
import buzz from '../../../assets/buzz.png'
import buzzSound from '../../../assets/buzz_sound.mp3'


let INITIAL_POS = {x: 0, y: 0}
let offset = [0, 0]
let isBuzzing = true;

const ChatWrapper = () => {
    const {user} = useSelector(state=>state)
    const {onlineUsers} = useSelector(state=>state)
    console.log(user)
    const [state, setState] = useState({
        isDragging: false,
        translation: INITIAL_POS,
        origin: INITIAL_POS,
        timesRun: 0
    })
    const useBuzz = () => {
        const [timesRun, setTimesRun] = useState(0)
        const [init, setInit] = useState(false)
        const [initialPos, setInitialPos] = useState(state.translation)

        const startBuzz = () => {
            if (isBuzzing) {

                setInitialPos(state.translation)
                setTimesRun(1)
                setInit(true);
                isBuzzing = false
                var audio = new Audio(buzzSound);
                setTimeout(() => {

                    audio.play();


                    audio.loop = false;


                }, 100)
            }
        }

        function isOdd(num) {
            return num % 2;
        }

        useEffect(() => {
            if (init) {
                const interval = setInterval(() => {
                    setTimesRun(timesRun => timesRun + 1);
                    setState(state => ({
                        ...state,
                        translation: {
                            x: state.translation.x + 100 * (isOdd(timesRun) ? +timesRun : -timesRun),
                            y: state.translation.y + 5 * (isOdd(timesRun) ? +timesRun : -timesRun)
                        },

                    }))
                    console.log(timesRun)
                    if (timesRun >= 6) {
                        clearInterval(interval)
                        setInit(false);
                        setState(state => ({
                            ...state,
                            translation: initialPos

                        }))
                        setTimeout(() => {
                            isBuzzing = true;
                        }, 2000)
                    }
                }, 50);
                return () => clearInterval(interval);
            }

        }, [init, timesRun])

        return {startBuzz}
    }
    useEffect(() => {
        const translation = {x: 100, y: 100}
        setState(state => ({
            ...state,
            translation
        }))
        dispatch({type: INIT.actions.SUCCEEDED})
        dispatch({type: AUTH.actions.SUCCEEDED})
    }, [])
    const handleMouseDown = useCallback(({target, clientX, clientY}) => {
        setState(state => ({
            ...state,
            isDragging: true,
        }))
        offset = [
            target.getBoundingClientRect().x - clientX,
            target.getBoundingClientRect().y - clientY
        ];

    }, [])
    const handleMouseUp = useCallback(() => {
        setState(state => ({
            ...state,
            isDragging: false,

        }))

    }, [])
    ondragend = function () {
        console.log('gata')
    };
    const handleMouseMove = useCallback(({clientX, clientY}) => {
        const translation = {x: clientX - state.origin.x + offset[0], y: clientY - state.origin.y + offset[1]}
        setState(state => ({
            ...state,
            translation
        }))
    }, [state.origin])
    useEffect(() => {
        if (state.isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        } else {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [state.isDragging]);

    const styles = useMemo(() => ({
        transform: `translate(${state.translation.x}px, ${state.translation.y}px`,
        transition: state.isDragging ? 'none' : 'transform 500ms',
        zIndex: state.isDragging ? 2 : 1,
        position: state.isDragging ? 'absolute' : 'absolute'
    }), [state.isDragging, state.translation])
    const {startBuzz} = useBuzz();
    const dispatch = useDispatch()
    const {specialTrigger} = useSelector(state => state)
    const dispatchBuzz = () => {
        if (isBuzzing) {
            dispatch(sendMessage('BUZZ!!!!'))
        }


    }
    useEffect(() => {
        specialTrigger && startBuzz()
    }, [specialTrigger])
    console.log('b', onlineUsers)

    return (
        <Container style={{...styles}}>
            <Header bg={flames} isDragging={state.isDragging} onMouseDown={handleMouseDown}>{onlineUsers.users  && onlineUsers.users.map(({username, id})=> user[0].id === id && <p style={{color:'white',fontWeight:'700',position:'absolute',paddingLeft:'10px',paddingTop:'10px',margin:0}}>Your name: {username}</p>)}<span>    </span></Header>
            <Navigation>
                <div className="primary-nav">
                    <ul>
                        <li>File</li>
                        <li>Options</li>
                        <li>Account</li>
                        <li>More</li>
                    </ul>
                </div>
                <div className="secondary-nav">
                    <ul>
                        <li><img src={webcam}/>Video Call</li>
                        <li><img src={mic}/>Voice Call</li>
                        <div className="secondary-nav_right">
                            <li><img className='right-nav' src={game}/>Activities</li>
                            <li><img className='right-nav' src={im}/>IMViorments</li>
                            <li><img className='right-nav' src={frame}/>Photos</li>
                        </div>

                    </ul>
                </div>
            </Navigation>
            <UserInfo>
                <Avatar>
                    <div  className="recipient">

                    </div>
                    <div   className="sender">

                    </div>
                </Avatar>
            </UserInfo>
            <ChatWindow/>
            <UtilsArea>
                <ul>
                    <li>
                        <img src={happy}/>
                    </li>
                    <li onClick={() => dispatchBuzz()}>
                        <img src={buzz}/>
                    </li>
                    <li>
                        <img src={text}/>
                    </li>
                    <li>
                        <img src={attach}/>
                    </li>
                    <li onClick={()=>dispatch({type:"IGNORE_MODE_ON"})}>
                        <img src={deny}/>
                    </li>
                    <li onClick={()=>dispatch({type:"IGNORE_MODE_OFF"})}>
                        <img src={allow}/>
                    </li>
                </ul>
            </UtilsArea>
            <MessageSender/>
        </Container>
    )
}
export default ChatWrapper;