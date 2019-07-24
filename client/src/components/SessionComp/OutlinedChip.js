import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

class OutlinedChipItem extends Component{

  render(){
    
    return(
      
      <li>
        <button     
        name={this.props.name} 
        id={this.props.id} 
        onClick={this.props.onClick}
        variant="outlined">

        {this.props.children}
        </button>

      </li>
    )
  }
}

class OutlinedChip extends Component{
  state={
    room:null
  }

  handleClick=e=>{
    e.preventDefault()

    console.log(e.target.id)
    console.log(e.target.name)
    console.log(this.props.currentUser)
    this.props.currentUser.createRoom({
      name: `${e.target.name}`,
      private:true,
      addUserIds:[`${e.target.id}`]
    })
    .then(room=>{
      this.setState({room})
      console.log(this.state.room)
    })

   
  }

    render(){
      return(

        <>
        {
        
          this.props.users.map((user,index)=>{

            if(user.id===this.props.currentUser.id){
              return(
                <OutlinedChipItem name={user.name} id={user.id} key={index} presenceState="online" onClick={this.handleClick}>
                  {user.name} (You)
                </OutlinedChipItem>
              )
            }
            return(
              <OutlinedChipItem name={user.name} id={user.id} key={index} presenceState={user.presence.state} onClick={this.handleClick} value={user.name}>
              {user.name}
            </OutlinedChipItem>
            )
          })
        }
      </>
      )
    }
}


export default OutlinedChip
