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
GAME.Platform = function(params){//(x, y, z, width, height, dWidth, dHeight, map, color, velocityX, velocityY, pathLength, front){
    GAME.SiteObject.call( this, params );
    /*this.health = params.health;
    this.lives = params.lives;*/
    this.number = GAME.platforms.length;
    //this.velocityX = params.velocityX;
    //this.velocityY = params.velocityY;
    /*if (params.threeD){
        this.depth = params.depth;
        this.geom = new THREE.CubeGeometry(this.width, this.height, this.depth, 1,1,1 );
    } else {*/
    /*this.dWidth = params.dWidth;
    this.dHeight = params.dHeight;
    this.width = params.dWidth;
    this.height = params.dHeight;*/
    this.dX = 0;
    this.dY = 0;
    /*var geometry1 = new THREE.PlaneGeometry(this.dWidth,this.dHeight);
    //}
    var material1 = new THREE.MeshPhongMaterial({color: params.color, transparent:true});
    THREE.Mesh.call(this,geometry1,material1);
    if (params.map) {
        this.material.map=params.map;
    }*/
    //this = new THREE.Mesh(this.geom, material);
    //this.position = new THREE.Vector3(params.x, params.y, params.z );
    
    //this.position.set(this.position.x+this.dWidth/2, this.position.y+this.dHeight/2, 0);
    //if (!params.threeD){
        //this.rotation.x = Math.PI/2;
    //}
   // this.bounds = ({ left:this.position.x-this.dWidth/2, top:this.position.y-this.dHeight/2+this.height, right:this.position.x-this.dWidth/2+this.width, bottom:this.position.y - this.dHeight/2 +this.height });
    //console.log(this.bounds.top);
    //this.pathLength = params.pathLength
    //this.path = ({ left:this.position.x -this.pathLength/2, top:this.position.y + this.height +this.pathLength/2, right:this.position.x + this.width+this.pathLength/2, bottom:this.position.y-this.pathLength/2 });
};

GAME.Platform.prototype = GAME.clone(GAME.SiteObject.prototype);
GAME.Platform.prototype.constructor = GAME.Platform;
GAME.Platform.prototype.intersectPlayer = function(params) {
//var interNum = GAME.intersects({ object1:GAME.player, object2:GAME.platforms[this.number], platform:true});
//var interNum = GAME.intersects({ object1:GAME.player, object2:this, platform:true});
var interNum = params.interNum
//console.log(interNum);
    /*if(interNum==0||interNum==2||interNum==3||interNum==4){
        GAME.collide({object1:GAME.player, object2:this});

        this.setBounds();
        GAME.player.setBounds();
    }else*/ if(interNum===1){
        GAME.player.intersected = true;
        GAME.player.jumps = 0;
        //targetZ =1000;
        GAME.player.platformNumber = this.number;
        var adjust = GAME.player.height/2;
       /* if (GAME.platforms[this.number].velocity.y>0){
            GAME.player.velocity.y =0;
            adjust =GAME.platforms[this.number].velocity.y;
        } else {*/
            //GAME.player.velocity.y = GAME.platforms[this.number].velocity.y;
       
        GAME.player.velocity.y = this.velocity.y;
        if(GAME.player.velocity.y <0){
            GAME.player.velocity.y = 0;
        }
        //}
        //GAME.player.setPosition({x:GAME.player.position.x, y:GAME.platforms[this.number].bounds.top+adjust, z:GAME.player.position.z});
        GAME.player.setPosition({x:GAME.player.position.x, y:this.bounds.top+adjust, z:GAME.player.position.z});
        
        GAME.player.setBounds();
        if(GAME.keyUp){
            GAME.friction({object1:GAME.player});
        }
         if(this.trigger){//&&!this.alreadyTriggered){
            //this.trigger();
            //this.alreadyTriggered = true;
        }
    } else if(interNum===0){
        GAME.player.acceleration.x = 0;
        var adjust = GAME.player.width/2;
        GAME.player.velocity.x = this.velocity.x;
        GAME.player.setPosition({x:this.bounds.left-adjust, y:GAME.player.position.y, z:GAME.player.position.z});
        
        GAME.player.setBounds();
    }else if(interNum===2){
        GAME.player.acceleration.x = 0;
        var adjust = GAME.player.width/2;
        GAME.player.velocity.x = this.velocity.x;
        GAME.player.setPosition({x:this.bounds.right+adjust, y:GAME.player.position.y, z:GAME.player.position.z});
        
        GAME.player.setBounds();
    }
    if(!GAME.player.intersected){
        GAME.player.acceleration.x = 0;
    }
}
/*GAME.Platform.prototype.updatePosition =  function(params) {
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
    //};
    /*GAME.Platform.prototype.setPosition = function(params) {
        
        this.position = new THREE.Vector3(params.x, params.y, params.z );
        
        //this.setBounds();
    };*/
   /* GAME.Platform.prototype.movePosition = function(params) {
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
        //this.mesh.setPosition(this.position
        //this.velocity.x = params.x;
        //this.velocity.y = params.y;
        
        //this.setBounds();
    };*/

    