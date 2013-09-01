var GAME = GAME || {};





GAME.Player = function(params){
    this.position = new THREE.Vector3(params.x, params.y, params.z );
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.health = params.health;
    this.lives = params.lives;
    this.width = params.width;
    this.height = params.height;
    
    this.jumps =0;
    var plane = new THREE.PlaneGeometry(this.width,this.height);
    //this.material = new THREE.MeshPhongMaterial({color: 0xFFFFFF, map: GAME.Textures['player'].threeObj, emissive:0x080808, transparent:true, side:THREE.DoubleSide});
    this.material = new THREE.MeshPhongMaterial({color: 0xAA00FF, emissive:0x080808, transparent:true, side:THREE.DoubleSide});
    this.mesh = new THREE.Mesh(plane, this.material);
    this.mesh.position.set(this.position.x + this.width/2.0, this.position.y + this.height/2.0, this.position.z);
    //this.mesh.rotation.x = Math.PI/2;
    this.mesh.doubleSided = true;
    this.setBounds();
    
    
};
GAME.Player.prototype = {
    bounces : 0,
    jumpHeight : 24,
    intersected : false,
    impededRight : false,
    impededLeft : false,
    takingDamage : false,
    temporaryPowerup : false,
    jumpLevel : 0,
    platformNumber : -1,
    movePlayerRight : function(params) {
        
        if ((!this.intersected||!this.impededRight)) {
            
            this.velocity.x =params.speed;
            this.mesh.rotation.y = 0;
            this.impededLeft = false;
        }
        //this.intersected = false;
    },
    movePlayerLeft : function(params) {
        if (!this.intersected||!this.impededLeft) {
            this.velocity.x =-params.speed;
            this.mesh.rotation.y = Math.PI;
            this.impededRight = false;
        }
        //this.intersected = false;
    },
    
    stopPlayer : function(params) {
        this.velocity.x =0;
        //this.velocity.y =0;
    },
    
    jumpPlayer : function(params) {
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
        }
    },
    
    updatePosition : function(params) {
        if(this.intersected){
        //GAME.applyGravity({ player:this});
        }
        if(this.intersected&&this.platformNumber!==-1) {
            //this.stop({});
            //var platVel = GAME.platforms[this.platformNumber].velocity.y;
            //this.velocity.y = platVel;
        } else {
            GAME.applyGravity({ player:this});
        }
        if(this.impeded) {
            //this.stop({});
            this.velocity.x = 0;
        }
        
        this.intersected = false;
        this.platformNumber = -1;
        //this.platformNumber = -1;
        /*
        if(params.newPosition) {
            this.mesh.position.x = params.newPosition.x + this.width/2;
            this.mesh.position.y = params.newPosition.y + this.height/2;
            this.mesh.position.z = params.newPosition.z;
            this.position=params.newPosition;
            this.bounds.left= params.newPosition.x;
            this.bounds.right= params.newPosition.x+this.width;
            this.bounds.top= params.newPosition.y;
            this.bounds.bottom= params.newPosition.y + this.height;
        }*/
        this.mesh.position.addSelf(this.velocity);
        this.position.addSelf(this.velocity);
        this.bounds.left+= this.velocity.x;
        this.bounds.right+= this.velocity.x;
        this.bounds.top+= this.velocity.y;
        this.bounds.bottom+= this.velocity.y;
    },
    
    damage : function(params) {
        if (!this.takingDamage) {
            GAME.Tracks['damageSFX'].threeObj.play();
            this.mesh.material.color.setHex(0xFF0000);
            this.takingDamage = true;
            if (this.temporaryPowerup) {
                this.jumpHeight/=1.2;
                this.jumpLevel--;
            }
            GAME.player.temporaryPowerup = false;
            var damageTween = new TWEEN.Tween({ red: 0, player:this })
            .to({ red:1 }, 150 )
            .onUpdate( function(){
                    this.player.mesh.material.color.setRGB(1, this.red,this.red);
                    } )
            .onComplete( function(){
                        this.player.takingDamage = false;
                        });
            damageTween.start();
        }
    },
    
    bounds : [],
    
    setBounds : function(){
        this.bounds = ({ left:this.position.x, top:this.position.y+this.height, right:this.position.x+this.width, bottom:this.position.y })
    },
    
    setPosition : function(params) {
        this.position = new THREE.Vector3(params.x, params.y, params.z );
        this.mesh.position.set(this.position.x+this.width/2.0, this.position.y+this.height/2.0, this.position.z);
        this.setBounds();
    },

    movePosition : function(params) {
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
    },
    
    reset : function(params) {
        if(params.level ===2) {
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
        };
        //this.mesh.material.color.setRGB(1, 1,1);
        this.takingDamage = false;
        this.setPosition({ x:0, y:200, z:0 });
        scene.add(this.mesh);
        scene.add(light);
    }
    
};
    