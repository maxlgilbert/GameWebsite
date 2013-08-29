var GAME = GAME || {};





GAME.Decoration = function(params){
    this.position = new THREE.Vector3(params.x, params.y, params.z );
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.width = params.width;
    this.height = params.height;
    this.velocity = new THREE.Vector3(0, 0, 0);
    var plane = new THREE.PlaneGeometry(this.width,this.height);
    var material = new THREE.MeshBasicMaterial({color: params.color});
    this.mesh = new THREE.Mesh(plane, material);
    this.mesh.position.set(this.position.x+this.width/2, this.position.y+this.height/2, this.position.z);
    this.mesh.rotation.x = Math.PI/2;
    //this.bounds = ({ left:this.position.x, top:this.position.y+this.height, right:this.position.x+this.width, bottom:this.position.y });
};
GAME.Decoration.prototype = {
    
};
/*
GAME.night = function(params) {
    for (var i = computersAdded; i < killedComputers.length + computers.length; i++) {
        (computers.push(new GAME.PlatformComputer({ platform: platforms[i-computers.length], x:10, y:0, z:0, velocityX:2 + 2*Math.random(), health:10, width:30, height:30, color:0xFF0000 })));
    }
    for(var i =computersAdded; i < computers.length; i++) {
        scene.add((computers[i].mesh));
        computersAdded++;
    }
};*/
GAME.dayNightCycle = function(params) {
    var cycleTween3 = new TWEEN.Tween({ background:params.background , colorR:1,colorG:0, colorB:.2})
    //.easing(TWEEN.Easing.Quadratic.In)
    .to({ colorR:0,colorG:1, colorB:1 }, 3000)
    .onUpdate( function(){
              this.background.color.setRGB(this.colorR, this.colorG, this.colorB);
              })
    .onComplete( function(){
                GAME.day();
                });
    var cycleTween2 = new TWEEN.Tween({ background:params.background ,colorR:0, colorG:.1, colorB:.1})
    //.easing(TWEEN.Easing.Quadratic.In)
    .to({colorR:1, colorG:0, colorB:.2 }, 30000)
    .onUpdate( function(){
              this.background.color.setRGB(this.colorR, this.colorG, this.colorB);
              })
    .chain(cycleTween3);
    var cycleTween1 = new TWEEN.Tween({ background:params.background , colorG:1, colorB:1,  })
    .to({ colorG:.1, colorB:.1 }, 20000)
    //.easing(TWEEN.Easing.Quadratic.In)
    .onUpdate( function(){
              this.background.color.setRGB(0, this.colorG, this.colorB); 
              })
    .onComplete(function() {
                cycleTween2.start();
                GAME.night();
                });
    //.chain();
    //cycleTween2.chain(cycleTween1);
    cycleTween1.start();
};