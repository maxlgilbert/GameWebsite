var GAME = GAME || {};

GAME.Picture = function(params){
  GAME.SiteObject.call( this, params );
  this.number = params.number;
  this.offSet = 1200 / 2;
  this.position.x = 1200*(this.number-2/2 + .5);
  this.position.z =((this.position.x)*Math.tan(Math.acos((this.position.x)/1200)))-1200;

};

GAME.Picture.prototype = GAME.clone(GAME.SiteObject.prototype);
GAME.Picture.prototype.constructor = GAME.Picture;
GAME.Picture.prototype.updatePosition = function() {
    this.velocity.x = GAME.player.velocity.x;
    /*var x = GAME.player.position.x;
    this.position.x = x;
    x = Math.abs(x);*/
    this.position.z =((this.position.x)*Math.tan(Math.acos((this.position.x)/1200)))-1200;
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
        this.mesh.rotation.y = this.position.x/3600;
        this.mesh.material.opacity = this.position.z/1200 + 1;
        this.bounds.left+= this.velocity.x;
        this.bounds.right+= this.velocity.x;
        this.bounds.top+= this.velocity.y;
        this.bounds.bottom+= this.velocity.y;
}