var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

  socket.on('disconnect', function() {
    console.log('Disconnect from server');
  });

  socket.on('newMessage', function (message) {
    console.log('Messagex: ', message);
    var li = jQuery('<li></li>');
    try {
      var xx = `${message.from}:  ${message.text}`;
    li.text(`${message.from}: ${message.text}`);

    console.log('inside index.js new message ', li, ' : ', xx);
    jQuery('#messages').append(li);
  } catch (e) {
    console.log('error');
  }
  });


  // socket.emit('createMessage', {
  //   from: 'Frank',
  //   text: 'Hi'
  // }, function(data) {
  //   console.log('Got it', data);
  // });


// socket.on('newEmail', function(email) {
//   console.log('New email ', email);
// });


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  console.log('just click ' , jQuery('[name=message]').val());
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
