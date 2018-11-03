var AsiloRoyale = AsiloRoyale || {};

var Bullet = function (game, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    	//this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    	this.anchor.set(0.5);

    	this.checkWorldBounds = true;
    	this.outOfBoundsKill = true;
    	this.exists = false;

    	this.tracking = false;
    	this.scaleSpeed = 0;

        this.velocityFromAngle = function (angle, speed, point){

                    if (speed === undefined) { speed = 60; }
                    point = new Phaser.Point(this.game.input.activePointer.clientX,this.game.input.activePointer.clientY);


                    //point = (this.game.input.activePointer.clientX , this.game.input.activePointer.clientY);
                    console.log(point);
                    console.log(this.game.input.activePointer.clientX);
                    console.log(this.game.input.activePointer.clientY);

                    return point.setToPolar(angle, speed, true);
        }


        this.angleToPointer = function (displayObject, pointer, world){

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
        },

        this.moveToPointer = function (displayObject, speed, pointer, maxTime){

                if (speed === undefined) { speed = 60; }
                pointer = pointer || this.game.input.activePointer;
                if (maxTime === undefined) { maxTime = 0; }

                var angle = this.angleToPointer(displayObject, pointer);

                if (maxTime > 0)
                {
                    //  We know how many pixels we need to move, but how fast?
                    speed = this.distanceToPointer(displayObject, pointer) / (maxTime / 1000);
                }

                displayObject.body.velocity.setToPolar(angle, speed);

            return angle;

        }

    };


	Bullet.prototype = Object.create(Phaser.Sprite.prototype);
    Bullet.prototype.constructor = Bullet;

    Bullet.prototype.fire = function (x, y, angle, speed, gx, gy, rotation) {

        gx = gx || 0;
        gy = gy || 0;

        this.reset(x, y);
        //this.scale.set(1);

        this.velocityFromAngle(angle, speed);

        this.angle = angle;
        this.body.rotation = rotation;

        //this.body.gravity.set(gx, gy);

    };

    Bullet.prototype.update = function () {
        
        this.body.velocity.x = 0;
        this.body.velocity.x = 600;

        //this.body.rotation = this.angleToPointer(this);

        if (this.tracking)
        {
            this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
        }

        if (this.scaleSpeed > 0)
        {
            this.scale.x += this.scaleSpeed;
            this.scale.y += this.scaleSpeed;
        }

    };
