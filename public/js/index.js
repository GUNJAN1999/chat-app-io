 var socket = io();
	socket.on('connect',()=>{
	console.log('connected to server');

	socket.emit('createMessage',{
		to : 'mehak',
		text : 'Hey this is gunjan'
	});

	});

	socket.on('disconnect',()=>{
	console.log('disconnected from server');
	});

	socket.on('newMessage',(message)=>{
		console.log('new message is recieved',message);
	});