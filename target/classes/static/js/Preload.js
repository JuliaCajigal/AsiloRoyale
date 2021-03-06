var AsiloRoyale = AsiloRoyale || {};

AsiloRoyale.Preload = function() {
};

AsiloRoyale.Preload.prototype = {

	preload : function() {

		// Logo pantalla de carga
		this.splash = this.add.sprite(this.game.world.centerX - 100,
				this.game.world.centerY, 'carta_ajuste');
		this.splash.anchor.setTo(0.5);
		this.splash = this.add.sprite(0, 0, 'tv');

		// Cargar fuente
		var text = "";
		this.game.add.text(0, 0, text, {
			font : "bold 40px 'VT323'",
			fill : "black",
			align : "center"
		});

		// Barra de carga
		this.preloadBar = this.add.sprite(this.game.world.centerX,
		this.game.world.centerY + 128, 'preloadBar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);

		// Preload de assets
		this.load.tilemap('level1', 'assets/tilemaps/untitled.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('gameTiles', 'assets/tilesets/tiles.png');
		this.load.image('pasti_roja', 'assets/images/pasti_roja.png');
		this.load.image('pasti_verde', 'assets/images/pasti_verde.png');
		this.load.image('balas_pistola', 'assets/images/balas_pistola.png');
		this.load.image('cartucho_escopeta','assets/images/cartucho_escopeta.png');
		this.load.image('botiquin', 'assets/images/botiquin.png');
		this.load.image('pasti_morada', 'assets/images/pasti_morada.png');
		this.load.image('pasti_amarilla', 'assets/images/pasti_amarilla.png');
		this.load.image('gun', 'assets/images/gun.png');
		this.load.image('shotgun', 'assets/images/shotgun.png');
		this.load.image('player_escopeta', 'assets/images/viejo1_escopeta.png');
		this.load.image('chooseNick', 'assets/images/choose.png');
		this.load.image('esquema', 'assets/images/esquema.png');
		this.load.image('enemy', 'assets/images/enemy.png');
		this.load.image('blood', 'assets/images/sangre.png');
		this.load.image('High_scores', 'assets/images/high_scores.png');
		this.load.image('tabla_conectados','assets/images/tabla_conectados.png');
		this.load.image('noise','assets/images/ruido.png');
		this.load.spritesheet('botonesjugar','assets/images/offlinebutton.png', 256, 128, 2);
		this.load.spritesheet('okbutton', 'assets/images/okbutton.png', 128, 128, 2);
		this.load.spritesheet('onlinebutton', 'assets/images/onlinebutton.png', 256, 128, 2);
		this.load.spritesheet('readybutton', 'assets/images/readybutton.png', 256, 128, 2);
		this.load.spritesheet('botonessalir', 'assets/images/exitbutton.png', 256, 128, 2);
		this.load.spritesheet('dientes', 'assets/images/dientes.png', 32, 32);
		this.load.spritesheet('dientes', 'assets/images/dientes.png', 32, 32);
		this.load.spritesheet('enfermero', 'assets/images/enfermero.png', 128, 128);
		this.load.spritesheet('player', 'assets/images/viejo1_sheet.png', 126, 64);
		this.load.spritesheet('player2', 'assets/images/viejo2_sheet.png',126,64);
		this.load.spritesheet('iconos_municion', 'assets/images/iconos_municion.png', 40, 40);
		this.load.spritesheet('crearSala','assets/images/salaprivada.png', 256, 85, 2);
		this.load.spritesheet('unirseSala','assets/images/usalaprivada.png', 256, 85, 2);
		this.load.spritesheet('salaRandom','assets/images/salaaleatoria.png', 256, 85, 2);
		this.load.image('serveroff', 'assets/images/serveroff.png');
		this.load.image('star', 'assets/images/star.png');
		this.load.image('letrasgameover', 'assets/images/gameover.jpg', 256, 128, 2);
		this.load.image('perdigon', 'assets/images/perdigon.png');
		this.load.image('results', 'assets/images/results.png');
		this.load.image('space', 'assets/images/space.png');
		this.load.image('ARlogo', 'assets/images/AR_logo.png');
		this.load.image('bala', 'assets/images/bala.png');
		this.load.image('lifebaru', 'assets/images/lifebars_up.png');
		this.load.image('lifebardw', 'assets/images/lifebars_dw.png');
		this.load.image('view_shotgun', 'assets/images/shotgun_view.png');
		this.load.image('guni', 'assets/images/gun_icon.png');
		this.load.image('shotguni', 'assets/images/shotgun_icon.png');
		this.load.image('jeremin_info', 'assets/images/jeremin_info.png');
		this.load.image('agnes_info', 'assets/images/agnes_info.png');
		this.load.image('copa', 'assets/images/copa.png');
		this.load.image('tabla_salaP', 'assets/images/tabla_salaP.png');
		this.load.image('tabla_joinP', 'assets/images/tabla_joinP.png');
		this.load.image('mission_info', 'assets/images/letrero_mision.png');
		this.load.image('mission_info2', 'assets/images/letrero_mision2.png');
		this.load.image('mission_info3', 'assets/images/letrero_mision3.png');
		this.load.image('ok', 'assets/images/ok_lobby.png');
		this.load.image('mando', 'assets/images/mando.png');
		this.load.audio('collect_weapon', 'assets/audio/collect_weapon.wav');
		this.load.audio('gun_fire', 'assets/audio/gun_fire.mp3');
		this.load.audio('bite', 'assets/audio/mordisco.wav');
		this.load.audio('swallow', 'assets/audio/tragar.mp3');
		this.load.audio('shotgun_fire', 'assets/audio/disparo_escopeta.mp3');
		this.load.audio('collect_ammo', 'assets/audio/collect_ammo.wav');
		this.load.audio('empty_weapon', 'assets/audio/empty_weapon.wav');
		this.load.audio('heal', 'assets/audio/heal.wav');
		this.load.audio('punch', 'assets/audio/punch.wav');
		this.load.audio('click', 'assets/audio/click.wav');
		this.load.audio('white_noise', 'assets/audio/white_noise.wav');
		this.load.audio('control_sound', 'assets/audio/control_sound.wav')
		this.game.load.physics('player_physics','assets/physics/viejo_physics.json');
		this.load.image('intro', 'assets/images/noticias.png');
		this.load.image('dead', 'assets/images/dead.png');
	},

	create : function() {
		this.state.start('Intro');
	}
};
