var AsiloRoyale = AsiloRoyale || {};

var cropRect = new Phaser.Rectangle( 0, 0, 500 , 30);

var Player = function (game, x, y, guned, shotguned, ownerId, player1CG, player2CG, tileCG, enemyCG, itemCG, bulletCG, id, user) {
	
	if(user.skin==0){
		Phaser.Sprite.call(this, game, x, y,'player',0);
	}else if(user.skin==1){
		Phaser.Sprite.call(this, game, x, y,'player2',0);
	}
    //Atributos de Player
	this.user= user;
	this.id = id;
	this.speed = 250;
	this.game = game;
	this.guned = guned;
	this.shotguned = shotguned;
	this.life = 100;
	this.score = 0;
    this.alive = true;
    this.ownerId = ownerId;
    this.currentWeapon = 0;
    this.shotgunAmmo = 0;
    this.gunAmmo = 10;
    this.items = 0;
    this.kills = 0;
    this.player1CG = player1CG;
    this.player2CG = player2CG;
    this.tileCG = tileCG;
    this.enemyCG = enemyCG;
    this.itemCG = itemCG;
    this.gunLoad = 6;
    this.shotgunLoad = 15;
    this.bulletCG = bulletCG;
    this.moves = false;
    this.animations.add('walkGun', [1,0,2,0], 4,true);
    this.animations.add('walkShotgun',[4,3,5,3],4,true);
    
	this.weapons = [];
	this.weapons.push(new Weapon.Gun(this.game,this.bulletCG,this.tileCG, this.enemyCG,this.player1CG,this.player2CG,this));
    this.weapons.push(new Weapon.Shotgun(this.game,this.bulletCG,this.tileCG, this.enemyCG,this.player1CG,this.player2CG,this));

    
    this.lifeGroup = this.game.add.group();
    this.lifeBardw = this.game.add.sprite(60, 595, 'lifebardw');
    this.lifeBar = this.game.add.sprite(60, 610, 'lifebaru');
    this.lifeGroup.add(this.lifeBardw);
    this.lifeGroup.add(this.lifeBar);

    this.collect_weapon = new Phaser.Sound(this.game, 'collect_weapon');
    this.bite = new Phaser.Sound(this.game, 'bite');
    this.heal = new Phaser.Sound(this.game, 'heal');
    this.punch = new Phaser.Sound(this.game, 'punch');
    this.swallow = new Phaser.Sound(this.game, 'swallow');
    this.collect_ammo = new Phaser.Sound(this.game, 'collect_ammo');
    this.control_sound = new Phaser.Sound(this.game, 'control_sound');
    this.showLife();
    
    this.keyw = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.keys = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.keya = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.keyd = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

    
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

    this.toJSON = function(){
        var data = {
            x: this.x,
            y: this.y,
            rotation: this.rotation,
            weapon: this.currentWeapon,
            life: this.life,
            W: this.keyw,
            S: this.keys,
            D: this.keyd,
            A: this.keya
        }
        return data;
    }

    };
	
	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;


	Player.prototype.create= function() {
        


    },    
    


	
	Player.prototype.update = function() {
        this.body.data.ccdSpeedThreshold = 38.75;
		this.body.data.ccdIterations = 100;
        //eje de rotación del jugador
        this.anchor.x = 0.35;
        this.anchor.y = 0.5;
        
     if(this.id==0){
    	 this.body.setCollisionGroup(this.player1CG);
    	 this.body.collides(this.player2CG);
     }else if(this.id==1){
    	 this.body.setCollisionGroup(this.player2CG);
    	 this.body.collides(this.player1CG);
     }
        this.body.collides(this.tileCG);
        this.body.collides(this.itemCG, this.pickItem, this);
        this.body.collides(this.enemyCG, this.pickItem, this);
        this.body.collides(this.bulletCG,this.pickItem,this);

    
        this.game.world.bringToTop(this.lifeGroup);

        if(this.life>100){
            this.life=100;
        }

		this.body.rotation = this.angleToPointer(this);

		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.body.velocity.y = 0;
		this.body.velocity.x = 0;


        
        ////ANIMACIONES Y MOVIMIENTO SI TIENES LA PISTOLA
        if(this.currentWeapon==0){
		        if(this.moves==true){
		        	this.animations.play('walkGun');
		        }else if(this.moves == false){
		        	this.animations.stop(null,false);
		        }
				if(this.keyw.isDown) {
					this.body.velocity.y -= this.speed;
					this.moves=true;
				}
				else if(this.keys.isDown) {
					this.body.velocity.y += this.speed;
					this.moves=true;
				}
				if(this.keya.isDown) {
					this.body.velocity.x -= this.speed;
					this.moves=true;
				}if(this.keyd.isDown) {
					this.body.velocity.x += this.speed;
					this.moves=true;
				}if(this.keys.isUp && this.keya.isUp && this.keyd.isUp && this.keyw.isUp){
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
			if(this.keyw.isDown) {
				this.body.velocity.y -= this.speed;
				this.moves=true;
			}
			else if(this.keys.isDown) {
				this.body.velocity.y += this.speed;
				this.moves=true;
			}
			if(this.keya.isDown) {
				this.body.velocity.x -= this.speed;
				this.moves=true;
			}if(this.keyd.isDown) {
				this.body.velocity.x += this.speed;
				this.moves=true;
			}if(this.keys.isUp && this.keya.isUp && this.keyd.isUp && this.keyw.isUp){
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
        
		

    },
    
    Player.prototype.reloader = function(){
    	if(this.gunAmmo!=0 || this.shotgunAmmo!=0){
    	this.collect_weapon.play();
    	}
    	this.weapons[this.currentWeapon].reload(this,this.game,this.bulletCG, this.tileCG, this.enemyCG,this.player1CG,this.player2CG);
    },
    

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

            } else if (body2.sprite.key == 'mando') {
            	this.control_sound.play();
                this.collect(this, body2.sprite, 100);
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
            	
            	this.collect_ammo.play();
                this.collect(this,body2.sprite,0);
                if(this.currentWeapon==0){
                this.shotgunAmmo+=5;
                }
                if(this.currentWeapon==1){
                this.shotgunAmmo+=20;
                }
                this.currentWeapon=1;
                this.gunAmmo=0;

            }else if(body2.sprite.key == 'gun'){

            	this.collect_ammo.play();
                this.collect(this,body2.sprite,0);
                this.currentWeapon=0;
                this.gunAmmo+=15;
                this.shotgunAmmo=0;

                //Botiquin

            }else if(body2.sprite.key == 'botiquin'){
            	
            	this.heal.play();
                this.damage(-20);
                this.collect(this,body2.sprite,0);
                
                //Enemigos

            } else if (body2.sprite.key == 'dientes'){
            	
                this.bite.play();
                this.damage(5);
                
             } else if (body2.sprite.key == 'enfermero') {
            	 
            	this.punch.play();
                this.damage(10);

             } else if (body2.sprite.key == 'bala'){

            	 this.damage(15);
            	 body2.sprite.destroy();
    
            	 
             } else if(body2.sprite.key == 'perdigon'){
            	 
            	 this.damage(5);
            	 body2.sprite.destroy();
             }
            
        }

    },

    Player.prototype.collect = function(player, collectable, amount) {
        this.score+=amount;
        collectable.destroy();

    };




