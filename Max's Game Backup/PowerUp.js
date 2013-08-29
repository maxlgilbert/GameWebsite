var GAME = GAME || {};





GAME.PowerUp = function(params){
    this.platform = params.platform;
    this.position = new THREE.Vector3(this.platform.position.x + params.x, this.platform.bounds.top + params.y, this.platform.position.z + params.z );
    this.velocity = new THREE.Vector3(params.velocityX, 0, 0);
    //this.health = params.health;
    this.width = params.width;
    this.height = params.height;
    //this.bounces = 0;
    this.used = false;
    //this.jumps =0;
    var plane = new THREE.PlaneGeometry(this.width,this.height);
    var material = new THREE.MeshBasicMaterial({color: params.color});
    this.mesh = new THREE.Mesh(plane, material);
    this.mesh.position.set(this.position.x + this.width/2, this.position.y + this.height/2, this.position.z);
    this.mesh.rotation.x = Math.PI/2;
    this.bounds = ({ left:this.position.x, top:this.position.y+this.height, right:this.position.x+this.width, bottom:this.position.y });
    
    //this.path = ({ left:this.platform.bounds.left, right:this.platform.bounds.right });  
    
};
GAME.PowerUp.prototype = {
    /*
    movePlayer : function(params) {
        if (params.bool) {
            //params.player.mesh.position.x +=7;
            this.velocity.x =params.speed;
        } else {
            this.velocity.x =-params.speed;
        }
        /*if (this.velocity.x > 8) {
            this.velocity.x = 8
        }
        if (this.velocity.x < -8) {
            this.velocity.x = -8
        }*/
        //this.intersected = false;
    /*},
    
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
        }
    },
    */
    updatePosition : function(params) {
        if(this.intersected) {
            //this.stop({});
            this.velocity.y = 0;
        }
        //GAME.applyGravity({ player:this });
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
        if(this.bounds.right > this.path.right ||this.bounds.left < this.path.left) {
            this.velocity.x*=-1;
        };
    },
    
    absorbed : function(params) {
        powerUpSFX.play();
        this.position.z = -1;
        scene.remove(this.mesh);
        this.used = true;
    }
    
};
    