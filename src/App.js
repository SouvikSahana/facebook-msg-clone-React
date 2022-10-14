import { Button, FormControl, Input, InputLabel,IconButton } from '@mui/material';
import { useEffect, useState ,createRef} from 'react';
import './App.css';
import { db } from './firebase';
import Message from './Message';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import FlipMove from 'react-flip-move';
import {AiOutlineSend} from 'react-icons/ai'

function App() {
  const [input,setInput]=useState("");
  const [msg,setMsg]=useState([]);
  const [username,setUsername]=useState('');


  const messagesEndRef =createRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [msg]);

  

  useEffect(()=>{
db.collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>{
  setMsg(snapshot.docs.map(doc=> {return ({id:doc.id ,data:doc.data()})}))
})
  },[])

  useEffect(()=>{
    if(localStorage.getItem('username')){
      setUsername(localStorage.getItem('username'))
    }else{
      setUsername(prompt("Please enter your name"))
    }

  },[])



  useEffect(()=>{
    localStorage.setItem('username',username)
  },[username])

  const sendMessage=(e)=>{
    e.preventDefault()
    db.collection('messages').add({
      username:username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setMsg([...msg,{username:username,text:input}]);
    setInput("")
  }
  return (
    <div className="App">
      <form  className='form_app'>
        <FormControl className='app_control'>
          <Input value={input} placeholder="Send a message" onChange={e=>setInput(e.target.value)} className="input_btn" multiline/>
      <IconButton onClick={sendMessage} type='submit'  variant='contained' disabled={!input} className="btn" >
        <AiOutlineSend />
      </IconButton>
        </FormControl>
       </form>

       
       <FlipMove>
      {
        msg.map(({id,data})=>{
          return <Message msg={data} username={username} key={id}/>
        })
      }
 </FlipMove>
        
 <div ref={messagesEndRef} />
    </div>
  );
}

export default App;
 