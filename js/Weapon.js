var AsiloRoyale = AsiloRoyale || {};

function Weapon(game, x, y) {
	//this.bullets = this.game.add.group();
	//this.game.add.existing(this.bullets);
   /* this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.P2JS;
    this.bullets.createMultiple(30, 'bala', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);*/
/*
    this.SingleBullet = function (game) {

    	Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.P2JS);

    	this.nextFire = 0;
    	this.bulletSpeed = 600;
    	this.fireRate = 100;

    	for (var i = 0; i < 64; i++){
        	this.add(new Bullet(game, 'bala'), true);
    	}

    return this;*/



};
    
	

	Weapon.prototype = Object.create(Phaser.Sprite.prototype);
	Weapon.prototype.constructor = Weapon;


	Weapon.prototype.create= function() {
    }

	
	Weapon.prototype.update = function() {
		//this.bringToTop();
	}

	Weapon.SingleBullet = function (game) {

        Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.P2JS);

        
        this.nextFire = 0;
        this.bulletSpeed = 600;
        this.fireRate = 100;
        
        for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, 'bala'), true);
        }

        return this;

    }

    Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
    Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

    Weapon.SingleBullet.prototype.fire = function (source) {

        if (this.game.time.time < this.nextFire) { return; }

        var x = source.x + 10;
        var y = source.y + 10;

        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

        this.nextFire = this.game.time.time + this.fireRate;

    };