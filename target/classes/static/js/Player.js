var AsiloRoyale = AsiloRoyale || {};

var cropRect = new Phaser.Rectangle( 0, 0, 500 , 30);

var Player = function (game, x, y, guned, shotguned, sprite, ownerId, weapons, playerCG, tileCG, enemyCG, itemCG,bulletCG) {

	Phaser.Sprite.call(this, game, x, y, sprite,0);

    //Atributos de Player

	this.speed = 250;
	this.game = game;
	this.guned = guned;
	this.shotguned = shotguned;
	this.sprite = null;
	this.life = 100;
	this.score = 0;
    this.alive = true;
    this.ownerId = ownerId;
    this.weapons = weapons;
    this.currentWeapon = 0;
    this.shotgunAmmo = 0;
    this.gunAmmo = 10;
    this.items = 0;
    this.kills = 0;
    this.playerCG = playerCG;
    this.tileCG = tileCG;
    this.enemyCG = enemyCG;
    this.itemCG = itemCG;
    this.gunLoad = 6;
    this.shotgunLoad = 15;
    this.bulletCG = bulletCG;
    this.moves = false;
    this.animations.add('walkGun', [1,0,2,0], 4,true);
    this.animations.add('walkShotgun',[4,3,5,3],4,true);

    
    this.lifeGroup = this.game.add.group();
    this.lifeBardw = this.game.add.sprite(60, 595, 'lifebardw');
    this.lifeBar = this.game.add.sprite(60, 610, 'lifebaru');
    
    this.lifeGroup.add(this.lifeBardw);
    this.lifeGroup.add(this.lifeBar);

     this.collect_weapon = new Phaser.Sound(this.game, 'collect_weapon');
    this.bite = new Phaser.Sound(this.game, 'bite');
    this.swallow = new Phaser.Sound(this.game, 'swallow');
    this.collect_ammo = new Phaser.Sound(this.game, 'collect_ammo');
    this.showLife();

    //Rotación del jugador hacia la posición del ratón
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

    }

    };
	
	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;


	Player.prototype.create= function() {


    },    
    


	
	Player.prototype.update = function() {
        
        //eje de rotación del jugador
        this.anchor.x = 0.35;
        this.anchor.y = 0.5;

    this.body.setCollisionGroup(this.playerCG); 
    this.body.collides(this.tileCG);
    this.body.collides(this.itemCG, this.pickItem, this);
    this.body.collides(this.enemyCG, this.pickItem, this);
    
    this.game.world.bringToTop(this.lifeGroup);

        if(this.life>100){
            this.life=100;
        }

		this.body.rotation = this.angleToPointer(this);

		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.body.velocity.y = 0;
		this.body.velocity.x = 0;

        //Sprites player según el arma equipada
		/*
        if(this.currentWeapon==0){
            this.frame=0;
        }else if(this.currentWeapon==1){
            this.frame=3;
        }
   	*/

        //this.walk = this.animations.add('walk');
        //this.animations.play('walk', 30, true);


        

		//movimientos player
        keyw = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        keys = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        keya = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        keyd = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        
        ////ANIMACIONES Y MOVIMIENTO SI TIENES LA PISTOLA
        if(this.currentWeapon==0){
		        if(this.moves==true){
		        	this.animations.play('walkGun');
		        }else if(this.moves == false){
		        	this.animations.stop(null,false);
		        }
				if(keyw.isDown) {
					this.body.velocity.y -= this.speed;
					this.moves=true;
				}
				else if(keys.isDown) {
					this.body.velocity.y += this.speed;
					this.moves=true;
				}
				if(keya.isDown) {
					this.body.velocity.x -= this.speed;
					this.moves=true;
				}if(keyd.isDown) {
					this.body.velocity.x += this.speed;
					this.moves=true;
				}if(keys.isUp && keya.isUp && keyd.isUp && keyw.isUp){
					this.moves=false;
					this.frame=0;
				}
        }
        
        
        ////ANIMACIONES Y MOVIMIENTO SI TIENES LA ESCOPETA
        if(this.currentWeapon==1){
	        if(this.moves==true){
	        	this.animations.play('walkShotgun');
	        }else if(this.moves == false){
	        	this.animations.stop(null,false);
	        }
			if(keyw.isDown) {
				this.body.velocity.y -= this.speed;
				this.moves=true;
			}
			else if(keys.isDown) {
				this.body.velocity.y += this.speed;
				this.moves=true;
			}
			if(keya.isDown) {
				this.body.velocity.x -= this.speed;
				this.moves=true;
			}if(keyd.isDown) {
				this.body.velocity.x += this.speed;
				this.moves=true;
			}if(keys.isUp && keya.isUp && keyd.isUp && keyw.isUp){
				this.moves=false;
				this.frame=3;
			}
    }
        

        
		//Pulsar el ratón para disparar
        if (this.game.input.activePointer.totalTouches == 1 && this.game.input.activePointer.isDown && this.shotguned==true)
    {
            this.weapons[this.currentWeapon].fire(this);
            this.game.input.activePointer.totalTouches = 0;
    }
        keyr = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        keyr.onDown.add(this.reloader, this);
        
		this.isAlive();

    },
    
    Player.prototype.reloader = function(){
    	this.weapons[this.currentWeapon].reload(this,this.game,this.bulletCG, this.tileCG, this.enemyCG);
    }
    

    Player.prototype.showLife = function(){
        
        //this.lifeBardw = this.game.add.sprite(60, 595, 'lifebardw');
        this.lifeBardw.fixedToCamera = true;

        //this.lifeBar = this.game.add.sprite(60, 610, 'lifebaru');
        this.lifeBar.anchor.y = 0.5;
        this.lifeBar.cropEnabled = true;
        this.lifeBar.fixedToCamera = true;

       // var width = (this.life / 2)*10;

        //this.cropRect = new Phaser.Rectangle( 0, 0, width , 30);
       cropRect.fixedToCamera = true;
       this.lifeBar.crop(cropRect);

    }, 


    //Función que se utiliza cada vez que el jugador reciba daño
    Player.prototype.damage = function(amount) {
        this.life -= amount;
        this.alpha -= 2;
        if (amount > 0){
        this.game.add.tween(this).to( { alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 1, false,true);
        }
        console.log(this.life);
        cropRect.width = (this.life/2) *10; 
        this.lifeBar.updateCrop(cropRect);

        if (this.life <= 0){
            this.alive = false;
        return true;
        }
    return false;

    },

    //Determina la muerte del jugador
    Player.prototype.isAlive = function(){
        if(this.alive == false){ this.game.state.start('GameOver',true,false,this.score,this.items, this.kills);}

    },

  

    Player.prototype.pickItem = function (body, body2) {

        if (body.sprite != null && body2.sprite != null) {

            // Pastillas

        	if (body2.sprite.key == 'pasti_roja') {
                this.swallow.play();
                this.collect(this, body2.sprite, 10);
                this.items++;
            } else if (body2.sprite.key == 'pasti_verde') {
                this.swallow.play();
                this.collect(this,body2.sprite, 20);
                this.items++;

            } else if(body2.sprite.key == 'pasti_morada'){
                this.swallow.play();
                this.collect(this,body2.sprite,30);
                this.items++;


            } else if(body2.sprite.key == 'pasti_amarilla'){
                this.swallow.play();
                this.collect(this,body2.sprite,50);
                this.items++;

                // Balas y cartuchos

            } else if(body2.sprite.key == 'cartucho_escopeta'){
        
                this.collect_ammo.play();
                this.collect(this,body2.sprite,0);
                if(this.currentWeapon==1){
                    this.shotgunAmmo+=20;
                }


            }else if(body2.sprite.key == 'balas_pistola'){

                this.collect_ammo.play();
                this.collect(this,body2.sprite,0);
                if(this.currentWeapon==0){
                    this.gunAmmo+=15;
                }

                // Armas

            } else if(body2.sprite.key == 'shotgun'){

                this.collect_weapon.play();
                this.collect(this,body2.sprite,0);
                this.currentWeapon=1;
                this.shotgunAmmo+=20;
                this.gunAmmo=0;

            }else if(body2.sprite.key == 'gun'){

                this.collect_weapon.play();
                this.collect(this,body2.sprite,0);
                this.currentWeapon=0;
                this.gunAmmo+=15;
                this.shotgunAmmo=0;

                //Botiquin

            }else if(body2.sprite.key == 'botiquin'){

                this.damage(-20);
                this.collect(this,body2.sprite,0);

                //Enemigos


            } else if (body2.sprite.key == 'dientes'){
                this.bite.play();
                this.damage(5);
             } else if (body2.sprite.key == 'enfermero') {
                this.damage(20);

                } 


            
    }

    },

    Player.prototype.collect = function(player, collectable, amount) {
        this.score+=amount;
        collectable.destroy();

    };




