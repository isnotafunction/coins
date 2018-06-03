import React, { Component } from 'react';
import socketIoClient from 'socket.io-client'


class App extends Component {
  constructor(){
    super()
    this.state = {
      response: false,
      endpoint: 'http://127.0.0.1:5000'
    }
  }

 componentDidMount(){
   const {endpoint} = this.state
   const socket = socketIoClient(endpoint)
   socket.on('myData', data => {
     console.log(data)
    this.setState({response:data})
   })
 }

 render(){
   const {response} = this.state
   return (
     <div>
      {response ? <p> udated: {response.time} - currency: {response.currency} - rate: {response.rate}</p> : <p> Loading ...</p> }
     </div>
   )
  }

}

export default App;
