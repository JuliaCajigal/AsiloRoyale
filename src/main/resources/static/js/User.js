var AsiloRoyale = AsiloRoyale || {};

function User(game, id, name) {
    this.id = id;
    this.name = name;
    this.disconnected = false;
    this.ready = false;
    //this.player = null;
    }

	User.prototype.constructor = User;


	User.prototype.create= function() {
		  
	}

    User.prototype.update = function(){
    	var interval = setInterval(this.updater(),500);
    }


	User.prototype.updater = function() {
       // console.log(this.id);

        $.ajax({
        method: 'GET',
        url: 'http://192.168.1.130:8080/users/' + this.id
    
    }).success(function (user) {
        //console.log('User loaded: ' + JSON.stringify(user));
        //callback(user);
        if(this.disconnected == true){this.disconnected = false;}
    
    }).fail(function (user) {
        console.error("Se ha perdido la conexión con el servidor.");
        this.disconnected = true;

        
    })
}


function loadUser(callback) {
    $.ajax({
        method: 'GET',
        url: 'http://192.168.1.130:8080/users/' + this.id
    
    }).done(function (user) {
        console.log('User loaded: ' + JSON.stringify(user));
        callback(user);
    
    }).fail(function () {
        console.error("Se ha perdido la conexión con el servidor.");
        this.disconnected = true;
        
    })
}

//Delete item from server
function deleteUser(userId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://192.168.1.130:8080/users/' + this.id
        
    }).done(function (user) {
        console.log("Deleted user " + this.id)
    })
}
