var playerConnection;
var timeConnection;
var Tiempo = null;
var PlayerWS;

function conection (){
	//Cuatro websockets: Jugador, Drops, Tiempo y Puntuación
	timeConnection   		= new WebSocket('ws://'+ ip +':8080/timeHandler');

	
	timeConnection.onerror = function(e) {
		console.log("WS error: " + e);
	}

	timeConnection.onopen = function() {
		console.log("Time WebSocket!");
	}

	timeConnection.onmessage = function(msg) {
		
		var playerData = JSON.parse(msg.data);
		//console.log(playerData);
		
		switch(playerData.socket){
		
			case "player":
				
				
				PlayerWS.alive = playerData.alive;
				PlayerWS.x = playerData.x;
				PlayerWS.y = playerData.y;
				PlayerWS.rot = playerData.rot;
				PlayerWS.keyw = playerData.keyw;
				PlayerWS.keys = playerData.keys;
				PlayerWS.keyd = playerData.keyd;
				PlayerWS.keya = playerData.keya;
				PlayerWS.keyr = playerData.keyr;
				PlayerWS.gunAmmo = playerData.gunAmmo;
				PlayerWS.shotgunAmmo = playerData.shotgunAmmo;
				PlayerWS.life = playerData.life;
	    		PlayerWS.velocityX = playerData.velocityX;
	    		PlayerWS.velocityY = playerData.velocity;
	    		PlayerWS.spriteX = playerData.spriteX;
	    		PlayerWS.spriteY = playerData.spriteY;


				//console.log("Mensaje ws! " + PlayerWS.rot);
				break;
			case "bang":
				
				PlayerWS.keyMouse = playerData.keyMouse;
				PlayerWS.totalTouches = playerData.totalTouches;

				break;
				
			case "time":
				Tiempo = playerData.time;

				break;
				
		}
		
	}

	timeConnection.onclose = function() {

		console.log("Closing time socket");
	}
}

function sendPos(x, y, rot){
	msg = { socket: "player",
		x: x,
		y: y,
		rot: rot
	}

	timeConnection.send(JSON.stringify(msg));
}

function sendBang(mouse,touches){
	msg = { socket: "bang",
			keyMouse: mouse,
			totalTouches:touches
	}
	timeConnection.send(JSON.stringify(msg));
}


function sendPos1(x, y, rot, up, down, left, right, alive, reload, gunAmmo, shotgunAmmo, life, velocityX, velocityY,spriteX, spriteY){
	msg = { socket: "player",
			
	    alive: alive,
		x: x,
		y: y,
		rot: rot,
		keyw: up,
		keys: down,
		keya: left,
		keyd: right,
		keyr: reload,
		gunAmmo: gunAmmo,
		shotgunAmmo: shotgunAmmo,
		life: life,
		velocityX: velocityX,
		velocityY: velocityY,
		spriteX: spriteX,
		spriteY: spriteY

	}

	timeConnection.send(JSON.stringify(msg));
}

;