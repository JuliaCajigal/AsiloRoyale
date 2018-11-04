var AsiloRoyale = AsiloRoyale || {};

var Weapon = {};


	Weapon.prototype = Object.create(Phaser.Sprite.prototype);
	Weapon.prototype.constructor = Weapon;


	Weapon.prototype.create= function() {
    }

	
	Weapon.prototype.update = function() {
		//this.bringToTop();
	}

	Weapon.Gun = function (game) {

        Phaser.Group.call(this, game, game.world, 'Gun', false, true, Phaser.Physics.P2JS);


        this.nextFire = 0;
        this.bulletSpeed = 800;
        this.fireRate = 100;

        for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, 'bala'), true);
        }

        return this;

    }

    Weapon.Gun.prototype = Object.create(Phaser.Group.prototype);
    Weapon.Gun.prototype.constructor = Weapon.SingleBullet;

    Weapon.Gun.prototype.fire = function (source) {

        if (this.game.time.time < this.nextFire) { return; }

        var x = source.x;
        var y = source.y;
        var rotation = source.body.rotation;
        console.log(source.angleToPointer(this));
        //console.log(source.body.bounds);
        if(source.gunAmmo>0){
        this.getFirstExists(false).fire(x, y, source.angle, this.bulletSpeed, 0, 0, rotation, source);

        this.nextFire = this.game.time.time + this.fireRate;
        source.gunAmmo-=1;
    }

    },
    //////////////////////////////ESCOPETA////////////////////////////////
    Weapon.Shotgun = function (game) {

        Phaser.Group.call(this, game, game.world, 'Shotgun', false, true, Phaser.Physics.P2JS);


        this.nextFire = 200000;
        this.bulletSpeed = 600;
        this.fireRate = 2000;

        for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, 'perdigon'), true);
        }

        return this;

    },

    Weapon.Shotgun.prototype = Object.create(Phaser.Group.prototype);
    Weapon.Shotgun.prototype.constructor = Weapon.SingleBullet;




    Weapon.Shotgun.prototype.fire= function(source) {

        if (this.game.time.time < this.nextFire) { return; }

        var rotation = 0;
        var x = source.x;
        var y = source.y;


        if(source.shotgunAmmo>0){

        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation,source);
        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation-25,source);
        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation-50,source);
        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation+25,source);
        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation+50,source);

        source.shotgunAmmo-=5;
        }
    };
