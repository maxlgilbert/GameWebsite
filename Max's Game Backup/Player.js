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
    var material = new THREE.MeshBasicMaterial({color: 0x000000});
    this.mesh = new THREE.Mesh(plane, material);
    this.mesh.position.set(this.position.x + this.width/2, this.position.y + this.height/2, this.position.z);
    this.mesh.rotation.x = Math.PI/2;
    this.bounds = ({ left:this.position.x, top:this.position.y+this.height, right:this.position.x+this.width, bottom:this.position.y })
    
};
GAME.Player.prototype = {
    bounces : 0,
    jumpHeight : 8,
    intersected : false,
    takingDamage : false,
    movePlayer : function(params) {
        if (params.bool) {
            //params.player.mesh.position.x +=7;
            this.velocity.x =params.speed;
        } else {
            this.velocity.x =-params.speed;
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
            this.intersected = false;
            if(params.jump > 8) {
                targetZ+=this.jumpHeight*50;
            };
        }
    },
    
    updatePosition : function(params) {
        if(this.intersected) {
            //this.stop({});
            this.velocity.y = 0;
        }
        GAME.applyGravity({ player:this });
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
        damageSFX.play();
        this.mesh.material.color.setHex(0xFF0000);
        this.takingDamage = true;
        var damageTween = new TWEEN.Tween({ red: 1, player:this })
        .to({ red:0 }, 250 )
        .onUpdate( function(){
                  this.player.mesh.material.color.setRGB(this.red, 0,0);
                  } )
        .onComplete( function(){
                    this.player.takingDamage = false;
                    });
        damageTween.start();
    },
    
};
    