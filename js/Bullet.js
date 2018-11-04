var AsiloRoyale = AsiloRoyale || {};

var Bullet = function (game, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    	//this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    	this.anchor.set(0.5);

    	this.checkWorldBounds = true;
    	this.outOfBoundsKill = true;
    	this.exists = false;
        this.enableBody = true;

    	this.tracking = false;
    	this.scaleSpeed = 0;


};
	Bullet.prototype = Object.create(Phaser.Sprite.prototype);
    Bullet.prototype.constructor = Bullet;

    Bullet.prototype.fire = function (x, y, angle, speed, gx, gy, rotation,player) {

        this.body.static = true;
        this.reset(player.x,player.y);
        this.body.rotation = rotation;


        this.body.velocity.x = Math.cos(this.body.rotation) * speed;
        this.body.velocity.y = Math.sin(this.body.rotation) * speed;


    };

    Bullet.prototype.update = function () {


    };


