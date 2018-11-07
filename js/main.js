var AsiloRoyale = AsiloRoyale || {};

//Means that if the object exists already, we’ll use it. Otherwise we’ll use a new object
//AsiloRoyale.game = new Phaser.Game(550, 400, Phaser.AUTO, '');
AsiloRoyale.game = new Phaser.Game(1150, 680,Phaser.CANVAS, 'game');

AsiloRoyale.game.state.add('Boot', AsiloRoyale.Boot);
 //uncomment these as we create them through the tutorial
AsiloRoyale.game.state.add('Preload', AsiloRoyale.Preload);
AsiloRoyale.game.state.add('MainMenu', AsiloRoyale.MainMenu);
AsiloRoyale.game.state.add('Game', AsiloRoyale.Game);
AsiloRoyale.game.state.add('GameOver', AsiloRoyale.GameOver);
AsiloRoyale.game.state.add('Controles', AsiloRoyale.GameOver);

AsiloRoyale.game.state.start('Boot');
