var GAME = GAME || {};





GAME.Player = function(params){
    GAME.SiteObject.call( this, params );
    //this.doubleSided = true;

    //this.position = new THREE.Vector3(params.x, params.y, params.z );
    //this.velocity = new THREE.Vector3(0, 0, 0);
    this.health = params.health;
    this.lives = params.lives;
    //this.width = params.width;
    //this.height = params.height;
    
    this.jumps =0;
    this.bounces = 0;
    this.jumpHeight = 24;
    this.intersected = false;
    this.impededRight = false;
    this.impededLeft = false;
    this.takingDamage = false;
    this.temporaryPowerup = false;
    this.jumpLevel = 0;
    this.platformNumber = -1;
    /*var plane = new THREE.PlaneGeometry(this.width,this.height);
    //this.material = new THREE.MeshPhongMaterial({color: 0xFFFFFF, map: GAME.Textures['player'].threeObj, emissive:0x080808, transparent:true, side:THREE.DoubleSide});
    this.material = new THREE.MeshPhongMaterial({color: 0xAA00FF, emissive:0x080808, transparent:true, side:THREE.DoubleSide});
    this.mesh = new THREE.Mesh(plane, this.material);
    this.mesh.position.set(this.position.x + this.width/2.0, this.position.y + this.height/2.0, this.position.z);
    //this.mesh.rotation.x = Math.PI/2;
    this.mesh.doubleSided = true;
    this.setBounds();*/
    
    
};

GAME.Player.prototype = GAME.clone(GAME.SiteObject.prototype);
GAME.Player.prototype.constructor = GAME.Player;
GAME.Player.prototype.movePlayerRight = function(params) {
        
        if ((!this.intersected||!this.impededRight)) {
            
            this.velocity.x =params.speed;
            //this.rotation.y = 0;
            this.impededLeft = false;

        this.setBounds();
        }
        //this.intersected = false;
    }
GAME.Player.prototype.movePlayerLeft = function(params) {
        if (!this.intersected||!this.impededLeft) {
            this.velocity.x =-params.speed;
            //this.rotation.y = Math.PI;
            this.impededRight = false;

        this.setBounds();
        }
        //this.intersected = false;
    }
    
GAME.Player.prototype.stopPlayer = function(params) {
        this.velocity.x =0;
        //this.velocity.y =0;
    }
    
GAME.Player.prototype.jumpPlayer = function(params) {
        if(this.jumps<2){
            this.velocity.y =params.jump;
            this.bounces = 0;
            this.jumps++;
            //this.intersected = false;
            this.platformNumber = -1;
            //this.impededRight = false;
            //this.impededLeft = false;
            if(params.jump > 8) {
                //targetZ+=this.jumpHeight*50;
            };
            
        this.setBounds();
        }
    }
  /*  
GAME.Player.prototype.updatePosition = function(params) {
        this.position.add(this.velocity);
        this.bounds.left+= this.velocity.x;
        this.bounds.right+= this.velocity.x;
        this.bounds.top+= this.velocity.y;
        this.bounds.bottom+= this.velocity.y;
    }*/
    
    GAME.Player.prototype.damage = function(params) {
        if (!this.takingDamage) {
            GAME.Tracks['damageSFX'].threeObj.play();
            this.material.color.setHex(0xFF0000);
            this.takingDamage = true;
            if (this.temporaryPowerup) {
                this.jumpHeight/=1.2;
                this.jumpLevel--;
            }
            GAME.player.temporaryPowerup = false;
            var damageTween = new TWEEN.Tween({ red: 0, player:this })
            .to({ red:1 }, 150 )
            .onUpdate( function(){
                    this.player.material.color.setRGB(1, this.red,this.red);
                    } )
            .onComplete( function(){
                        this.player.takingDamage = false;
                        });
            damageTween.start();
        }
    }
    
    //bounds : [],
    
    /*GAME.Player.prototype.setBounds = function(){
        this.bounds = ({ left:this.position.x, top:this.position.y+this.height, right:this.position.x+this.width, bottom:this.position.y })
    }*/
    
   /* GAME.Player.prototype.setPosition = function(params) {
        this.position = new THREE.Vector3(params.x, params.y, params.z );
        //this.position.set(this.position.x+this.width/2.0, this.position.y+this.height/2.0, this.position.z);
        this.position.set(this.position.x, this.position.y, this.position.z);
        this.setBounds();
    }*/

    /*GAME.Player.prototype.movePosition = function(params) {
        this.dX = params.x;
        this.dY = params.y;
        this.bounds.left +=params.x;
        this.bounds.right +=params.x;
        this.bounds.top +=params.y;
        this.bounds.bottom +=params.y;
        this.position.x+=params.x;
        this.position.y+=params.y;
        this.position.z+=params.z;
        this.path = ({ left:this.position.x -this.pathLength/2, top:this.position.y + this.height +this.pathLength/2, right:this.position.x + this.width+this.pathLength/2, bottom:this.position.y-this.pathLength/2 });
    }*/
    
   GAME.Player.prototype.reset = function(params) {
       /*if(params.level ===2) {
            this.height = 161;
            this.mesh = new THREE.Mesh( new THREE.PlaneGeometry(this.width,this.height), this.material);
            //this.mesh.rotation.x = Math.PI/2;
            this.mesh.doubleSided = true;
            this.mesh.material.map = THREE.ImageUtils.loadTexture('Textures/maincharacter2.png');
        } else if(params.level ===3) {
            this.height = 213;
            this.mesh = new THREE.Mesh( new THREE.PlaneGeometry(this.width,this.height), this.material);
            //this.mesh.rotation.x = Math.PI/2;
            this.mesh.doubleSided = true;
            this.mesh.material.map = THREE.ImageUtils.loadTexture('Textures/maincharacter3.png');
        }else if(params.level ===4) {
            this.height = 213;
            this.mesh = new THREE.Mesh( new THREE.PlaneGeometry(this.width,this.height), this.material);
            //this.mesh.rotation.x = Math.PI/2;
            this.mesh.doubleSided = true;
            this.mesh.material.map = THREE.ImageUtils.loadTexture('Textures/maincharacter4.png');
        };*/
        //this.mesh.material.color.setRGB(1, 1,1);
        this.takingDamage = false;
        this.setPosition({ x:0, y:200, z:0 });
        scene.add(this);
        scene.add(light);
    }
    