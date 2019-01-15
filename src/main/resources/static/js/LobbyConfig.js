var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.LobbyConfig = function(){};

var inum, ipw, ch, input, pwim;
var myUser;

AsiloRoyale.LobbyConfig.prototype = {


    create: function() {

      //Recogemos el valor del input y bloqueamos el cuadro de di-alogo
      input = document.getElementById('username');
      input.style.display = 'none';
      pwim = document.getElementById('passw');
      pwim.style.display = 'none';
      inum = document.getElementById('lobbyNUM');
      ipw = document.getElementById('lobbyPW');
      ch = document.getElementById('check');
      
      //Dimensiones del mundo y cámara
      this.game.camera.setBoundsToWorld();
      this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
      this.background.autoScroll(20, 0);
        
      //TV
      this.tv = this.game.add.sprite(0, 0, 'tv');
      this.tv.fixedToCamera = true;
           
    
      //Botón crear SALA PRIVADA
      var salaP = this.game.add.button(250, this.game.height/2 - 100,'crearSala', this.privateLobbyOptions, this,0,0,0,1);
      salaP.anchor.setTo(0.5);

    
      //Botón unirse SALA PRIVADA
      var salaR = this.game.add.button(250, this.game.height/2,'unirseSala', this.joinLobbyOptions, this,0,0,0,1);
      salaR.anchor.setTo(0.5);

      //Botón unirse RANDOM
      var exit = this.game.add.button(250, this.game.height/2 + 100,'salaRandom', this.joinRandom, this,0,0,0,1);
      exit.anchor.setTo(0.5);
      
      this.click = new Phaser.Sound(this.game, 'click');

      conection();

  },

    // Recibimos el usuario desde Login
    init: function(currentUser, skin){
      myUser = new User(this.game, currentUser.id, currentUser.nick, skin);
      myUser.online = true;
      currentUser.skin = skin;
     // console.log(JSON.stringify(currentUser));
    },


    update: function() {
        var that = this;
        var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        var F5Key = this.game.input.keyboard.addKey(Phaser.Keyboard.F5);

        if(escKey.isDown || F5Key.isDown){
            deleteUser(currentUser.id);
            this.click.play();
            this.game.state.start('MainMenu');
            inum.style.display = 'none';
            ipw.style.display = 'none';
            ch.style.display = 'none';
        //this.game.state.start('OnlineLobby', false, false, lobbyUser);
      }
    },
    
    checkUser: function(){
    	if(currentUser.inactivityTime >= 8){
    		deleteUser(currentUser.id);
    	}
    },

    joinLobbyOptions: function(){
    	this.click.play();
      //Hacemos visibles cuadros de texto y botón de aceptar
      inum.style.display = 'block';
      ipw.style.display = 'block';
      ch.style.display = 'block';

      var tabla_salaP = this.game.add.sprite(460, 80, 'tabla_joinP');
      tabla_salaP.fixedToCamera = true;


      //Botón aceptar sala privada
      var salaPOK = this.game.add.button(650, this.game.height/2 + 265,'ok', this.joinLobby, this,0,0,1,0);
      salaPOK.anchor.setTo(0.5);
   },

    joinLobby: function(){
      console.log('PRIVATELOBBY');
      
      var num = $('#lobbyNUM')
      var NUM_value = num.val();
      var Pw = $('#lobbyPW')
      var PW_value = Pw.val();
      var exists = false;
      var that = this;
      var currentLobby;
      var enter = false;
      
      num.val('');
      Pw.val('');
          
      loadLobbies(function (lobbies) {
            for (var i = 0; i < lobbies.length; i++) {
            	                        
              //Comprobamos si el lobby ya existe
              if(lobbies[i].num == NUM_value && lobbies[i].password == PW_value){
            	  exists = true;
                  currentLobby = lobbies[i];    
                } 
              }


            if(!exists){
            	that.warningExist();
            }else{
              inum.style.display = 'none';
              ipw.style.display = 'none';
              ch.style.display = 'none';

              for(var i = 0; i < currentLobby.users.length; i++){
                if(currentLobby.users[i] == null && enter == false){
                  currentLobby.users[i] = currentUser;
                  enter = true;
                }
              }
              console.log(lobbies);
              console.log(currentLobby);

              updateLobby(currentLobby);
              loadLobbies(function (lobbies) {
                console.log(lobbies);
                that.click.play();
                that.game.state.start('OnlineLobby', true, false, currentUser, currentLobby);
              })
              
          }
    });
},  

    privateLobbyOptions: function(){
    	this.click.play();
      //Hacemos visibles cuadros de texto y botón de aceptar
      inum.style.display = 'block';
      ipw.style.display = 'block';
      ch.style.display = 'block';


      var tabla_salaP = this.game.add.sprite(460, 80, 'tabla_salaP');
      tabla_salaP.fixedToCamera = true;

      //Botón aceptar sala privada
      var salaPOK = this.game.add.button(650, this.game.height/2 + 265,'ok', this.privateLobby, this,0,0,1,0);
      salaPOK.anchor.setTo(0.5);
    
    //Ok.visible = true;
 
  },
    
    privateLobby: function(){
      //console.log('PRIVATELOBBY');

      var num = $('#lobbyNUM')
      var NUM_value = num.val();
      var Pw = $('#lobbyPW')
      var PW_value = Pw.val();
      var available = true;
      var that = this;
      
      num.val('');
      Pw.val('');
          
      loadLobbies(function (lobbies) {
            for (var i = 0; i < lobbies.length; i++) {
                        
              //Comprobamos si el lobby ya existe
              if(lobbies[i].num == NUM_value && lobbies[i].password == PW_value){
                  available = false;
                      
                } 
              }
            
            if(!available){
            	that.warning();
            }else{

                    currentUser.host = true;
                              
                    var lobby = {
                          num: NUM_value,
                          password: PW_value,
                          users: [currentUser, null, null, null]
                    }
                      
                   // console.log(lobby);
                    inum.style.display = 'none';
                    ipw.style.display = 'none';
                    ch.style.display = 'none';

                    createLobby(lobby, function (lobbyWithId) {
                      currentLobby = lobbyWithId;
                      that.click.play();
                      that.game.state.start('OnlineLobby', true, false, currentUser, currentLobby);
                    })
            }
      });
},

joinRandom: function(){

    var lobby;
    var that = this;

    loadLobbies(function (lobbies) {
          var aleatorio = Math.round(Math.random()*lobbies.length - 1);
          console.log(aleatorio);
          lobby = lobbies[aleatorio];

          inum.style.display = 'none';
          ipw.style.display = 'none';
          ch.style.display = 'none';

          if(aleatorio == -1){
              currentUser.host = true;
                  
              var lobby = {
              id: lobby.id,
              num: 1111,
              password: aleatorio,
              users: [currentUser, null, null, null]
              }

              createLobby(lobby, function (lobbyWithId) {
              currentLobby = lobbyWithId;
              that.click.play();
              that.game.state.start('OnlineLobby', true, false, currentUser, currentLobby);
        });
          }

          console.log(lobby.id);

          updateLobby(lobby, currentUser);
          that.click.play();
          that.game.state.start('OnlineLobby', true, false, currentUser, lobby);
    });
    
  },

    warning: function () {
          var style = {font: "bold 30px 'VT323'", fill: "#51F55B", align: "center" };
          var text = 'Lobby ocupado, \nescoge otro ID o \núnete desde JOIN LOBBY'; 
          var warning = this.game.add.text(510, 450, text, style);
    },

    warningExist: function () {
          var style = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "center" };
          var text = 'Número o contraseña \nincorrectos'; 
          var warning = this.game.add.text(490, 450, text, style);
    }
};
