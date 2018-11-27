var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.Login = function(){};

var input;
var currentUser;

function createUser(user, callback) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/users',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
        console.log("User created: " + JSON.stringify(user));
        currentUser = user.id;
        console.log(currentUser);
        callback(user);
    })
}

AsiloRoyale.Login.prototype = {

	create: function() {
		input = document.getElementById('username');
		input.style.display = 'block';

		//ok.addEventListener=('click', this.changeState);

		
		this.game.camera.setBoundsToWorld();
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		this.background.autoScroll(20, 0);

		boton4 = this.game.add.button(650, 320,'okbutton', this.changeState, this,1,0,1,0);
 		boton4.width = 64;
 		boton4.height = 64;
 		boton4.anchor.setTo(0.5);
 		boton4.input.useHandCursor = false;
 		
 	    this.tabla_conectados = this.game.add.sprite(295, 250, 'chooseNick');

		this.tv = this.game.add.sprite(0, 0, 'tv');
    	this.tv.fixedToCamera = true;

    },

    changeState: function() {
        var that = this;
		var input = $('#username')
    	var value = input.val();
        input.val('');
        console.log(input);

        var user = {
            nick: value,
            ready:false
        }
    	   		createUser(user, function (userWithId) {
            	//usersconnected = users.length;
                console.log(userWithId);
                currentUser = userWithId;
                console.log(currentUser);
                
                that.game.state.start('OnlineLobby', false, false, currentUser);
            	//info = '';
            })
        
	
},


    update: function() {
    	//console.log(input.value);
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.game.state.start('MainMenu');}
	},

};