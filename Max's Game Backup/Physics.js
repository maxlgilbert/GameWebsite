var GAME = GAME || {};



GAME.intersects = function(params){
    
    /*
     obj1 = params.object1;
    obj1x = obj1.position.x+obj1.velocity.x - obj1.width;
    obj1y = obj1.position.y+obj1.velocity.y - obj1.height;
    obj2 = params.object2;
    obj2x = obj2.position.x+obj2.velocity.x - obj2.width;
    obj2y = obj2.position.y+obj2.velocity.y - obj2.height;
    */
    
    obj1 = params.object1;
    obj2 = params.object2;
    if(obj1.position.z !== obj2.position.z ) {
        return false;
    };
    if(params.platform && params.object1.velocity.y>0) {
        return false;
    } else if((obj1.bounds.bottom+10-obj1.velocity.y)<obj2.bounds.top && params.platform){
       return false;
    } else if(obj1.bounds.left>obj2.bounds.right|| obj1.bounds.right< obj2.bounds.left|| obj1.bounds.bottom+obj1.velocity.y>obj2.bounds.top +obj2.velocity.y|| obj1.bounds.top +obj1.velocity.y< obj2.bounds.bottom+obj2.velocity.y) {
        return false;
    } else {
        obj1.jumps = 0;
        return true;
        
       }
}

GAME.applyGravity = function(params){
    if (!params.player.intersected) {
        params.player.velocity.y-=.5;
    } else {
        //params.player.position.y = GAME.floor + params.player.height/2;
        //console.log("true");
        
    }
};

GAME.bounce = function(params){
    if(params.player.bounces < 3){
        params.player.velocity.y *= -.8;
        params.player.bounces++;
    } else {
        //params.player.stop({});
        player.intersected = true;
    }
};
    