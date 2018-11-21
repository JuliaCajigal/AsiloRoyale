var AsiloRoyale = AsiloRoyale || {};

var Bullet = function (game, key, bulletCG, tileCG, enemyCG) {

    Phaser.Sprite.call(this, game, 0, 0, key);

        //Atributos
    	this.anchor.set(0.5);
    	this.checkWorldBounds = true;
    	this.outOfBoundsKill = true;
    	this.exists = false;
        this.enableBody = true;

    	this.tracking = false;
    	this.scaleSpeed = 0;
        this.bulletCG = bulletCG;
        this.tileCG = tileCG;
        this.enemyCG = enemyCG;


};
	Bullet.prototype = Object.create(Phaser.Sprite.prototype);
    Bullet.prototype.constructor = Bullet;


    //Disparar
    Bullet.prototype.fire = function (x, y, angle, speed, gx, gy, rotation,player) {

        this.reset(player.x,player.y);
        this.body.rotation = rotation;

        this.body.velocity.x = Math.cos(this.body.rotation) * speed;
        this.body.velocity.y = Math.sin(this.body.rotation) * speed;


    },
    
    
    Bullet.prototype.update = function () {

        this.body.setCollisionGroup(this.bulletCG);
        this.body.collides(this.tileCG, this.destroyBullet, this);
        this.body.collides(this.enemyCG);
    },

    //Destruir bala
    Bullet.prototype.destroyBullet = function (body, body2) {
        body.sprite.destroy();

    };


