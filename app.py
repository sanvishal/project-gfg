import os
from flask import Flask, render_template
from flask_socketio import SocketIO, emit, send

app = Flask(__name__)

app.config['SECRET_KEY'] = 'thisisasecretkeydonotrevealthistohackerspleasethankyou'
socketio = SocketIO(app)

@app.route('/')
def hello_world():
	return render_template("index.html")

@socketio.on('my event')
def handle_my_custom_event(json):
  	#print( 'recived my event: ' + str(json))
  	socketio.emit('my response', json)
  	send(json, broadcast = True)

if(__name__ == '__main__'):
	socketio.run(app)
	app.run(debug = True)