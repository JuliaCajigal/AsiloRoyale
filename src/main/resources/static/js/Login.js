var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.Login = function(){};

var input;

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

		boton4 = this.game.add.button((this.game.camera.width-150)/2-80,this.game.camera.height/2+200,'okbutton', this.changeState, this,1,0,1,0);
 		boton4.width = 150;
 		boton4.height = 70;
 		boton4.anchor.setTo(0.5);
 		boton4.input.useHandCursor = false;

		this.tv = this.game.add.sprite(0, 0, 'tv');
    	this.tv.fixedToCamera = true;

    },

    changeState: function() {
		var input = $('#username')
    	var value = input.val();
        input.val('');
        console.log(input);

        var user = {
            nick: value,
            checked: false
        }
    	   		createUser(user, function (userWithId) {
            	//usersconnected = users.length;
            	info = '';
            

            })
		this.game.state.start('OnlineLobby');
	
},


    update: function() {
    	//console.log(input.value);
		var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   		if(escKey.isDown){
   			this.game.state.start('MainMenu');}
	},

};