var AsiloRoyale = AsiloRoyale || {};

var Weapon = {};


	Weapon.prototype = Object.create(Phaser.Sprite.prototype);
	Weapon.prototype.constructor = Weapon;

	Weapon.prototype.create= function() {
    }

	
	Weapon.prototype.update = function() {
	}

    ////////////////PISTOLA//////////////
	Weapon.Gun = function (game, bulletCG, tileCG, enemyCG) {

        Phaser.Group.call(this, game, game.world, 'Gun', false, true, Phaser.Physics.P2JS);

        this.nextFire = 0;
        this.bulletSpeed = 800;
        this.fireRate = 100;

        for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, 'bala', bulletCG, tileCG, enemyCG), true);
        }

        return this;
    }


    Weapon.Gun.prototype = Object.create(Phaser.Group.prototype);
    Weapon.Gun.prototype.constructor = Weapon.Gun;


    ///////DISPARAR PISTOLA//////////
    Weapon.Gun.prototype.fire = function (source) {

        if (this.game.time.time < this.nextFire) { return; }

        var x = source.x;
        var y = source.y;
        var rotation = source.body.rotation;
        if(source.gunAmmo>0){

        this.gun_fire = new Phaser.Sound(this.game, 'gun_fire');
        this.gun_fire.play();
        source.body.velocity.x = -Math.cos(source.body.rotation) * 50;
        source.body.velocity.y = -Math.sin(source.body.rotation) * 50;
        this.getFirstExists(false).fire(x, y, source.angle, this.bulletSpeed, 0, 0, rotation, source);

        this.nextFire = this.game.time.time + this.fireRate;
        source.gunAmmo-=1;
        }else if(source.gunAmmo<=0){
                this.empty_weapon = new Phaser.Sound(this.game, 'empty_weapon');
                this.empty_weapon.play();
        }

    },


    //////////////////////////////ESCOPETA////////////////////////////////
    Weapon.Shotgun = function (game, bulletCG, tileCG, enemyCG) {

        Phaser.Group.call(this, game, game.world, 'Shotgun', false, true, Phaser.Physics.P2JS);


        this.nextFire = 200000;
        this.bulletSpeed = 800;
        this.fireRate = 2000;
        for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, 'perdigon',  bulletCG, tileCG, enemyCG), true);
        }

        return this;

    },

    Weapon.Shotgun.prototype = Object.create(Phaser.Group.prototype);
    Weapon.Shotgun.prototype.constructor = Weapon.Gun;



    //////////////////////DISPARAR ESCOPETA//////////////////////////////
    Weapon.Shotgun.prototype.fire= function(source) {

        if (this.game.time.time < this.nextFire) { return; }

        var rotation = 0;
        var x = source.x;
        var y = source.y;

        if(source.shotgunAmmo>0){
        this.shotgun_fire = new Phaser.Sound(this.game, 'shotgun_fire');
        this.shotgun_fire.play();
        source.body.velocity.x = -Math.cos(source.body.rotation) * 400;
        source.body.velocity.y = -Math.sin(source.body.rotation) * 400;

        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation,source);
        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation-25,source);
        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation-50,source);
        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation+25,source);
        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation+50,source);

        source.shotgunAmmo-=5;
        }
        else if(source.shotgunAmmo<=0){
                this.empty_weapon = new Phaser.Sound(this.game, 'empty_weapon');
                this.empty_weapon.play();
        }
    };
