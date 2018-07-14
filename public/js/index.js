var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

  socket.on('disconnect', function() {
    console.log('Disconnect from server');
  });

  socket.on('newMessage', function (message) {
 var formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('Messagex: ', message);
    var li = jQuery('<li></li>');
    try {
      var xx = `${message.from}:  ${message.text}`;
    li.text(`${message.from}: ${formattedTime} ${message.text}`);

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

 socket.on('newLocationMessage', function(message) {
var formattedTime = moment(message.createdAt).format('h:mm a');
   var li = jQuery('<li></li>');
   var a = jQuery('<a target="_blank">My current location</a>');

     li.text(`${message.from}: ${formattedTime} `);
     a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
 });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  //console.log('just click ' , jQuery('[name=message]').val());
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
   if (!navigator.geolocation) {
     return alert('Geolocation not support by your browser');
   }
   locationButton.attr('disabled', 'disabled').text('Sending location...');

   navigator.geolocation.getCurrentPosition(function (position) {
     locationButton.removeAttr('disabled').text('Send location');
     socket.emit('createLocationMessage', {
       latitude: position.coords.latitude,
       longitude: position.coords.longitude
     });
   }, function () {
     locationButton.attr('disabled', 'disabled').text('Send location');
     alert('Unable to fetch location');
   });
});
