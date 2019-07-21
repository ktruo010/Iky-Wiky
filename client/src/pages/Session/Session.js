import React, { Component } from 'react'
import Nav from '../../components/Nav'
import SessionBanner from '../../components/SessionBanner'
import Chatkit from '@pusher/chatkit-client'
import MessageList from '../../components/SessionComp/MessageList'
import SendMessageForm from '../../components/SessionComp/SendMessageForm'
import TypingIndicator from '../../components/SessionComp/TypingIndicator'
import './Session.css'
import ScrollToBottom from 'react-scroll-to-bottom';


class Session extends Component {


  constructor(props) {
    super(props)
    this.state = {
        currentUser: null,
        currentRoom: null,
        messages: [],
        usersWhoAreTyping: [],
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.sendTypingEvent = this.sendTypingEvent.bind(this)
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error('error', error))
  }

  sendMessage(text) {
       this.state.currentUser.sendMessage({
         text,
         roomId: this.state.currentRoom.id,
       })
     }

  componentDidMount () {
    let userId= localStorage.getItem("userId")
    let user_name=localStorage.getItem("user_name")
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:366d4bfd-9da9-4a3c-8b98-fb24d065efc5',
      userId,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenticate',
      }),
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })
        console.log(this.state.currentUser)
        return currentUser.subscribeToRoom({
            roomId: '20092547',
            messageLimit: 100,
            hooks: {
                onMessage: message => {
                this.setState({
                messages: [...this.state.messages, message],
            })
          },
            onUserStartedTyping: user => {
                 this.setState({
                   usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                })
               },
               onUserStoppedTyping: user => {
                   console.log(user)
                 this.setState({
                   usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                     username => username !== user.name
                   ),
                 })
               },
        },
      })
      .then(console.log("Working"))

      
    })
          .then(currentRoom => {
                this.setState({ currentRoom })
                console.log(this.state.currentRoom)
               })
      .catch(error => console.error('error', error))
  }

  render() {
    
   console.log(this.state)
    return (
        
     
        <div >
          <SessionBanner/>
          <section >
            <ScrollToBottom>
          <MessageList
              messages={this.state.messages}
              
            />  
            </ScrollToBottom>   
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
             <SendMessageForm 
             onSubmit={this.sendMessage} 
             onChange={this.sendTypingEvent}
             />
          </section>
          <Nav/>
        </div>
     
    )
  }
}


export default Session

