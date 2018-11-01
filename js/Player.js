var AsiloRoyale = AsiloRoyale || {};

function Player(game, x, y, guned, shotguned, sprite) {

	Phaser.Sprite.call(this, game, x, y, sprite);

	this.speed = 120;
	this.game = game;
	this.guned = guned;
	this.shotguned = shotguned;
	this.sprite = null;
	this.life = 20;
	this.score = 0;
    this.ammogun = 10;
    this.ammoshotgun =12;



	//PISTOLA
	this.weaponG = this.game.add.weapon(30,'bala');
    // Velocidad a la que es lanzada la bala
    this.weaponG.bulletSpeed = 600;
    //cadencia de disparo
    this.weaponG.fireRate = 400;
    this.weaponG.trackSprite(this, 0, 0, true);
    //Para que la bala salga de la pistola
    this.weaponG.trackOffset.x = +90;
    //variables para activar la pistola
	

	//ESCOPETA
    this.weaponS = this.game.add.weapon(6*6,'perdigon');
    this.weaponS.bulletSpeed = 600;
    this.weaponS.fireRate = 850;
    this.weaponS.trackSprite(this, 0, 0, true);
    this.weaponS.trackOffset.x = +90;
    this.weaponS.multiFire = true;
	
			 

	this.angleToPointer = function (displayObject, pointer, world)
    {

        if (pointer === undefined) { pointer = this.game.input.activePointer; }
        if (world === undefined) { world = false; }

        if (world)
        {
            return Math.atan2(pointer.worldY - displayObject.world.y, pointer.worldX - displayObject.world.x);
        }
        else
        {
            return Math.atan2(pointer.worldY - displayObject.y, pointer.worldX - displayObject.x);
        }

    }
}
	

	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;


	Player.prototype.create= function() {
 
    }

	
	Player.prototype.update = function() {
	
		this.body.rotation = this.angleToPointer(this);

		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.body.velocity.y = 0;
		this.body.velocity.x = 0;


		//movimientos player
		if(this.cursors.up.isDown) {
			this.body.velocity.y -= 400;
		}
		else if(this.cursors.down.isDown) {
			this.body.velocity.y += 400;
		}
		if(this.cursors.left.isDown) {
			this.body.velocity.x -= 400;
		}
		else if(this.cursors.right.isDown) {
			this.body.velocity.x += 400;
		}
		//pistola
	if (this.game.input.activePointer.totalTouches == 1 && this.game.input.activePointer.isDown && this.guned==true && this.ammogun>0)
    {
        this.weaponG.fire();
        this.weaponG.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weaponG.bulletKillDistance = 700;
        this.shotgunned = false;
        if(this.weaponG.onFire){
        this.ammo--;
        }
        this.game.input.activePointer.totalTouches = 0;

        console.log(this.ammo);
    }
    //escopeta
    if (this.game.input.activePointer.totalTouches == 1 && this.game.input.activePointer.isDown && this.shotguned==true && this.ammoshotgun>0)
    {
        
        this.weaponS.bulletAngleVariance = 15;
        this.weaponS.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weaponS.bulletKillDistance = 450;
        this.weaponS.fireOffset(16, -16);
        this.weaponS.fireOffset(-16, 0);
        this.weaponS.fireOffset(0, 0);
        this.weaponS.fireOffset(16, -16);
        this.weaponS.fireOffset(16, 0);
        this.weaponS.fireOffset(16, -16);
        this.gunned = false;
        if(this.weaponS.onFire){
        this.ammoshotgun-=6;
    }
        this.game.input.activePointer.totalTouches=0;
        
    }
}
/*
    this.killBullets = function(bala,objeto){
        bala.kill();
    };

*/	





