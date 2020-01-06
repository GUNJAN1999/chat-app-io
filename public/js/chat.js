 var socket = io();
 	function scrollToBottom(){

 	}
	socket.on('connect',()=>{
	console.log('connected to server');
	
	});

	socket.on('disconnect',()=>{
	console.log('disconnected from server');
	});

	socket.on('newMessage',function (message){
		var formattedTime = moment(message.createdAt).format('h:mm a');
		var template = jQuery('#message-template').html();
		var html = Mustache.render(template,{
			text: message.text,
			from : message.from,
			createdAt : formattedTime
		})
		jQuery('#messages').append(html);
		
	});

	socket.on('newLocationMessage',function (message){
		var formattedTime = moment(message.createdAt).format('h:mm a');
		var template = jQuery('#location-message-template').html();
		var html = Mustache.render(template,{
			from : message.from,
			url: message.url,
			createdAt : formattedTime
		})
		jQuery('#messages').append(html);
		
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








