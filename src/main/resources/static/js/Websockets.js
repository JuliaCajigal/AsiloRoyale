function conection (){
	//Cuatro websockets: Jugador, Drops, Tiempo y Puntuación
	connectionJugador  		= new WebSocket('ws://'+ location.host +'/echo');


	//JUGADOR
	connectionJugador.onmessage = function(msg) {
		var datosJugador = JSON.parse(msg.data);
		switch(datosJugador.protocolo){
			case "Jugador":
			Jugador = datosJugador.jugador;
			break;
			case "GetReady":
			GetReady = datosJugador.ready;
			break;
			case "Skin":
			Skin = datosJugador.skin;
			break;
			default:
		}
	}

	connectionJugador.onclose = function() {
		setTimeout(conection(),1000);
		console.log("Closing socket");
	}
};