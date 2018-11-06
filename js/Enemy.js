var AsiloRoyale = AsiloRoyale || {};

function Enemy(game, x, y, sprite, speed, life,loopsI,loopsD ) {
	Phaser.Sprite.call(this, game, x, y, sprite);
	
	this.speed = speed;
	this.game = game;
	this.sprite = null;
	this.life = life;
	this.alive = true;
	this.loopsI=-loopsI;
	this.loopsD=-loopsD;
	this.loopsII=loopsI;
	this.loopsDI=loopsD;
	this.moves=false;

	this.walkD = this.animations.add('right', [0, 1], 8,true);
	this.walkI = this.animations.add('left', [2, 3], 8,true);


	
}
	
	Enemy.prototype = Object.create(Phaser.Sprite.prototype);
	Enemy.prototype.constructor = Enemy;/*** Automatically called by World.update*/

	Enemy.prototype.create= function() {	


	}
	
	Enemy.prototype.update = function() {

	

		if(this.loopsI<=0){

			this.body.x += 2;
			this.loopsI+=2;
				this.animations.play('right');

		}else if(this.loopsD<=0){
			this.body.x  -= 2;
			this.loopsD +=2;
			this.animations.play('left');

		}else if(this.loopsI>=0 && this.loopsD>=0){
			this.loopsI=-this.loopsII;
			this.loopsD=-this.loopsDI;

		}
		
		this.isAlive();


		
	
	}

	Enemy.prototype.damage = function(amount) {

    	this.life -= amount;
    	this.alpha -= 2;
    	//this.alpha += 2;

    	if (this.life <= 0){
    		
        	this.alive = false;
        	//this.player.kill();

        return true;
    	}

    return false;

	}

 	Enemy.prototype.isAlive = function(){
        if(this.alive == false){
        	this.destroy()
        }

    };
