var GAME = GAME || {};

/*GAME.Platform = function(geometry, material, x, y, z, width, height, dWidth, dHeight, map, color, velocityX, velocityY, pathLength, front){
    this.position = new THREE.Vector3(params.x, params.y, params.z );

    this.width = params.width;
    this.height = params.height;
    this.number = GAME.platforms.length;
    console.log(this.number);
    this.velocity = new THREE.Vector3(params.velocityX||0,params.velocityY|| 0, 0);
    this.geometry = new THREE.PlaneGeometry(params.dWidth,params.dHeight);
    this.material = new THREE.MeshPhongMaterial({color: params.color, transparent:true});
    if (params.map) {
        this.material.map=params.map;
    }
    var z = 0;
    if (params.front) {
        z = 1;
    } else {
        z = -1;
    }
    this.position.set(this.position.x+params.dWidth/2, this.position.y+params.dHeight/2, z);
        this.rotation.x = Math.PI/2;
    this.bounds = ({ left:this.position.x, top:this.position.y+this.height, right:this.position.x+this.width, bottom:this.position.y });
    this.pathLength = params.pathLength
    this.path = ({ left:this.position.x -this.pathLength/2, top:this.position.y + this.height +this.pathLength/2, right:this.position.x + this.width+this.pathLength/2, bottom:this.position.y-this.pathLength/2 });
};*/
GAME.Collectible = function(params){//(x, y, z, width, height, dWidth, dHeight, map, color, velocityX, velocityY, pathLength, front){
  GAME.Platform.call( this, params );
  this.trigger = params.trigger;
  this.alreadyTriggered = false;
};

GAME.Collectible.prototype = GAME.clone(GAME.Platform.prototype);
GAME.Collectible.prototype.constructor = GAME.Collectible;
GAME.Collectible.prototype.intersect = function() {
var interNum = GAME.intersects({ object1:GAME.player, object2:GAME.platforms[this.number], platform:true});
    
        if(this.trigger&&!this.alreadyTriggered){
            this.trigger();
            //this.alreadyTriggered = true;
        }
        this.mesh.material.opacity=0;

}
/*GAME.Collectible.prototype.updatePosition =  function(params) {
    if (this.pathLength!==0){
        if(this.bounds.right > this.path.right) {
            this.velocity.x = -1*Math.abs(this.velocity.x);
        }else if (this.bounds.left < this.path.left) {
            this.velocity.x = Math.abs(this.velocity.x);
        };
        if(this.bounds.top > this.path.top) {
            this.velocity.y = -1*Math.abs(this.velocity.y);
        }else if (this.bounds.bottom < this.path.bottom) {
            this.velocity.y = Math.abs(this.velocity.y);
        };
    }
        this.position.addSelf(this.velocity);
        this.bounds.left+= this.velocity.x;
        this.bounds.right+= this.velocity.x;
        this.bounds.top+= this.velocity.y;
        this.bounds.bottom+= this.velocity.y;

        
        
        /*
        if(this.bounds.right > this.path.right ||this.bounds.left < this.path.left) {
            this.velocity.x*=-1;
            
        };
        if(this.bounds.top > this.path.top ||this.bounds.bottom < this.path.bottom) {
            this.velocity.y*=-1;
        };*/
    /*};
    GAME.Collectible.prototype.setPosition = function(params) {
        this.bounds.left =params.x;
        this.bounds.right =params.x+this.width;
        this.bounds.top =params.y+this.height;
        this.bounds.bottom =params.y;
        this.position = new THREE.Vector3(params.x+this.dWidth/2, params.y+this.dHeight/2, params.z );
        
        //this.setBounds();
    };
    GAME.Collectible.prototype.movePosition = function(params) {
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
        /*this.velocity.x = params.x;
        this.velocity.y = params.y;*/
        
        //this.setBounds();
    //};