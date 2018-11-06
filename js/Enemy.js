var AsiloRoyale = AsiloRoyale || {};

function Enemy(game, x, y, guned, shotguned, sprite, ) {
	Phaser.Sprite.call(this, game, x, y, sprite);
	this.speed = 120;
	this.game = game;
	this.guned = guned;
	this.shotguned = shotguned;
	this.sprite = null;
	this.life = 20;
	this.alive = true;
	this.loopsI=-100;
	this.loopsD=-100;
	this.moves=false;

	this.walkD = this.animations.add('right', [0, 1], 8,true);
	this.walkI = this.animations.add('left', [2, 3], 8,true);


	
}
	
	Enemy.prototype = Object.create(Phaser.Sprite.prototype);
	Enemy.prototype.constructor = Enemy;/*** Automatically called by World.update*/

	Enemy.prototype.create= function() {	


	}
	
	Enemy.prototype.update = function() {

		//this.body.static = true;



		if(this.loopsI<=0){

			this.body.x += 2;
			this.loopsI+=2;
				this.animations.play('right');

		}else if(this.loopsD<=0){
			this.body.x  -= 2;
			this.loopsD +=2;
			this.animations.play('left');

		}else if(this.loopsI>=0 && this.loopsD>=0){
			this.loopsI=-100;
			this.loopsD=-100;

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
        if(this.alive == false){this.destroy()}

    };
