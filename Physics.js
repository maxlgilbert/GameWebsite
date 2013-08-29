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
    
    /*obj1 = params.object1;
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
        
       }*/
    obj1 = params.object1;
    obj2 = params.object2;
    /*if(obj1.position.z !== obj2.position.z ) {
        return -1;
    }else */if(params.platform && obj1.velocity.y>0) {
        return -1;
    } else if((obj1.bounds.bottom+10-obj1.velocity.y)<obj2.bounds.top && params.platform){
        return -1;
    } else if(obj1.bounds.left + obj1.velocity.x>obj2.bounds.right + obj2.velocity.x|| obj1.bounds.right + obj1.velocity.x< obj2.bounds.left+obj2.velocity.x|| obj1.bounds.bottom+obj1.velocity.y>obj2.bounds.top +obj2.velocity.y|| obj1.bounds.top +obj1.velocity.y< obj2.bounds.bottom+obj2.velocity.y) {
        return -1;
    } else if (obj1.bounds.right <= obj2.bounds.left && obj1.bounds.right + obj1.velocity.x>= obj2.bounds.left+obj2.velocity.x){
        return 0;
    } else if (obj1.bounds.bottom >= obj2.bounds.top && obj1.bounds.bottom+obj1.velocity.y<=obj2.bounds.top +obj2.velocity.y){
        return 1;
    } else if (obj1.bounds.left >= obj2.bounds.right&& obj1.bounds.left + obj1.velocity.x<=obj2.bounds.right + obj2.velocity.x){
        return 2;
    } else if (obj1.bounds.top <= obj2.bounds.bottom &&obj1.bounds.top +obj1.velocity.y>= obj2.bounds.bottom+obj2.velocity.y){
        return 3;
    } else {
        return 4;
    }
}

GAME.applyGravity = function(params){
    params.player.velocity.y-=1.5;
        //params.player.position.y = GAME.floor + params.player.height/2;
        //console.log("true");
        
    
};

GAME.bounce = function(params){
    if(params.player.bounces < 3){
        params.player.velocity.y *= -.8;
        params.player.bounces++;
    } else {
        //params.player.stop({});
        GAME.player.intersected = true;
    }
};
    