var GAME = GAME || {};

GAME.clone = function( object ) {
                function tempConstructor(){};
                tempConstructor.prototype = object;
                return new tempConstructor;
            }

//Defines new Game Object
GAME.SiteObject = function( params ) {
    //MESH
    this.width = params.width;
    this.height = params.height;
     var geometry1 = new THREE.PlaneGeometry(this.width, this.height)
    //}
    var material1 = new THREE.MeshBasicMaterial({color: params.color, transparent:true});
    THREE.Mesh.call(this,geometry1,material1);
    if (params.map) {
        this.material.map=params.map;
    }
    //this.doubleSided=true;
    //this.position = new THREE.Vector3 ( params.x+ this.width/2, params.y+ this.height/2, params.z );
   

    //PHYSICS
    this.position = new THREE.Vector3 ( params.x, params.y, params.z );
    //this.position.set(this.position.x, this.position.y, this.position.z);
    this.velocityX = params.velocityX;
    this.velocityY = params.velocityY;
    this.acceleration = new THREE.Vector3(0,0,0);
    this.velocity = new THREE.Vector3(this.velocityX||0,this.velocityY|| 0, 0);
    this.mass = params.mass;
    
    //PROPERTIES
    //this.bounds = ({ left:this.position.x, top:this.position.y+this.height, right:this.position.x+this.width, bottom:this.position.y});
    this.bounds = ({ left:this.position.x-this.width/2, top:this.position.y+this.height/2, right:this.position.x+this.width/2, bottom:this.position.y-this.height/2});
    this.pathLength = params.pathLength||0;
    this.path = ({ left:this.position.x -this.pathLength/2, top:this.position.y + this.height +this.pathLength/2, right:this.position.x + this.width+this.pathLength/2, bottom:this.position.y-this.pathLength/2 });
    this.held = false;
    this.trigger = params.trigger;
    this.alreadyTriggered = false;

    //CHILDREN
    this.siteObject = params.siteObject;
    if(this.siteObject) {
        this.position.set(this.siteObject.position.x+ params.x, 
                          this.siteObject.position.y+params.y,
                          this.siteObject.position.z + params.z );
        //this.siteObject.trigger = this.trigger;
    }
    if(params.scaleX){
        //this.mesh.scale.set(params.scaleX,params.scaleY,1);
        this.scale.set(params.scaleX,params.scaleY,1);
        
    }
}


GAME.SiteObject.prototype = GAME.clone(THREE.Mesh.prototype);
GAME.SiteObject.prototype.constructor = GAME.SiteObject;
GAME.SiteObject.prototype.updatePosition = function() {
		/*if (this.pathLength!==0){
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
    	}*/
    	if(this.siteObject){
        	this.velocity = (this.siteObject.velocity);
        }
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.setBounds();
        /*this.bounds.left+= this.velocity.x;
        this.bounds.right+= this.velocity.x;
        this.bounds.top+= this.velocity.y;
        this.bounds.bottom+= this.velocity.y;*/
        
       // this.mesh.position.x = this.position.x + this.width/2;//(this.position);
       // this.mesh.position.y = this.position.y + this.height/2;//(this.position);
        //this.mesh.position.z = this.position.z;
	}
GAME.SiteObject.prototype.setBounds = function() {
    this.bounds = ({ left:this.position.x-this.width/2, top:this.position.y+this.height/2, right:this.position.x+this.width/2, bottom:this.position.y-this.height/2});
    
    }
GAME.SiteObject.prototype.intersect = function(params){
        
    }
GAME.SiteObject.prototype.movePosition = function(params) {
        var constant = 60;
        this.velocity.x = constant*(params.x)/GAME.framerate;
        this.velocity.y= constant*(params.y)/GAME.framerate;
        this.dX = params.x;
        this.dY = params.y;

        this.setBounds();
       /* this.bounds.left +=params.x;
        this.bounds.right +=params.x;
        this.bounds.top +=params.y;
        this.bounds.bottom +=params.y;
        this.position.x+=params.x;
        this.position.y+=params.y;
        this.position.z+=params.z;
        //this.path = ({ left:this.position.x -this.pathLength/2, top:this.position.y + this.height +this.pathLength/2, right:this.position.x + this.width+this.pathLength/2, bottom:this.position.y-this.pathLength/2 });
        //this.mesh.setPosition(this.position
        /*this.velocity.x = params.x;
        this.velocity.y = params.y;*/
        
        //this.setBounds();
    }
    GAME.SiteObject.prototype.intersectPlayer = function(params) {
    }
GAME.SiteObject.prototype.setPosition = function(params) {
        this.position = new THREE.Vector3(params.x, params.y, params.z );
        //this.position.set(this.position.x+this.width/2.0, this.position.y+this.height/2.0, this.position.z);
        //this.position.set(this.position.x, this.position.y, this.position.z);
        this.setBounds();
       // this.setBounds();
    }

    GAME.SiteObject.prototype.clicked = function() {
        
        if(this.trigger){//&&!this.alreadyTriggered){
            this.trigger();
            this.alreadyTriggered = true;
        }
        /*if(this.siteObject){
            console.log("HELLOO");
            if(this.siteObject.trigger){//&&!this.alreadyTriggered){
                this.siteObject.trigger();
                this.siteObject.alreadyTriggered = true;
            }
        }*/
    }
    /*updateMorphTargets : function () {

        if ( this.geometry.morphTargets.length > 0 ) {

            this.morphTargetBase = -1;
            this.morphTargetForcedOrder = [];
            this.morphTargetInfluences = [];
            this.morphTargetDictionary = {};

            for ( var m = 0, ml = this.geometry.morphTargets.length; m < ml; m ++ ) {

                this.morphTargetInfluences.push( 0 );
                this.morphTargetDictionary[ this.geometry.morphTargets[ m ].name ] = m;

            }

        }

    }*/
