var GAME = GAME || {};





GAME.Projectile= function(params){
    this.position = new THREE.Vector3(params.x, params.y, params.z );
    this.velocity = new THREE.Vector3(0, 0, 0);
    /*this.health = params.health;
    this.lives = params.lives;*/
    this.hitBox = params.hitBox;
    this.shadow = params.shadow;
    this.width = params.width;
    this.height = params.height;
    this.velocity = new THREE.Vector3(0, 0, 0);
    var plane = new THREE.PlaneGeometry(this.width,this.height);
    var material = new THREE.MeshBasicMaterial({color: params.color});
    this.mesh = new THREE.Mesh(plane, material);
    this.mesh.position.set(this.position.x+this.width/2, this.position.y+this.height/2, this.position.z);
    //this.mesh.rotation.x = Math.PI/2;
    this.bounds = ({ left:this.position.x, top:this.position.y+this.height, right:this.position.x+this.width, bottom:this.position.y });
};
GAME.Projectile.prototype = {
    updatePosition : function(params) {
        if (this.hitBox){
            this.velocity = this.shadow.velocity;
            /*this.mesh.position.addSelf(this.shadow.velocity);
            this.position.addSelf(this.shadow.velocity);
            this.bounds.left+= this.shadow.velocity.x;
            this.bounds.right+= this.shadow.velocity.x;
            this.bounds.top+= this.shadow.velocity.y;
            this.bounds.bottom+= this.shadow.velocity.y;*/
        } 
        this.mesh.position.addSelf(this.velocity);
        this.position.addSelf(this.velocity);
        this.bounds.left+= this.velocity.x;
        this.bounds.right+= this.velocity.x;
        this.bounds.top+= this.velocity.y;
        this.bounds.bottom+= this.velocity.y;
        
    }
};
    