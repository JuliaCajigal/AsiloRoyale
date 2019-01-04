var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.game = new Phaser.Game(1150, 680,Phaser.CANVAS, 'game');


AsiloRoyale.game.state.add('Boot', AsiloRoyale.Boot);
AsiloRoyale.game.state.add('Preload', AsiloRoyale.Preload);
AsiloRoyale.game.state.add('MainMenu', AsiloRoyale.MainMenu);
AsiloRoyale.game.state.add('Game', AsiloRoyale.Game);
AsiloRoyale.game.state.add('GameOnline', AsiloRoyale.Game);
AsiloRoyale.game.state.add('GameOver', AsiloRoyale.GameOver);
AsiloRoyale.game.state.add('Controles', AsiloRoyale.Controles);
AsiloRoyale.game.state.add('OnlineLobby', AsiloRoyale.OnlineLobby);
AsiloRoyale.game.state.add('LobbyConfig', AsiloRoyale.LobbyConfig);
AsiloRoyale.game.state.add('Login', AsiloRoyale.Login);
AsiloRoyale.game.state.add('Scores', AsiloRoyale.Scores);


AsiloRoyale.game.state.start('Boot');
