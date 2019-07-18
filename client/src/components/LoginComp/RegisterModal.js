import React from 'react';
import chatUtils from '../../utils/chatUtils.js'
import Chatkit from '@pusher/chatkit-client'
import axios from 'axios'
import './Register.scss'
import history from '../../utils/history'
class RegisterModal extends React.Component {

  state = {
    first_name: "",
    last_name: "",
    phone: "",
    avatar: "", //url from AWS
    username: "",
    password: "",
    currentUser:null
  }

  handleAddUser = e => {
    e.preventDefault()
    console.log(this.state)
    chatUtils.addUser(this.state)
    .then(chatUtils.login(this.state.username,this.state.password)
    .then((data) =>{
      localStorage.setItem("userId",data.data[0]._id)
      localStorage.setItem("user_name",data.data[0].username)
  })  
  .then(()=>{
    let userId= localStorage.getItem("userId")
    let user_name= localStorage.getItem("user_name")
    console.log('user '+userId)
    axios.post('http://localhost:3001/user',{userId,user_name})
    // .then(()=>{
      console.log(userId,user_name)
      const tokenProvider = new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenticate',
      });
      const chatManager = new Chatkit.ChatManager({
        instanceLocator: 'v1:us1:366d4bfd-9da9-4a3c-8b98-fb24d065efc5',
        userId,
        tokenProvider
      });
      chatManager.connect()
      .then(currentUser => {
        this.setState({
          currentUser
        })
        console.log(this.state.currentUser)
        console.log('Successful connection')
        currentUser.joinRoom({ roomId: '20091598' })
        .then(room => {
          console.log(`Joined room with ID: ${room.id}`)
        })
        .catch(err => {
          console.log(`Error joining room ${20091598}: ${err}`)
        })
      })
        
      .catch(err => {
        console.log('Error on connection', err)
      })
      history.push('/Session')
    // })
  })
)
  

  }
  handleInputs = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
 }

  render() {

    return (
      <div className="base-container" ref={this.props.containerRef}>
            {this.props.children}
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            
          </div>
          <div className="form" connection={this.props}>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input onChange={this.handleInputs} id="first_name" placeholder="First Name" />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input onChange={this.handleInputs} id="last_name" placeholder="Last Name" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input onChange={this.handleInputs} id="username" placeholder="Username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={this.handleInputs} id="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input onChange={this.handleInputs} id="phone" placeholder="Phone Number" />
            </div>
            <div className="form-group">
            <button onClick={this.handleAddUser} className="btn">
            Register
          </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default RegisterModal;