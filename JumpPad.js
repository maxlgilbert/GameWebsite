var GAME = GAME || {};





GAME.JumpPad = function(params){
    GAME.SiteObject.call( this, params );
    //this.siteObject = params.siteObject;
    
    this.setBounds();
    //this.health = params.health;
    //this.bounces = 0;
    this.used = false;
    this.level = 0;
    //this.jumps =0;
    //this.mesh.rotation.x = Math.PI/2;
    
};
GAME.JumpPad.prototype = GAME.clone(GAME.SiteObject.prototype);
GAME.JumpPad.prototype.constructor = GAME.JumpPad;
GAME.JumpPad.prototype.intersect = function() {
        GAME.player.jumps==1;
        GAME.player.jumpPlayer({jump:GAME.player.jumpHeight*2});
    };
    
/*GAME.JumpPad.prototype.updatePosition = function(params) {
       // console.log(this.platform.velocity.x);
        this.bounds.left+= this.siteObject.velocity.x;
        this.bounds.right+= this.siteObject.velocity.x;
        this.bounds.top+= this.siteObject.velocity.y;
        this.bounds.bottom+= this.siteObject.velocity.y;
        //this.mesh.position.addSelf(this.siteObject.velocity);
        this.position.addSelf(this.siteObject.velocity);
        
    };*/

    