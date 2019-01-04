var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.LobbyConfig = function(){};

var inum, ipw, input;

AsiloRoyale.LobbyConfig.prototype = {


    create: function() {

      //Recogemos el valor del input y bloqueamos el cuadro de di-alogo
      input = document.getElementById('username');
      input.style.display = 'none';
      inum = document.getElementById('lobbyNUM');
      ipw = document.getElementById('lobbyPW');
      
      //Creamos un nuevo usuario con id + nick
      this.newUser = new User(this.game, lobbyUser.id, lobbyUser.nick);
      
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

  },
    

    // Recibimos el usuario desde Login
    init: function(currentUser){
      lobbyUser = currentUser;
      console.log(JSON.stringify(lobbyUser));
    },


    update: function() {
        var that = this;
        var escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

      if(escKey.isDown){
            deleteUser(lobbyUser.id);
            this.game.state.start('MainMenu');
            inum.style.display = 'none';
            ipw.style.display = 'none';
        //this.game.state.start('OnlineLobby', false, false, lobbyUser);
              
      }
    },

    joinLobbyOptions: function(){
    
      //Hacemos visibles cuadros de texto y botón de aceptar
      inum.style.display = 'block';
      ipw.style.display = 'block';

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


            if(exists){
              
              inum.style.display = 'none';
              ipw.style.display = 'none';

              for(var i = 0; i < currentLobby.users.length; i++){
                if(currentLobby.users[i] == null && enter == false){
                  currentLobby.users[i] = lobbyUser;
                  enter = true;
                }
              }
              console.log(lobbies);
              console.log(currentLobby);

              updateLobby(currentLobby);
              loadLobbies(function (lobbies) {
                console.log(lobbies);
                that.game.state.start('OnlineLobby', true, false, lobbyUser, currentLobby);
              });

            }else{
              that.warningExist();
          }
    });
},  

    privateLobbyOptions: function(){
    
      //Hacemos visibles cuadros de texto y botón de aceptar
      inum.style.display = 'block';
      ipw.style.display = 'block';


      var tabla_salaP = this.game.add.sprite(460, 80, 'tabla_salaP');
      tabla_salaP.fixedToCamera = true;

      //Botón aceptar sala privada
      var salaPOK = this.game.add.button(650, this.game.height/2 + 265,'ok', this.privateLobby, this,0,0,1,0);
      salaPOK.anchor.setTo(0.5);
    
    //Ok.visible = true;
 
  },
    
    privateLobby: function(){
      console.log('PRIVATELOBBY');

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
              if(lobbies[i].num == NUM_value){
                  available = false;
                      
                } 
              }
      });

      if(available){
                    
          var lobby = {
                num: NUM_value,
                password: PW_value,
                users: [lobbyUser, null, null, null]
          }
            
          console.log(lobby);
          inum.style.display = 'none';
          ipw.style.display = 'none';

          createLobby(lobby, function (lobbyWithId) {
            currentLobby = lobbyWithId;
            that.game.state.start('OnlineLobby', true, false, lobbyUser, currentLobby);
          });
      }else{
          this.warning();
      }
},

    joinRandom: function(){

      var lobby;
      var that = this;

      loadLobbies(function (lobbies) {
            var aleatorio = Math.round(Math.random()*lobbies.length);
            console.log(lobbies[aleatorio]);
            lobby = lobbies[aleatorio];

            inum.style.display = 'none';
            ipw.style.display = 'none';

            console.log(lobby.id);

            updateLobby(lobby, lobbyUser);
            that.game.state.start('OnlineLobby', true, false, lobbyUser, lobby);
      });
      
    },

    warning: function () {
          var style = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "center" };
          var text = 'Lobby ocupado, escoge otro ID o únete desde JOIN LOBBY'; 
          var warning = this.game.add.text(470, 350, text, style);
    },

    warningExist: function () {
          var style = {font: "bold 38px 'VT323'", fill: "#51F55B", align: "center" };
          var text = 'Número o contraseña \n incorrectos'; 
          var warning = this.game.add.text(470, 350, text, style);
    }
};
