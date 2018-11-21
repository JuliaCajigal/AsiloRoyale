var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.OnlineLobby = function(){};

var info;
var usersList;
var usersconnected = 0;
var timer, timerEvent;

function loadUsers(callback) {
    $.ajax({
        url: 'http://localhost:8080/users'
    }).done(function (users) {
        console.log('Users loaded: ' + JSON.stringify(users));
        callback(users);
    })
}

AsiloRoyale.OnlineLobby.prototype = {

	create: function() {

		//this.loadItemsArray();

		/*var style1 = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "center" };
		var text1 = 'Usuarios conectados: ' ;
		on = this.game.add.text(320, 200, text1, style1);*/
		//this.usersConnected.fixedToCamera = true;
		//this.userList.parseList(users);
		
		input = document.getElementById('username');
		input.style.display = 'none';

		
		this.game.camera.setBoundsToWorld();
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		this.background.autoScroll(20, 0);

		
		this.tv = this.game.add.sprite(0, 0, 'tv');
    	this.tv.fixedToCamera = true;
    	this.tabla_conectados = this.game.add.sprite(282, 125, 'tabla_conectados');
    	this.tabla_conectados.fixedToCamera = true;

    	this.showUsers();
    	
    	//Temporizador
    	timer = this.game.time.create();
        
    	//Evento de tiempo
   		timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 00, this.endTimer, this);
        
    	//Comienzo temporizador
    	timer.start();
    	//this.showUsers();

    },

    update: function() {
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.game.state.start('MainMenu');}

   			loadUsers(function (users) {
            	usersconnected = users.length;
            	info = '';
            
            	for (var i = 0; i < users.length; i++) {
                	var user = users[i];
                	info += i + ":  " + user.nick + "\n";
            }
            usersList.setText(info);        
    })

///---
   		
	},

	
	showUsers: function() {
		var style = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "left" };
		var text = ''; 
		usersList = this.game.add.text(300, 200, text, style);
		usersList.fixedToCamera = true;
	},

	updateList: function(){
		for (var i = 0; i < users.length; i++) { 
			this.userList.text += users[i].description;
			
		}
	},

	loadUsersArray : function() {
		var that = this;
	    $.ajax({
	        url: 'http://localhost:8080/user'
	    }).done(function (user) {	
	        console.log('Users loaded: ' + JSON.stringify(users));
	        for(var i=0; i<users.length; i++){
	      		users.push(users[i]);
	      		//console.log(users[i].description);
	      		//console.log(users[i]);
	        	
	        	//callback(this);
	    	}
	    	that.showUsers();
	    	
		})
		
	},

	loadUsers: function (callback) {
   		$.ajax({
        	url: 'http://localhost:8080/users'
    	}).done(function (users) {
        	console.log('Users loaded: ' + JSON.stringify(users));
        	callback(this);
    })
	},


//Muestra el tiempo que queda para el final de la partida
	render: function() {
		if (timer.running) {
          this.game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 1010, 78, "#51F55B", "50px 'VT323'");
      }
      else {
          this.game.debug.text("Done!",1010, 78, "#51F55B", "50px 'VT323'");
      }
  },


  //Código de: http://jsfiddle.net/lewster32/vd70o41p/
  endTimer: function() {
      timer.stop();
      this.game.state.start('Game');
  },

  //cambia el formato del tiempo
  formatTime: function(s) {

      var minutes = "0" + Math.floor(s / 60);
      var seconds = "0" + (s - minutes * 60);
      return minutes.substr(-2) + ":" + seconds.substr(-2);
	},

};