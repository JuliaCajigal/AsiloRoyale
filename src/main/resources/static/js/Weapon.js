var AsiloRoyale = AsiloRoyale || {};

var Weapon = {};


	Weapon.prototype = Object.create(Phaser.Sprite.prototype);
	Weapon.prototype.constructor = Weapon;

	Weapon.prototype.create= function() {
    }

	
	Weapon.prototype.update = function() {
	}

    ////////////////PISTOLA//////////////
	Weapon.Gun = function (game, bulletCG, tileCG, enemyCG,playerCG,player) {

        Phaser.Group.call(this, game, game.world, 'Gun', false, true, Phaser.Physics.P2JS);
        this.playerCG = playerCG;
        this.nextFire = 0;
        this.bulletSpeed = 800;
        this.fireRate = 100;
        
        for (var i = 0; i <= 10; i++)
        {
            this.add(new Bullet(game, 'bala', bulletCG, tileCG, enemyCG,playerCG,player), true);
        }

        return this;
    },


    Weapon.Gun.prototype = Object.create(Phaser.Group.prototype);
    Weapon.Gun.prototype.constructor = Weapon.Gun;


    ///////DISPARAR PISTOLA//////////
    Weapon.Gun.prototype.fire = function (source) {

        if (this.game.time.time < this.nextFire) { return; }

        var x = source.x;
        var y = source.y;
        var rotation = source.body.rotation;
        if(source.gunLoad >0){

        this.gun_fire = new Phaser.Sound(this.game, 'gun_fire');
        this.gun_fire.play();
        source.body.velocity.x = -Math.cos(source.body.rotation) * 50;
        source.body.velocity.y = -Math.sin(source.body.rotation) * 50;
        this.getFirstExists(false).fire(x, y, source.angle, this.bulletSpeed, 0, 0, rotation, source);

        this.nextFire = this.game.time.time + this.fireRate;
        //source.gunAmmo-=1;
        source.gunLoad -=1;
        }else if(source.gunLoad<=0){
                this.empty_weapon = new Phaser.Sound(this.game, 'empty_weapon');
                this.empty_weapon.play();
        }

    },
    /////////RECARGAR PISTOLA////////
    Weapon.Gun.prototype.reload = function (source, game, bulletCG, tileCG, enemyCG,playerCG){

    	
    	if (source.gunLoad + source.gunAmmo>=6){
    	newLoad = 6 - source.gunLoad;
    	source.gunLoad += newLoad;
    	source.gunAmmo -= newLoad;
    	//crea las balas
        for (var i = 0; i <= newLoad; i++)
        {
            this.add(new Bullet(game, 'bala', bulletCG, tileCG, enemyCG,playerCG,source), true);
            
        }
    	}else if (source.gunLoad + source.gunAmmo <=6){
    		newLoad = source.gunLoad + source.gunAmmo;
    		source.gunLoad = newLoad;
    		source.gunAmmo=0;
    	}
    	
    	
    },


    //////////////////////////////ESCOPETA////////////////////////////////
    Weapon.Shotgun = function (game, bulletCG, tileCG, enemyCG,playerCG,player) {

        Phaser.Group.call(this, game, game.world, 'Shotgun', false, true, Phaser.Physics.P2JS);

        this.playerCG = playerCG;
        this.nextFire = 200000;
        this.bulletSpeed = 800;
        this.fireRate =400;
      
        for (var i = 0; i < 30; i++)
        {
            this.add(new Bullet(game, 'perdigon',  bulletCG, tileCG, enemyCG,playerCG,player), true);
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

        if(source.shotgunLoad>0){
        this.shotgun_fire = new Phaser.Sound(this.game, 'shotgun_fire');
        this.shotgun_fire.play();
        source.body.velocity.x = -Math.cos(source.body.rotation) * 400;
        source.body.velocity.y = -Math.sin(source.body.rotation) * 400;

        this.nextFire = this.game.time.time + this.fireRate;
        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation,source);
        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation-25,source);
        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation-50,source);
        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation+25,source);
        this.getFirstExists(false).fire(x, y, source.angle, 600, 0, 0,source.rotation+50,source);

        source.shotgunLoad-=5;
        }
        else if(source.shotgunLoad<=0){
                this.empty_weapon = new Phaser.Sound(this.game, 'empty_weapon');
                this.empty_weapon.play();
        }
    },
    //////RECARGAR ESCOPETA///////
    Weapon.Shotgun.prototype.reload = function (source, game, bulletCG, tileCG, enemyCG,playerCG){
    	if (source.shotgunLoad + source.shotgunAmmo>=15){
    		
        	newLoad = 15 - source.shotgunLoad;
        	source.shotgunLoad += newLoad;
        	source.shotgunAmmo -= newLoad;
        	//crea las balas
            for (var i = 0; i <= newLoad; i++)
            {
                this.add(new Bullet(game, 'perdigon', bulletCG, tileCG, enemyCG,playerCG,source), true);
            }
            
        	}else if (source.shotgunLoad + source.shotgunAmmo <=15){
        		source.shotgunLoad = source.shotgunLoad + source.shotgunAmmo;
        		source.shotgunAmmo=0;
        	}
    };
