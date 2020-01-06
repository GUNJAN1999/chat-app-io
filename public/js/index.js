 var socket = io();
	socket.on('connect',()=>{
	console.log('connected to server');
	
	});

	socket.on('disconnect',()=>{
	console.log('disconnected from server');
	});

	socket.on('newMessage',function (message){
		var formattedTime = moment(message.createdAt).format('h:mm a');
		var li = jQuery('<li></li>');
		li.text(`${message.from} ${formattedTime}: ${message.text}`);
		jQuery('#messages').append(li);
	});

	socket.on('newLocationMessage',function (message){
		var formattedTime = moment(message.createdAt).format('h:mm a');
		var li = jQuery('<li></li>');
		var a= jQuery('<a target="_blank">My Current Location </a>');
		li.text(`${message.from}  ${formattedTime}:`);
		a.attr('href',message.url);
		li.append(a);
		jQuery('#messages').append(li);
	})

	jQuery("#message-form").on('submit',function (e) {
		e.preventDefault();

		socket.emit('createMessage',{
			from:'user',
			text  : jQuery('[name=message]').val()
		},function (){

		});
	});

	var locationButton = jQuery("#send-location");
	locationButton.on('click',function () {
		if(!navigator.geolocation){
		return alert('Geoloaction not supported by browser');
	    }

	    locationButton.attr('disabled','dissabled').text('Sending Location');
		navigator.geolocation.getCurrentPosition(function (position){
			locationButton.removeAttr('disabled').text('Send Location');
			socket.emit('createLocationMessage',{
				latitude : position.coords.latitude,
				longitude : position.coords.longitude,
			});
		},function (){
			locationButton.removeAttr('disabled').text('Send Location');
			console.log("unable to fetch location");
		});

		});








