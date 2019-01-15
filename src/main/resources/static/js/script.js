var ipC;

/*$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
  console.log(JSON.stringify(data, null, 2));
  ipC = data.ip;
  console.log(ipC);

})

console.log(ipC);*/

var usersLimit = 5;
var currentUsers = 0;
var ip = '127.0.0.1';

//Load users from server
function loadUsers(callback) {
    $.ajax({
        url: 'http://' + ip + ':8080/users'
    }).done(function (users) {
        console.log('Users loaded: ' + JSON.stringify(users));
        callback(users);
    })
}

//Load usernames from server
function loadUserNames(callback) {
    $.ajax({
        url: 'http://' + ip + ':8080/users/userNames'
    }).done(function (userNames) {
        console.log('Usersnames loaded: ' + JSON.stringify(userNames));
        callback(userNames);
    })
}

///Mayores puntuaciones y nicks asociados almacenados en el sevidor
function loadScores(callback){
    $.ajax({
        method: 'GET',
        url: 'http://' + ip + ':8080/users/maxScores'

    }).done(function (nickScores) {
        console.log(nickScores);
        callback(nickScores);

    }).fail(function () {
        console.log("No se ha podido cargar el fichero");
    })
}

//Create item in server
function createUser(user, callback) {
    $.ajax({
        method: "POST",
        url: 'http://' + ip + ':8080/users',
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

//Update user in server
function updateUser(user) {
    $.ajax({
        method: 'PUT',
        url: 'http://' + ip + ':8080/users/' + user.id,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
        console.log("Updated user: " + JSON.stringify(user));
    })
}

//Delete item from server
function deleteUser(userId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://' + ip + ':8080/users/' + userId
    }).done(function (userId) {
        console.log("Deleted user " + userId);
    })
}

/////////////////////////////SALAS EMPAREJAMIENTO//

//Load grupos from server
function loadLobbies(callback) {
    $.ajax({
        url: 'http://' + ip + ':8080/lobbies'
    }).done(function (lobby) {
        console.log('Lobbys loaded: ' + JSON.stringify(lobby));
        callback(lobby);
    })
}

//Load grupos from server
function loadLobbyID(id, callback) {
    $.ajax({
        url: 'http://' + ip + ':8080/lobbies/' + id
    }).done(function (lobby) {
        console.log('Lobby loaded: ' + JSON.stringify(lobby));
        callback(lobby);
    })
}

//Update lobby in server
function updateLobby(lobby) {
	$.ajax({
        method: 'PUT',
        url: 'http://' + ip + ':8080/lobbies/' + lobby.id,
        data: JSON.stringify(lobby),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (lobby) {
        console.log("Updated grupo: " + JSON.stringify(lobby));
    }).fail( function(){
    	console.log("No se ha podido actualizar lobby.");
    })
}

function updateLobbyUser(lobby, user) {
    $.ajax({
        method: 'PUT',
        url: 'http://' + ip + ':8080/lobbies/' + lobby.id + '/' + user.id,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (lobby) {
        console.log("Updated grupo: " + JSON.stringify(lobby));
    }).fail( function(){
        console.log("No se ha podido actualizar lobby.");
    })
}

function deleteLobbyUser(lobby, user) {
    $.ajax({
        method: 'DELETE',
        url: 'http://' + ip + ':8080/lobbies/' + lobby.id + '/' + user.id,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
        console.log("Usuario borrado: " + JSON.stringify(user));
    }).fail( function(){
        console.log("No se ha podido actualizar lobby.");
    })
}

//Create lobby in server
function createLobby(lobby, callback) {
    $.ajax({
        method: "POST",
        url: 'http://' + ip + ':8080/lobbies',
        data: JSON.stringify(lobby),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (lobby) {
        console.log("Lobby created: " + JSON.stringify(lobby));
        callback(lobby);
    })
}

function showPW() {
	  var x = document.getElementById("lobbyPW");
	  if (x.type === "password") {
	    x.type = "text";
	  } else {
	    x.type = "password";
	  }
	}

//Show item in page
function showUser(user) {

    var ready = '';
    var style = '';

    if (user.ready) {
        ready = 'ready';
        style = 'style="text-decoration:line-through"';
    }

    $('#game').append(
        '<div id="user-' + user.id + '"><input type="checkbox" ' + checked + '><span ' + style + '>' + user.nick +
        '</span> <button>Delete</button></div>')
};