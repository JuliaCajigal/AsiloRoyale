var AsiloRoyale = AsiloRoyale || {};

function User(game, id, name, skin) {
	this.game = game;
    this.id = id;
    this.name = name;
    this.disconnected = false;
    this.ready = false;
    this.updater = this.game.time.events.loop(Phaser.Timer.SECOND*2.5, this.updater, this);
    this.player = null;
    this.skin = skin;
    this.ip = '192.168.0.175';
    this.online = false;
    }

	User.prototype.constructor = User;

	User.prototype.create= function() {  
	}

    User.prototype.update = function(){
    }

    //Realiza una petición GET al servidor cada segundo y medio para indicar que 
    //sigue conectado
	User.prototype.updater = function() {

        if(this.online == true){ 
            $.ajax({
            method: 'GET',
            url: 'http://' + this.ip + ':8080/users/' + this.id
    
            }).success(function (user) {
                if(this.disconnected == true){this.disconnected = false;}
    
            }).fail(function (user) {
                console.error("Se ha perdido la conexión con el servidor.");
                this.disconnected = true;
        
            })
        }
}

