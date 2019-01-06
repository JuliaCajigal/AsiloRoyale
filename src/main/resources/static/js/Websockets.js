var playerConnection;
var timeConnection;
var Tiempo = null;

function conection (){
	//Cuatro websockets: Jugador, Drops, Tiempo y Puntuación
	timeConnection   		= new WebSocket('ws://'+ ip +':8080/timeHandler');
	/*playerConnection  		= new WebSocket('ws://'+ ip +':8080/handler');
	
	//JUGADOR
	playerConnection.onmessage = function(msg) {
		var playerData = JSON.parse(msg.data);
		console.log();
		switch(playerData.protocolo){
			case "Jugador":
			Jugador = playerData.jugador;
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

	playerConnection.onclose = function() {
		setTimeout(conection(),3000);
		console.log("Closing player socket");
	}*/

	timeConnection.onerror = function(e) {
		console.log("WS error: " + e);
	}

	timeConnection.onopen = function() {
		console.log("Time WebSocket!");
	}

	timeConnection.onmessage = function(msg) {
		
		console.log(msg);
		var timeData = JSON.parse(msg.data);
		Tiempo = timeData.time; 
		console.log(timeData);
		
	}

	timeConnection.onclose = function() {
		//setTimeout(conection(),3000);
		console.log("Closing time socket");
	}
};