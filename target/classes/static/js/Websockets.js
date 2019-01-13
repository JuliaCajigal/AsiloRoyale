var playerConnection;
var timeConnection;
var Tiempo = null;
var PlayerWS;

function conection (){
	//Cuatro websockets: Jugador, Drops, Tiempo y Puntuación
	timeConnection   		= new WebSocket('ws://'+ ip +':8080/timeHandler');
	//playerConnection  		= new WebSocket('ws://'+ ip +':8080/handler');
	

	//JUGADOR
	/*playerConnection.onmessage = function(msg) {
		var playerData = JSON.parse(msg.data);
		console.log(playerData);
		
		switch(playerData.socket){
		
			case "player":
		
				PlayerWS.x = playerData.x;
				PlayerWS.y = playerData.y;
				PlayerWS.rot = playerData.rot;
		PlayerWS.keyw = playerData.keyw;
    	PlayerWS.keys = playerData.keys;
    	PlayerWS.keyd = playerData.keyd;
    	PlayerWS.keya = playerData.keya;

				console.log(myUser);
				break;
		}
		
	}

	playerConnection.onclose = function() {
		//setTimeout(conection(),3000);
		console.log("Closing player socket");
	}*/

	timeConnection.onerror = function(e) {
		console.log("WS error: " + e);
	}

	timeConnection.onopen = function() {
		console.log("Time WebSocket!");
	}

	timeConnection.onmessage = function(msg) {
		
		/*console.log(msg);
		var timeData = JSON.parse(msg.data);
		Tiempo = timeData.time; 
		console.log("Mensaje time WS!");
		console.log(timeData);*/
		
		var playerData = JSON.parse(msg.data);
		console.log(playerData);
		
		switch(playerData.socket){
		
			case "player":
		
				PlayerWS.x = playerData.x;
				PlayerWS.y = playerData.y;
				PlayerWS.rot = playerData.rot;
				/*PlayerWS.keyw = playerData.keyw;
				PlayerWS.keys = playerData.keys;
				PlayerWS.keyd = playerData.keyd;
				PlayerWS.keya = playerData.keya;*/

				console.log("Mensaje ws! " + PlayerWS.y);
				break;
		}
		
	}

	timeConnection.onclose = function() {
		//setTimeout(conection(),3000);
		console.log("Closing time socket");
	}
}

function sendPos(x, y, rot){
	msg = { socket: "player",
		x: x,
		y: y,
		rot: rot
	}
	console.log(msg);
	timeConnection.send(JSON.stringify(msg));
}


function sendPos1(x, y, rot, up, down, left, right){
	msg = { socket: "player",
		x: x,
		y: y,
		rot: rot,
		keyw: up,
		keys: down,
		keya: left,
		keyd: right
	}
	console.log(msg);
	timeConnection.send(JSON.stringify(msg));
}

;