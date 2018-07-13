const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 2500;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//console.log(io);
try {
  io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'Hey. what is going on.',
  //   createdAt: 123
  // });

  socket.emit('newMessage', {
    from: 'John',
    text: 'See you then',
    createdAt: 123123
  });

  socket.on('createEmail', (newEmail) => {
    console.log('create email ', newEmail);
  });

  socket.on('createMessage', (message) => {
    console.log('Message: ', message)
  });

  socket.on('disconnect', (socket) => {
    console.log('User was disconnect');
  });
})} catch(error) {
  console.log('unable to connect');
};

app.use(express.static(publicPath));



server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
