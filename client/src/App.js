import React, { Component } from 'react';
import socketIoClient from 'socket.io-client'
import './App.css'

class App extends Component {
  constructor(){
    super()
    this.state = {
      response: [],
      endpoint: 'http://127.0.0.1:5000'
    }
  }

 componentDidMount(){
   const {endpoint} = this.state
   const socket = socketIoClient(endpoint)
   socket.on('myData', data => {
     console.log(data)
    this.setState({response:[data]})
   })
 }

 render(){
   const {response} = this.state
   return (
     <React.Fragment>
      {response.length>0 ? 
      <div className="container">
      <p> currency: {response[0].currency} </p>
      <p> updated: {response[0].time} </p> 
      <p> rate: {response[0].rate} </p> 
      </div>
      : 
      <p> Loading ...</p> 
      }
     </React.Fragment>
   )
  }

}

export default App;
