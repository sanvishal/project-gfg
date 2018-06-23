var config = {
  apiKey: ".",
  authDomain: ".",
  databaseURL: ".",
  projectId: ".",
  storageBucket: ".",
  messagingSenderId: "."
}

firebase.initializeApp(config)
var database = firebase.database()
var ref = firebase.database().ref("messages/");
var socket = io.connect('http://' + document.domain + ':' + location.port)

messages = []

$(window).load(function() {
  ref.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      msgtemp = childSnapshot.val()
      md = {
        name: msgtemp.name,
        message: msgtemp.message
      }
      messages.push(md)
    });
  });
  console.log(messages)
});

socket.on('connect', function() {
  socket.emit('my event', {
    data: 'User Connected'
  })
  var form = $('form').on('submit', function(e) {
    e.preventDefault()
    let user_name = $('input.username').val()
    let user_input = $('input.message').val()
    if(user_name == '') {
      user_name = 'Anonymous'
    }
    ref.push({name: user_name,message:user_input})
    if(user_input != '') {
      socket.emit('my event', {
        user_name : user_name,
        message : user_input
      })
      $('input.message').val('').focus()
    }
  })
})


socket.on('my response', function(msg) {
  username_fb = msg.user_name
  message_fb = msg.message
  console.log(username_fb,message_fb)
  if(typeof msg.user_name !== 'undefined') {
    $('h1').remove()
    $('div.message_holder').append('<div class="msg_bbl"><strong style="color: #000">'+msg.user_name+'</strong> '+msg.message+'</div>')
  }
})

//ref.set({placeholder:"nothing"})