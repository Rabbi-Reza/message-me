import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import ChatIcon from '@material-ui/icons/Chat';
import { IconButton } from '@material-ui/core';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  // useState = variable in REACT
  // useEffect = run code on a condition

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc') // asc = ascending
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    });
  }, [])


  useEffect(() => {
    // const username = prompt('Please Enter Your Name : ');
    setUsername(prompt('Please Enter Your Name : '));
    // run code here
    // if its blank inside [], this code runs ONCE when the app component loads.
    // if we have a vriable like input, it runs every time input changes.
  }, []) //condition 

  const sendMessage = (event) => {
    event.preventDefault();
    // All the logic to send message goes here
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setMessages([...messages, {username: username, text: input }]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>Welcome</h1>
      <img height="200px" src="https://lh3.googleusercontent.com/proxy/JexBVfDG_WkBLTR3GmSnJQERfoICV2N57W0Xs7lTOeJFb5vcOCZ8BafiTpEGqvWJXtWN3Rwz0ez7xD4rIJl_LZIaBeOccNabuLAoPcqU_2i3LuiUbnhAK4iP827aYj9txDiXM9KdZqMSKg8" alt="main_icon"/>
      {/* <img height="200px" src="https://i.pinimg.com/originals/47/74/fd/4774fd9d0de2aa43fe15e6b24876978c.png" alt="main_icon"/> */}
      
      <h2>Hello, {username}</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)}/>
            <IconButton
            className="app__iconButton"
            disabled={!input} 
            variant="contained" 
            color="primary" 
            type='submit' 
            onClick={sendMessage}
            >
              <ChatIcon/>
            </IconButton>  
        </FormControl>
      </form>

      <FlipMove>
      {
        messages.map(({id, message}) => (
          <Message key={id}  username={username} message={message}/>
        ))
      }
      </FlipMove>

    </div>
  );
}

export default App;
