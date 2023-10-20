const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    socket.on('user registered', (username) => {
      socket.username = username;
    });
  
    socket.on('chat message', (message) => {
      io.emit('chat message', { username: socket.username, message });
    });
  });

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); 

server.listen(3000, () => {
  console.log('listening on *:3000');
});