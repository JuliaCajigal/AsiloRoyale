//creamos una variable juego. El tamaño del lienzo será 800x600, se incrustará en el div 'game_block' del html

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game_block', { preload: preload, create: create, update: update });  
var player1;
var cursors;



//funcion que precarga de golpe todos los sprites y elementos necesarios para el juego
function preload() {

	game.load.image('baldosa1','img/baldosa1.jpg');
	game.load.image('viejo1', 'img/viejo1.png');

}


//función para crear los elementos del juego
function create() {

	//color de fondo
	//game.stage.backgroundColor = '#000047';

	//asigna el tamaño del mundo
	game.world.setBounds(0, 0, 1920, 1920);

	//pone una imagen tileada como fondo
	game.add.tileSprite(0, 0, 1920, 1920, 'baldosa1');

	//activa las fisicas p2js (??)
    game.physics.startSystem(Phaser.Physics.P2JS);

    //le asigna un sprite a player1
	player1 = game.add.sprite(game.world.centerX, game.world.centerY, 'viejo1');

	//le aplica las fisicas al player1
    game.physics.p2.enable(player1);

	//para poder utilizar las teclas
	cursors = game.input.keyboard.createCursorKeys();

	// modifica algunas propiedades del body (?)
    player1.body.fixedRotation = true;

    //para que la camara siga al jugador
    game.camera.follow(player1);
}



//funcion que se ejecuta continuamente durante el paso del tiempo
function update() {

	//Hace que el jugador 1 no tenga inercia en el movimiento
	player1.body.setZeroVelocity();

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


}


function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}
