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

function clear_and_write(ref, data) {
  //pass as json dict {key:'value'}
  ref.set(data)
}

function clear_data(ref) {
  ref.set({placeholder:'nothing'})
}

function push_data(ref,data) {
  for(i = 0; i < data.length; i++) {
    ref.push(data[i])
  }
}

function update_data(ref,data) {
  ref.update(data)
}

function get_structure(ref) {
  ref.on("value", function(snapshot) {
    console.log(snapshot.val())
  }, function (error) {
    console.log(error.code)
  });
}


var socket = io.connect('http://' + document.domain + ':' + location.port)

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

console.log(ref)