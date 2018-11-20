var AsiloRoyale = AsiloRoyale || {};

function Enemy(game, x, y, sprite, speed, life,loopsI,loopsD, index, enemyCG, playerCG, tileCG, bulletCG, player) {
	
	Phaser.Sprite.call(this, game, x, y, sprite);
	
	//Atributos
	this.speed = speed;
	this.game = game;
	this.sprite = sprite;
	this.life = life;
	this.alive = true;
	this.loopsI=-loopsI;
	this.loopsD=-loopsD;
	this.loopsII=loopsI;
	this.loopsDI=loopsD;
	this.moves=false;
	this.enemyCG = enemyCG;
	this.playerCG = playerCG;
	this.bulletCG = bulletCG;
	this.tileCG = tileCG;
	this.name = index.toString;
	this.player = player;


	//Animaciones
	if (this.sprite==='dientes'){

	this.walkD = this.animations.add('right', [0, 1], 8,true);
	this.walkI = this.animations.add('left', [2, 3], 8,true);

	}else if(this.sprite=='enfermero'){

	this.walkD = this.animations.add('right',[0,1,2,1],6,true);
	this.walkI = this.animations.add('left',[3,4,5,4],6,true);	
	}

	
}
	
	Enemy.prototype = Object.create(Phaser.Sprite.prototype);
	Enemy.prototype.constructor = Enemy;

	Enemy.prototype.create= function() {	



	}
	
	Enemy.prototype.update = function() {

		this.body.setCollisionGroup(this.enemyCG);
		this.body.collides(this.playerCG);
		this.body.collides(this.tileCG);
		this.body.collides(this.bulletCG, this.collisionBullet, this);

	//Animaciones según el enemigo creado
	if(this.body.sprite.key == 'dientes') {

	
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

	} else if (this.body.sprite.key == 'enfermero') {

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

	}
		
		this.isAlive();

	}

	//daño recibido por el enemigo
	Enemy.prototype.damage = function(amount, body) {

    	this.life -= amount;
    	this.alpha -= 2;

    	if (this.life <= 0){
    		
        	this.alive = false;
        	this.player.kills += 1;
        	if(body.key == 'dientes') {
        		this.player.score +=35;
        	} else if (body.key == 'enfermero') {
        		this.player.score +=55;
        	}


       	return true;
    	}

    return false;

	}

	//Determina si el enemigo está vivo
 	Enemy.prototype.isAlive = function(){
        if(this.alive == false){
        	this.destroy()

        } 

    },

    Enemy.prototype.collisionBullet = function (body, body2) {
    	if (body.sprite != null && body2.sprite != null) {

			 if(body2.sprite.key == 'bala'){
			 this.damage(10, body.sprite);
			 body2.sprite.destroy();

			}else if(body2.sprite.key == 'perdigon'){
	        this.damage(5, body.sprite);
	        body2.sprite.destroy();

			} 
		
		}

    };
