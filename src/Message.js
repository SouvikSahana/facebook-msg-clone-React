import { Card, CardContent, Typography } from '@mui/material'
import React, {forwardRef} from 'react'
import './Message.css'

const Message = forwardRef(({msg,username},ref) => {
  const isUser=username === msg.username;
  let time= new Date((msg.timestamp?.seconds+19800)*1000).toUTCString()
const length=time?.length;
time=time?.substr(length-12,5);

  return (
      <Card ref={ref} className={`message ${isUser && 'message_user'}`}>
        <CardContent className='msg_first'>
          <Typography
          color="black"
          variant='h5'
          component="h1"
           className='msg_font'>
            <p className='user_name'>{!isUser && `${msg.username || 'Unknown User'}`}</p>
            {msg.message}
            <span className='time'>{time}</span>
          </Typography>
        </CardContent>
      </Card>
  )
})

export default Message