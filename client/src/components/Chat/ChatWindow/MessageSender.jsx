import React, {useState} from 'react';
import {Container, TextArea} from './MessageSender.style'
import {useDispatch} from "react-redux";
import {sendMessage} from "./redux/actions";

const MessageSender = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('')
    const handleSubmit = () => {
        console.log(message.split(" ").join("").length)
        message.split(" ").join("").length > 0  && dispatch(sendMessage(message))
        setMessage('')

    }
    return (
        <Container>
            <TextArea onKeyPress={(e) => {
                if (e.charCode === 13) {
                    handleSubmit()
                    e.preventDefault();
                    e.stopPropagation();
                }
            }} value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={((e) => handleSubmit(e))}>Send</button>
        </Container>
    )
}

export default MessageSender;