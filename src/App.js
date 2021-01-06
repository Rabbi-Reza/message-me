import { FormControl, IconButton, Input } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import './App.css';
import db from './firebase';
import Message from './Message';

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
      <img height="200px" src="https://firebasestorage.googleapis.com/v0/b/message-me-60d56.appspot.com/o/message1.png?alt=media&token=511faa9e-d146-4de7-992c-8bb6fbc4920c" alt="main_icon"/>
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
