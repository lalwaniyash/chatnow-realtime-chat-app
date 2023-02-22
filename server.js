const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();



const PORT = process.env.PORT || 3000;



app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket
const server = http.createServer(app)
const io = new Server(server)
io.on('connection', (socket) => {
    console.log('connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
});


server.listen(PORT, () => {
    console.log(`Server is Listening on ${PORT}`)
}) 