import React, {Component} from 'react';

import axios from 'axios';

class Email extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      title: '',
      message: '',
      image:''
    }
  }

  handleInput = (e) => {
    const { value, name } = e.target
    this.setState({ [name]: value })
  }

  handleSend = () => {
    const { name, email, message, title} = this.state
    axios.post('/api/email', { name, email, message, title}).then(res => {
      this.setState({
        name: '',
        email: '',
        title: '',
        message: '',
      })
    })
  }

  render() {
    const { name, email, message, title} = this.state
    
    return (
      <div style={styles.body}>
        <div style={styles.form}>
          <h1 style={styles.header}>Email Us</h1>
          <input style={styles.input} placeholder='title' type="text" name='title' value={title} onChange={this.handleInput} />
          <input style={styles.input} placeholder='name' type="text" name='name' value={name} onChange={this.handleInput} />
          <input style={styles.input} placeholder='email' type="text" name='email' value={email} onChange={this.handleInput} />
          <input style={styles.input} placeholder='message' type="text" name='message' value={message} onChange={this.handleInput} />
          <button style={styles.button} onClick={this.handleSend}>Send</button>
        </div>
      </div>
    )
  }
}


export default Email;

const styles = {
  body:{
    background:'none',
    height:'100vh',
    display:'flex',
    alignItems:'top',
    justifyContent:'left',
    marginLeft:'5px',
    marginTop: '13px'
  },
  form:{
    display:'flex',
    flexDirection:'column',
    background:'#001eff5d',
    width:500,
    alignItems:'center',
    height:450,
    justifyContent:'space-evenly',
    borderRadius:10,
  },
  header:{
    fontFamily: 'Norse',
    fontSize:52,
    margin:0,
    color:'white',
    opacity:'none',
    letterSpacing:'0.07em',
    fontWeight:'bold',
  },
  input:{
    width:450,
    height:26,
    fontSize:19,
    outline:'none'
  },
  button:{
    width:100,
    height:45,
    border: 'none',
    borderRadius:10,
    background:'green',
    fontSize:26,
    fontWeight:'bold',
    letterSpacing:'0.06em',
  },
  
}