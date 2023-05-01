const express = require('express')
const app = express()
const http = require('http').createServer(app)
// const room = require('./public/clients.js')

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// var roomno = 1;
// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {

    socket.on('message',(msg) =>{
        socket.broadcast.emit('message',msg);
    })

})


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})