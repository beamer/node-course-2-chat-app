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

  socket.on('disconnect', (socket) => {
    console.log('User was disconnected');
  });
})} catch(error) {
  console.log('unable to connect');
};

app.use(express.static(publicPath));



server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
