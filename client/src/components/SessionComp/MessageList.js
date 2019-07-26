import React, { Component } from 'react'
import { ListItemAvatar, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ReactDOM from 'react-dom'
import { format } from 'date-fns';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
class MessagesList extends Component {
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight  +30>= node.scrollHeight
}

componentDidUpdate() {
    if (this.shouldScrollToBottom) {
        const node = ReactDOM.findDOMNode(this)
        node.scrollTop = node.scrollHeight   
    }
}
  render() {
  
    // const fromMe = this.props.fromMe ? 'from-me' : '';

    return (
      <div className="chatContainer" >
    
        <List >
           {this.props.messages.map((message, index) => (
            
             <ListItem key={index} >
           
                 <ListItemAvatar>
                 <Avatar>
                    <AccountCircleIcon/>
                </Avatar>
                 
                 
                 </ListItemAvatar>{' '}
                
                 <ListItemText style={{color:'white'}}primary={message.sender.name} 
                 secondary={
                   <React.Fragment>
                     <Typography
                      className="messages"
                     component='span'
                     variant="body2"
                     >
                     {message.text}
                     </Typography>
                   </React.Fragment>
                 }
                 />
               {/* <ListItemText className="messages" primary={message.text}>
              
                
              
               </ListItemText> */}
               <span style={{color:'white'}}>{format(new Date(`${message.updatedAt}`), 'HH:mm')}</span>
             </ListItem>
           ))}
         </List>
         
       </div>
     )
   }
 }

 MessagesList.defaultProps = {
  fromMe: false
};
 export default MessagesList

