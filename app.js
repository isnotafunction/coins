const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const fetch = require('node-fetch')
const port = process.env.PORT || 5000
const url = 'https://api.coindesk.com/v1/bpi/currentprice.json'

const app = express()

const index = require('./routes/index')
app.use(index)

const server = http.createServer(app)
const io = socketIo(server)

let interval 

io.on('connection', socket => {
  console.log('client connected')
  if(interval){
    clearInterval(interval)
  } else {
    interval = setInterval(()=>{
      getAPIandEmit()
    }, 60000)
  }
  socket.on("disconnect", () => console.log("Client disconnected"));
})

const getAPIandEmit = async socket => {
 const res = {}
 try{
  const data = await fetch(url).then(blob => blob.json()).then(data => data)
  res.time = data.time.updateduk
  res.currency = data.chartName
  res.rate = data.bpi.GBP.rate
  console.log(res)
  socket.emit('myData', res)
 } catch(error){
   console.error(error.code)
 }
}


server.listen(port, ()=>{
  console.log(`server is listening on port ${port}`)
})