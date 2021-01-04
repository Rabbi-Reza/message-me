import { Card, CardContent, Typography } from '@material-ui/core';
import React, { forwardRef } from 'react';
import './Message.css';
import Box from '@material-ui/core/Box';

const Message = forwardRef(({message, username}, ref ) => {
    const isUser = username === message.username;
    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Typography style={{color:'blue'}}>
            <Box textAlign="left">
            {!isUser && `${message.username || 'Unknown User'}`}
            </Box>
            </Typography>
            <Card className={ isUser ? "message__userCard" : "message__guestCard"}>
                <CardContent>
                    <Typography
                    color='white'
                    variant='h5'
                    component='h5'
                    >
                        <Box fontWeight="fontWeightLight"textAlign="left">{message.message}</Box>
                        
                    </Typography>
                </CardContent>
            </Card>
        </div>
            
    )
})

export default Message
