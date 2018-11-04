var AsiloRoyale = AsiloRoyale || {};

var Weapon = {};


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

        var x = source.x;
        var y = source.y;
        var rotation = source.body.rotation;
        console.log(source.angleToPointer(this));
        //console.log(source.body.bounds);

        this.getFirstExists(false).fire(x, y, source.angle, this.bulletSpeed, 0, 0, rotation, source);

        this.nextFire = this.game.time.time + this.fireRate;

    };