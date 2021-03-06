var AsiloRoyale = AsiloRoyale || {};

function Enemy(game, x, y, sprite, speed, life,loopsI,loopsD, index, enemyCG, player1CG,player2CG, tileCG, bulletCG,players) {
	
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
	this.player1CG = player1CG;
	this.player2CG = player2CG;
	this.bulletCG = bulletCG;
	this.tileCG = tileCG;
	this.name = index.toString;
	this.players = players;



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
		this.body.collides(this.player1CG);
		this.body.collides(this.player2CG);
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
	Enemy.prototype.damage = function(amount, body,body2) {
    	this.life -= amount;
    	this.alpha -= 2;
    	this.game.add.tween(this).to( { alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 1, false,true);

    	if (this.life <= 0){
    		
        	this.alive = false;
        	

        	if(body.sprite.key == 'dientes') {
        		
        		this.players[body2.sprite.playerID].score +=35;
        		this.players[body2.sprite.playerID].kills +=1;

        		
        	} else if (body.sprite.key == 'enfermero') {
        		
        		console.log(body2.sprite.playerID);
        		this.players[body2.sprite.playerID].score +=55;
        		this.players[body2.sprite.playerID].kills +=1;
        		this.blood = this.game.add.sprite(this.body.x-50, this.body.y-50, 'blood');
        		this.blood.alpha -= 2;
        		this.game.add.tween(this.blood).to( { alpha: 0 }, 1, Phaser.Easing.Linear.None, true, 60, 0, false,false);

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

			 this.damage(10, body,body2);
			 body2.sprite.destroy();

			 

			}else if(body2.sprite.key == 'perdigon'){
	        this.damage(5, body,body2);

	        body2.sprite.destroy();

			} 
		
		}

    };
