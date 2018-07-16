const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require("socket.io");
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const {Users} = require('./utils/users');
var users = new Users();

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 2500;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//console.log(io);
app.use(express.static(publicPath));
//try {
  io.on('connection', (socket) => {
  console.log('New user connected');
  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'Hey. what is going on.',
  //   createdAt: 123
  // });
  //socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  //socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  // socket.emit('newMessage', {
  //   from: 'John',
  //   text: 'See you then',
  //   createdAt: 123123
  // });
  // socket.on('createEmail', (newEmail) => {
  //   console.log('create email ', newEmail);
  // });
  socket.on('join', (params, callback) => {
  //  console.log('in join ', params);
    if (!isRealString(params.name) || (!isRealString(params.room))) {
    //  console.log('Empty arg');
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    //socket.leave(params.room);
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('Message: ', message);
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
     io.emit('newMessage', generateMessage(message.from, message.text));
     callback();
   // socket.broadcast.emit('newMessage', {
   //   from: message.from,
   //   text: message.text,
   //   createdAt: new Date().getTime()
   // });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
    // console.log('User was disconnect');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
