var GAME = GAME || {};



GAME.collide = function(params){
//v1 = (u1 (m1-m2)+2m2u2)/(m1+m2)
//v2 = (u2 (m2-m1)+2m1u1)/(m1+m2)
    //v1x = v1Math.sin(theta1-phi)Math.cos(phi+pi/2)+Math.cos(phi)(v1Math.cos(theta1-phi)(m1-m2)+2m2v2Math.cos(theta2-phi))/(m1+m2)
   //v1y = v1Math.sin(theta1-phi)Math.cos(phi+pi/2)+Math.sin(phi)(v1Math.cos(theta1-phi)(m1-m2)+2m2v2Math.cos(theta2-phi))/(m1+m2)
   obj1 = params.object1;
   obj2 = params.object2;
   var vel1 = Math.sqrt(obj1.velocity.x*obj1.velocity.x,obj1.velocity.y*obj1.velocity.y);
   var vel2 = Math.sqrt(obj2.velocity.x*obj2.velocity.x,obj2.velocity.y*obj2.velocity.y);
   var diffX = obj2.velocity.x - obj1.velocity.x;
   var diffY = obj2.velocity.y - obj1.velocity.y;
   theta1 = Math.atan2(obj1.velocity.y,obj1.velocity.x);
   theta2 = Math.atan2(obj2.velocity.y,obj2.velocity.x);
   var phi = theta2-theta1 ;

   var velX1 = vel1*Math.sin(theta1-phi)*Math.cos(phi+Math.PI/2)+Math.cos(phi)*(vel1*Math.cos(theta1-phi)*(obj1.mass-obj2.mass)+2*obj2.mass*vel2*Math.cos(theta2-phi))/(obj1.mass+obj2.mass)
   var velY1 = vel1*Math.sin(theta1-phi)*Math.sin(phi+Math.PI/2)+Math.sin(phi)*(vel1*Math.cos(theta1-phi)*(obj1.mass-obj2.mass)+2*obj2.mass*vel2*Math.cos(theta2-phi))/(obj1.mass+obj2.mass)
   if(!obj1.held){
      obj1.movePosition({x:velX1, y:velY1});
    }

   phi = theta1-theta2 ;
   var velX2 = vel2*Math.sin(theta2-phi)*Math.cos(phi+Math.PI/2)+Math.cos(phi)*(vel2*Math.cos(theta2-phi)*(obj2.mass-obj1.mass)+2*obj1.mass*vel1*Math.cos(theta1-phi))/(obj2.mass+obj1.mass)
   var velY2 = vel2*Math.sin(theta2-phi)*Math.sin(phi+Math.PI/2)+Math.sin(phi)*(vel2*Math.cos(theta2-phi)*(obj2.mass-obj1.mass)+2*obj1.mass*vel1*Math.cos(theta1-phi))/(obj2.mass+obj1.mass)
    if(!obj2.held){
     obj2.movePosition({x:velX2, y:velY2});
 }
}
GAME.intersects = function(params){
    //GAME.collide(params);
    obj1 = params.object1;
    obj2 = params.object2;
    var error = 10;
    //FIXIXIXIXI
     /*if(obj1.bounds.left + obj1.velocity.x>obj2.bounds.right + obj2.velocity.x|| obj1.bounds.right + obj1.velocity.x< obj2.bounds.left+obj2.velocity.x|| obj1.bounds.bottom+obj1.velocity.y>obj2.bounds.top +obj2.velocity.y|| obj1.bounds.top +obj1.velocity.y< obj2.bounds.bottom+obj2.velocity.y) {
        return -1;
    } else */
    if(obj1.bounds.left > obj2.bounds.right&&obj1.bounds.left + obj1.velocity.x>obj2.bounds.right + obj2.velocity.x){
        return -1;
      }else if(obj1.bounds.right < obj2.bounds.left&&obj1.bounds.right + obj1.velocity.x<obj2.bounds.left + obj2.velocity.x){
        return -1;
      }else if(obj1.bounds.bottom > obj2.bounds.top&&obj1.bounds.bottom + obj1.velocity.y>obj2.bounds.top + obj2.velocity.y){
        return -1;
      }else if(obj1.bounds.top < obj2.bounds.bottom&&obj1.bounds.top + obj1.velocity.y<obj2.bounds.bottom + obj2.velocity.y){
        return -1;
      } else if (obj1.bounds.bottom >= obj2.bounds.top-error && obj1.bounds.bottom+obj1.velocity.y<=obj2.bounds.top +obj2.velocity.y){
        return 1;
    } else if (obj1.bounds.top <= obj2.bounds.bottom+error &&obj1.bounds.top +obj1.velocity.y>= obj2.bounds.bottom+obj2.velocity.y){
        return 3;
    } else if (obj1.bounds.right <= obj2.bounds.left+error && obj1.bounds.right + obj1.velocity.x>= obj2.bounds.left+obj2.velocity.x){
        return 0;
    }else if (obj1.bounds.left >= obj2.bounds.right-error&& obj1.bounds.left + obj1.velocity.x<=obj2.bounds.right + obj2.velocity.x){
        return 2;
    } else {

        return -1;
    }
}

GAME.friction = function(params){

    obj1 = params.object1;
    //obj2 = params.object2;
    var mu = .1;
    var Force = mu*9.8;
    var sign = 0;
    if(obj1.velocity.x!=0){
      sign = obj1.velocity.x/(Math.abs(obj1.velocity.x));
    }
    if(sign>=0){
      obj1.acceleration.x = -Force;
      if(obj1.velocity.x  -Force < 0){
        obj1.acceleration.x = 0;
        obj1.movePosition({x:0, y:obj1.velocity.y});
      }
    }else if(sign<=0){
      obj1.acceleration.x = Force;
      if(obj1.velocity.x  +Force > 0){
        obj1.acceleration.x = 0;
        obj1.movePosition({x:0, y:obj1.velocity.y});
      }
    }

}
/*
GAME.intersectsNoBottom = function(params){

    obj1 = params.object1;
    obj2 = params.object2;
    //f(obj1.position.z !== obj2.position.z ) {
    //    return -1;
    //}else 
    if(params.platform && obj1.velocity.y>0) {
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
}*/


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
    