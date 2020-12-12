import React, {useRef, useEffect} from 'react';
import {Container} from './ChatWindow.style'
import {useDispatch, useSelector} from "react-redux";

const ChatWindow = () => {
    const {messages} = useSelector(state=> state)
    const {user} = useSelector (state=>state)
    console.log(messages)
    const myRef = useRef(null)
    //const executeScroll = () => myRef.current.scrollIntoView()
    useEffect(()=>{
       myRef && myRef.current && myRef.current.scrollIntoView()
    },[messages])
    return(
    <Container>
        {messages.map(({id, username, message})=> {

            return  <li ref={myRef} style={{ listStyleType: 'none'}}>  <span style={{fontWeight:700,color:`${user[0].id === id ? 'grey' :'blue'}`}}>{username}</span>: <span style={{fontWeight:message==="BUZZ!!!!" ? '700' :'400',color:`${message==="BUZZ!!!!" ? 'red' :'black'}`}}>{message}</span></li>
        })}

    </Container>
    )
}



export default ChatWindow;