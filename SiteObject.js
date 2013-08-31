var GAME = GAME || {};

GAME.clone = function( object ) {
                function tempConstructor(){};
                tempConstructor.prototype = object;
                return new tempConstructor;
            }

//Defines new Game Object
GAME.SiteObject = function( params ) {
	this.position = new THREE.Vector3 ( params.x, params.y, params.z );
    this.width = params.width;
    this.height = params.height;
    this.position.set(this.position.x+params.width/2, this.position.y+params.height/2, this.position.z);
    this.velocityX = params.velocityX;
    this.velocityY = params.velocityY;
    this.velocity = new THREE.Vector3(this.velocityX||0,this.velocityY|| 0, 0);
    this.bounds = ({ left:this.position.x-this.width/2, top:this.position.y-this.height/2+this.height, right:this.position.x-this.width/2+this.width, bottom:this.position.y - this.height/2 +this.height });
    this.pathLength = params.pathLength||0;
    this.path = ({ left:this.position.x -this.pathLength/2, top:this.position.y + this.height +this.pathLength/2, right:this.position.x + this.width+this.pathLength/2, bottom:this.position.y-this.pathLength/2 });
    this.siteObject = params.siteObject;
    if(this.siteObject) {
        this.position.set(this.siteObject.position.x+ params.x, 
                          this.siteObject.bounds.top+params.y,
                          this.siteObject.position.z + params.z );
    }
    if(this.width != 0){
    	var material = new THREE.MeshPhongMaterial({color: params.color, transparent:true});
    	if (params.map) {
        	material.map=params.map;
    	}
    	this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(this.width, this.height),material);
    	this.mesh.position = (this.position);
	}
}

GAME.SiteObject.prototype = {
	updatePosition : function() {
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
    	if(this.siteObject){
        	this.velocity = (this.siteObject.velocity);
        }
        this.position.addSelf(this.velocity);

        this.bounds.left+= this.velocity.x;
        this.bounds.right+= this.velocity.x;
        this.bounds.top+= this.velocity.y;
        this.bounds.bottom+= this.velocity.y;
	},
    setBounds : function() {
        this.bounds = ({ left:this.position.x-this.width/2, top:this.position.y-this.height/2+this.height, right:this.position.x-this.width/2+this.width, bottom:this.position.y - this.height/2 +this.height });
    },
    intersect : function(params){
        console.log("nothing");
    }
}