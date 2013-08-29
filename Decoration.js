var GAME = GAME || {};





GAME.Decoration = function(params){
    this.platform = params.platform;
    if (this.platform === undefined) {
        this.position = new THREE.Vector3(params.x, params.y, params.z );
        this.velocity = new THREE.Vector3(params.velocityX||0,params.velocityY|| 0, params.velocityZ||0);
        this.width = params.width;
        this.depth = params.depth;
    } else {
        this.position = new THREE.Vector3(this.platform.position.x, this.platform.position.y+this.platform.height, this.platform.position.z );
        this.velocity = new THREE.Vector3(this.platform.velocity.x, this.platform.velocity.y, 0);
        this.width = this.platform.width;
        this.depth = this.platform.depth;
    };
    
    
    
    this.height = params.height;
    if (params.threeD){
        
        this.geom = new THREE.CubeGeometry(this.width, this.height, this.depth, 1,1,1 );
    } else {
        this.geom = new THREE.PlaneGeometry(this.width,this.height);
    }
    var material = new THREE.MeshPhongMaterial({color: params.color, transparent:true});
    if (params.map) {
        material.map=params.map;
    }
    this.threeD = params.threeD;
    this.mesh = new THREE.Mesh(this.geom, material);
    this.mesh.position.set(this.position.x+this.width/2, this.position.y+this.height/2, this.position.z);
    if(!params.threeD){
        //this.mesh.rotation.x = Math.PI/2;
    }
        
    //this.bounds = ({ left:this.position.x, top:this.position.y+this.height, right:this.position.x+this.width, bottom:this.position.y });
};
GAME.Decoration.prototype = {
    draw : function() {
        scene.add(this.mesh);
    },
    
    updatePosition : function(params) {
        if(this.platform) {
            this.velocity=(this.platform.velocity);
        }
        this.mesh.position.addSelf(this.velocity);
        this.position.addSelf(this.velocity);
    },
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
    var cycleTween3 = new TWEEN.Tween({ background:params.background , colorR:1,colorG:0, colorB:.2, intensity:.5,light:light})
    //.easing(TWEEN.Easing.Quadratic.In)
    .to({ colorR:0,colorG:1, colorB:1, intensity:1 }, 3000)
    .onUpdate( function(){
              this.background.color.setRGB(this.colorR, this.colorG, this.colorB);
              this.light.intensity = this.intensity;
              })
    .onComplete( function(){
                GAME.day();
                });
    var cycleTween2 = new TWEEN.Tween({ background:params.background ,colorR:0, colorG:.4, colorB:.4, intensity:.3,light:light})
    //.easing(TWEEN.Easing.Quadratic.In)
    .to({colorR:1, colorG:0, colorB:.2, intensity:.5 }, 5000)
    .onUpdate( function(){
              this.background.color.setRGB(this.colorR, this.colorG, this.colorB);
              this.light.intensity = this.intensity;
              })
    .chain(cycleTween3);
    var cycleTween1 = new TWEEN.Tween({ background:params.background , colorG:1, colorB:1, intensity: 1, light:light  })
    .to({ colorG:.4, colorB:.4, intensity:.3 }, 20000)
    //.easing(TWEEN.Easing.Quadratic.In)
    .onUpdate( function(){
              this.background.color.setRGB(0, this.colorG, this.colorB);
              this.light.intensity = this.intensity;
              })
    .onComplete(function() {
                cycleTween2.start();
                GAME.night();
                });
    //.chain();
    //cycleTween2.chain(cycleTween1);
    cycleTween1.start();
};