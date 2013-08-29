var GAME = GAME || {};





GAME.SharpThing = function(params){
    this.platform = params.platform;
    this.position = new THREE.Vector3(this.platform.position.x + params.x, this.platform.bounds.bottom - params.y, this.platform.position.z + params.z );
    this.velocity = new THREE.Vector3(params.velocityX, 0, 0);
    //this.health = params.health;
    this.width = params.width;
    this.height = params.height;
    //this.bounces = 0;
    this.used = false;
    this.level = 0;
    this.temporary = params.temporary;
    //this.jumps =0;
    this.geom = new THREE.PlaneGeometry(params.dWidth,params.dHeight);
    var material = new THREE.MeshPhongMaterial({color: params.color, transparent:true});
    if (params.map) {
        material.map=params.map;
    }
    this.mesh = new THREE.Mesh(this.geom, material);
    this.mesh.position.set(this.position.x+params.dWidth/2, this.position.y-params.dHeight/2, this.position.z);
    //this.mesh.rotation.x = Math.PI/2;
    this.bounds = ({ left:this.position.x, top:this.position.y-this.height, right:this.position.x+this.width, bottom:this.position.y });
    
};
GAME.SharpThing.prototype = {
    
    updatePosition : function(params) {
       // console.log(this.platform.velocity.x);
        this.bounds.left+= this.platform.velocity.x;
        this.bounds.right+= this.platform.velocity.x;
        this.bounds.top+= this.platform.velocity.y;
        this.bounds.bottom+= this.platform.velocity.y;
        this.mesh.position.addSelf(this.platform.velocity);
        this.position.addSelf(this.platform.velocity);
        
    },
};
    