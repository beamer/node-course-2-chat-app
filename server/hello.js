// const http = require('http');
//
// http.createServer((request, response) => {
//   response.writeHead(200, {
//     'Content-Type': 'text/plain'
//   });
//   response.write('Hellow, World!\n');
//   response.end();
// }).listen(1337);

const express = require('express');
const app = express();
const port = 2900;

app.get('/', function(request, response) {
  response.send('Hello world!');
});

app.listen(port, function() {
  console.log('Server listening on http://localhost:' + port);
});
