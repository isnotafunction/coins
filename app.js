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







server.listen(port, ()=>{
  console.log(`server is listening on port ${port}`)
})