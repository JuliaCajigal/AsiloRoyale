var AsiloRoyale = AsiloRoyale || {};

var usersLimit = 5;
var currentUsers = 0;

//Load items from server
function loadUsers(callback) {
    $.ajax({
        url: 'http://localhost:8080/users'
    }).done(function (users) {
        console.log('Users loaded: ' + JSON.stringify(users));
        callback(users);
    })
}

//Create item in server
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

//Update user in server
function updateUser(user) {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/users/' + user.id,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
        console.log("Updated user: " + JSON.stringify(user))
    })
}

//Delete item from server
function deleteUser(userId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/users/' + userId
    }).done(function (userId) {
        console.log("Deleted user " + userId)
    })
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
}

$(document).ready(function () {

    loadUsers(function (users) {
        //When items are loaded from server
        for (var i = 0; i < users.length; i++) {
            showUser(users[i]);
        }
    });

    var input = $('#username')
    var info = $('#game')

    //Handle delete buttons
    info.click(function (event) {
        var elem = $(event.target);
        if (elem.is('button')) {
            var userDiv = elem.parent();
            var userId = userDiv.attr('id').split('-')[1];
            userDiv.remove()
            deleteUser(userId);
        }
    })

    //Handle items checkboxs
    info.change(function (event) {

        //Get page elements for item
        var checkbox = $(event.target);
        var userDiv = checkbox.parent();
        var textSpan = userDiv.find('span');

        //Read item info from elements
        var userNick = textSpan.text();
        var userChecked = checkbox.prop('checked');
        var userId = userDiv.attr('id').split('-')[1];

        //Create updated item
        var updatedUser = {
            id: userId,
            nick: userNick,

        }

        //Update item in server
        updateUser(updatedUser);

        //Update page when checked
        var style = userChecked ? 'line-through' : 'none';
        textSpan.css('text-decoration', style);

    })

    //Handle add button
    $("#ok-button").click(function () {

        var value = input.val();
        input.val('');
        console.log("AQUI");

        loadUsers(function (users) {
        //When items are loaded from server
        for (var i = 0; i < users.length; i++) {
                currentUsers++;
                console.log(currentUsers);
            }
        });

        var user = {
            nick: value,
            ready: false
        }

        if(currentUsers<=5){
            createUser(user, function (userWithId) {
                //When item with id is returned from server
                //showItem(itemWithId);
            });
        }else{
             alert("Lobby full!");
        }
    })
})