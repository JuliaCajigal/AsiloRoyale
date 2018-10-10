
//creamos una variable juego. El tamaño del lienzo será 800x600, se incrustará en el div 'game_block' del html

var game = new Phaser.Game(1000, 700, Phaser.CANVAS, 'game_block', { preload: preload, create: create, update: update });  

//////VARIABLES/////
var player1;
var cursors;
var bullets;
var sofa;
var maceta;
var shootingRatio = 100;
var nextShoot = 0;
var disparoPistola;
var pistola;


//funcion que precarga de golpe todos los sprites y elementos necesarios para el juego
function preload() {

	game.load.image('baldosa_cocina','img/baldosa_cocina.png');
	game.load.image('maceta','img/maceta.png');
	game.load.image('palmera','img/palmera.png');
	game.load.image('viejo1', 'img/viejo1.png');
	game.load.image('bala','img/bala.png');
	game.load.image('sofa','img/sofa.png');
	game.load.audio('disparo_pistola', 'sound/disparo_pistola.mp3');
	game.load.image('pistola', 'img/pistola.png');
}


//función para crear los elementos del juego
function create() {



	//asigna el tamaño del mundo
	game.world.setBounds(0, 0, 1920, 1920);

	//pone una imagen tileada como fondo
	game.add.tileSprite(0, 0, 1920, 1920, 'baldosa_cocina');


	disparoPistola = game.add.audio('disparo_pistola');


	sofa = game.add.sprite(200, 200, 'sofa');
  	maceta = game.add.sprite(350, 220, 'maceta');
  	pistola = game.add.sprite(500,400,'pistola');

	//activa las fisicas Arcade, las usaremos para que el player1 rote con el raton
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//activa las fisicas p2js (??), las usamos para mover el player1
    game.physics.startSystem(Phaser.Physics.P2JS);

    //le asigna un sprite a player1
	player1 = game.add.sprite(game.world.centerX, game.world.centerY, 'viejo1');

	//le aplica las fisicas al player1
    game.physics.p2.enable(player1);

	//para poder utilizar las teclas
	cursors = game.input.keyboard.createCursorKeys();

	// modifica algunas propiedades del body (?)
    player1.body.fixedRotation = true;

    //////CÁMARA//////
    //para que la camara siga al jugador
    game.camera.follow(player1);

    //////BALAS//////

    maceta = game.add.sprite(65, 220, 'palmera');

    //hace que la bala sea un grupo para que todas las balas sean iguales
    bullets = game.add.group();
    //le aplica un cuerpo a las balas, para poder modificar sus atributos
    bullets.enableBody = true;

    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(30, 'bala');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
}



//funcion que se ejecuta continuamente durante el paso del tiempo
function update() {

	//Hace que el jugador 1 no tenga inercia en el movimiento
	player1.body.setZeroVelocity();

	//player 1 se orienta siempre hacia el ratón
	player1.rotation = game.physics.arcade.angleToPointer(player1);

	//asigna el movimiento a las teclas de flecha
	if (cursors.left.isDown)
	{
        player1.body.moveLeft(400);
    }
    else if (cursors.right.isDown)
    {
        player1.body.moveRight(400);
    }

    if (cursors.up.isDown)
    {
        player1.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
        player1.body.moveDown(400);
    }

    //Si hacemos click con el raton llamamos a la funcion disparar
    if (game.input.activePointer.isDown)
    {
        shoot();
    }

    function shoot() {

    if (game.time.now > nextShoot && bullets.countDead() > 0)
    {
        nextShoot = game.time.now + shootingRatio;

        var bullet = bullets.getFirstDead();

        disparoPistola.play();

        bullet.reset(player1.x, player1.y);

        game.physics.arcade.moveToPointer(bullet, 600);
    }

}


}
