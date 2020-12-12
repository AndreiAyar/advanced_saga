import React,{useState, useRef, useEffect} from 'react'
import {useSelector} from "react-redux";
const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

const UsersView = () => {
    const {onlineUsers} = useSelector(state=>state)
    const {user} = useSelector(state=>state)
    const [toast, setToast] = useState(false)
    const [whoExited, setWhoExited] = useState(null)
    console.log('render')
    const prevUsers = usePrevious(onlineUsers)
    // useEffect(() => {
    //
    //     if(prevUsers <= onlineUsers){
    //        console.log('fostii useri', prevUsers)
    //         console.log('actualii useri', onlineUsers)
    //         let first = prevUsers.users.map(({id})  =>  id);
    //         let second = onlineUsers.users.map(({id})  =>  id);
    //         let difference = first.filter((id)  =>  !second.includes(id));
    //         let exited = prevUsers.users.find((user) =>  user.id === difference.toString() && user.username)
    //         exited && setWhoExited(exited.username)
    //         setToast(true)
    //
    //     }
    // }, [prevUsers])
    // useEffect(()=>{
    //     console.log(whoExited)
    //     toast && setTimeout(()=>{
    //         setToast(false)
    //     },3000)
    //     return ()=>clearTimeout()
    // },[whoExited]).
    //da

    return(
        <div style={{position:'absolute', right:'300px'}}>
            {/*{toast &&<div>{whoExited}</div>}*/}
            <ul>
                {onlineUsers.users   && onlineUsers.users.map(({username, id})=>{
                   return(user[0].id !== id && <li key={id}>{username}</li> )
                })}

            </ul>

        </div>
    )
}

export default UsersView;