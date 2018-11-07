var AsiloRoyale = AsiloRoyale || {};

function Player(game, x, y, guned, shotguned, sprite, ownerId, weapons) {

	Phaser.Sprite.call(this, game, x, y, sprite,0);

    //Atributos de Player

	this.speed = 120;
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

    }
	
	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;


	Player.prototype.create= function() {
    }

	
	Player.prototype.update = function() {
        
        //eje de rotación del jugador
        this.anchor.x = 0.35;
        this.anchor.y = 0.5;

        if(this.life>100){
            this.life=100;
        }

		this.body.rotation = this.angleToPointer(this);

		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.body.velocity.y = 0;
		this.body.velocity.x = 0;

        //Sprites player según el arma equipada
        if(this.currentWeapon==0){
            this.frame=0;
        }else if(this.currentWeapon==1){
            this.frame=1;
        }


		//movimientos player
		if(this.cursors.up.isDown) {
			this.body.velocity.y -= 400;
		}
		else if(this.cursors.down.isDown) {
			this.body.velocity.y += 400;
		}
		if(this.cursors.left.isDown) {
			this.body.velocity.x -= 400;
		}
		else if(this.cursors.right.isDown) {
			this.body.velocity.x += 400;
		}
 
        if (this.game.input.activePointer.totalTouches == 1 && this.game.input.activePointer.isDown && this.shotguned==true)
    {
            this.weapons[this.currentWeapon].fire(this);
            this.game.input.activePointer.totalTouches = 0;
    }
		this.isAlive();

    },


    //Función que se utiliza cada vez que el jugador reciba daño
    Player.prototype.damage = function(amount, crop, lifeBar) {

        this.life -= amount;
        crop.width = (this.life/2) *10; 
        lifeBar.updateCrop(this.cropRect);

        if (this.life <= 0){
            this.alive = false;
        return true;
        }
    return false;

    },

    //Determina la muerte del jugador
    Player.prototype.isAlive = function(){
        if(this.alive == false){ this.game.state.start('GameOver',true,false,this.score,this.items, this.kills);}

    };




