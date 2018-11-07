var AsiloRoyale = AsiloRoyale || {};

function Enemy(game, x, y, sprite, speed, life,loopsI,loopsD ) {
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
	Enemy.prototype.damage = function(amount) {

    	this.life -= amount;
    	this.alpha -= 2;

    	if (this.life <= 0){
    		
        	this.alive = false;

       	return true;
    	}

    return false;

	}

	//Determina si el enemigo está vivo
 	Enemy.prototype.isAlive = function(){
        if(this.alive == false){
        	this.destroy()
        }

    };
