var GAME = GAME || {};





GAME.PlatformComputer = function(params){
    this.platform = params.platform;
    this.position = new THREE.Vector3(this.platform.position.x + params.x, this.platform.bounds.top + params.y, this.platform.position.z + params.z );
    this.velocity = new THREE.Vector3(params.velocityX, 0, 0);
    this.health = params.health;
    this.width = params.width;
    this.height = params.height;
    this.bounces = 0;
    this.intersected = false;
    this.ghost = params.ghost;
    this.jumps =0;
    this.geometry;
    this.materials;
    this.particles;
    this.attackLeft = params.attackLeft;
    this.hitBox;
    var plane = new THREE.PlaneGeometry(this.width,this.height);
    var material = new THREE.MeshBasicMaterial({color: params.color, transparent :true});
    this.mesh = new THREE.Mesh(plane, material);
    this.mesh.position.set(this.position.x + this.width/2, this.position.y + this.height/2, this.position.z);
    this.mesh.rotation.x = Math.PI/2;
    this.bounds = ({ left:this.position.x, top:this.position.y+this.height, right:this.position.x+this.width, bottom:this.position.y });
    
    this.path = ({ left:this.platform.bounds.left, right:this.platform.bounds.right });  
    
};
GAME.PlatformComputer.prototype = {
    
    movePlayer : function(params) {
        if (params.bool) {
            //params.player.mesh.position.x +=7;
            this.velocity.x =params.speed;
        } else {
            this.velocity.x =-params.speed;
        }
        //this.intersected = false;
    },
    
    stopPlayer : function(params) {
        //this.velocity.x =0;
        this.velocity.y =0;
    },
    
    jumpPlayer : function(params) {
        if(this.jumps<2){
            this.velocity.y =params.jump;
            this.bounces = 0;
            this.jumps++;
            this.intersected = false;
        }
    },
    
    updatePosition : function(params) {
        if(this.intersected) {
            //this.stop({});
            this.velocity.y = 0;
        }
        //GAME.applyGravity({ player:this });
        /*
        if(params.newPosition) {
            this.mesh.position.x = params.newPosition.x + this.width/2;
            this.mesh.position.y = params.newPosition.y + this.height/2;
            this.mesh.position.z = params.newPosition.z;
            this.position=params.newPosition;
            this.bounds.left= params.newPosition.x;
            this.bounds.right= params.newPosition.x+this.width;
            this.bounds.top= params.newPosition.y;
            this.bounds.bottom= params.newPosition.y + this.height;
        }*/
        this.mesh.position.addSelf(this.velocity);
        this.position.addSelf(this.velocity);
        this.bounds.left+= this.velocity.x;
        this.bounds.right+= this.velocity.x;
        this.bounds.top+= this.velocity.y;
        this.bounds.bottom+= this.velocity.y;
        if(this.bounds.right > this.path.right ||this.bounds.left < this.path.left) {
            this.velocity.x*=-1;
        };
    },
    
    killed : function(params) {
        killCompSFX.play();
        var killedTween = new TWEEN.Tween ({ xPos:this.position.x, initialsYPos:this.position.y, yPos:-.5, zPos:this.position.z, comp:this, scene:scene, mesh:this.mesh, particles:this.particles, ghost:this.ghost, hitBox:this.hitBox })
        .to ({ xPos:player.position.x -5 + 10 * Math.random(), yPos: 1, zPos: 1100 }, 500)
        .onUpdate( function(){
                  this.comp.position.x = this.xPos;
                  this.comp.position.y -= 100*Math.pow(this.yPos,5);
                  this.comp.position.z = this.zPos;
                  this.comp.mesh.position.x = this.xPos;
                  this.comp.mesh.position.y -= 100*Math.pow(this.yPos,5);
                  this.comp.mesh.position.z = this.zPos;
                  } )
        .onComplete( function() {
                    scene.remove(this.mesh);
                    if (this.ghost){
                        scene.remove(this.particles);
                        this.hitBox.position.z = -1;
                        
                    };
                    //this.mesh.material.opacity = 0;;
                    //computers.remove(this);
                    });
        killedTween.start();
        if (!this.ghost) {
            killedComputers.push(this);
        }
    },
    attack : function(params) {
        
        this.geometry = new THREE.Geometry();
        var vertX = this.bounds.right+this.width/2+ Math.random() * 50;
        if(this.attackLeft) {
            vertX = this.bounds.left-this.width/2- Math.random() * 50;
        }
        
        for ( i = 0; i < 50; i ++ ) {
            
            
            var vertex = new THREE.Vector3();
            vertex.y = this.position.y;//0;
            vertex.x = vertX;
            var particle = vertex;
            particle.velocity = new THREE.Vector3(0, 0,0);
            this.geometry.vertices.push( particle );
            
        }
        parameters = [ [105, 105, 105], 32 ];
        
        
        size  = parameters[1];
        color = parameters[0];
        
        this.materials = new THREE.ParticleBasicMaterial( { size: size,  depthTest: false, transparent : true, opacity: .2} );
        this.materials.color.setHex( 0xFF0000);
        
        this.particles = new THREE.ParticleSystem( this.geometry, this.materials);
        this.particles.position.y = 0;
        this.particles.sortParticles = true;
        
        scene.add( this.particles );
        if(this.attackLeft) {
            this.hitBox = new GAME.Projectile({ x:this.bounds.left - 50, y:this.position.y, z:0, width:50, height:this.height, color:0x000000, hitBox:true, shadow:this })
        }else {
            this.hitBox = new GAME.Projectile({ x:this.bounds.right, y:this.position.y, z:0, width:50, height:this.height, color:0x000000, hitBox:true, shadow:this })
        }
        projectiles.push(this.hitBox);
    },
    
    fireAttackUpdate : function(params) {
        for (i = 0; i <50; i++){
            var particle = this.geometry.vertices[i];
            //particle.y -= Math.random();
            if(this.attackLeft) {
                if (particle.x < this.bounds.left - 50) {
                    particle.x = this.bounds.left-this.width/2;;//0;
                    particle.y = this.position.y + this.height/2;//0;
                    particle.velocity.x =0;
                }
                particle.velocity.x -=.5 +Math.random()/2;
            } else {
                if (particle.x > this.bounds.right + 50) {
                    particle.x = this.bounds.right+this.width/2;;//0;
                    particle.y = this.position.y + this.height/2;//0;
                    particle.velocity.x =0;
                }
                particle.velocity.x +=.5 +Math.random()/2;
            }
            particle.y += 6*Math.random()-3;
            //particle.velocity.x -= particle.velocity.x-Math.random()/2;
            particle.addSelf(particle.velocity);
        }
    }
    
};
GAME.day = function() {
    dayTime = true;
    for (var i = 0; i < originalNumber; i++) {
        computers[i].mesh.material.opacity = 1;  
    };
    for (var i = 0; i < killedComputers.length; i++) {
        computers[i+originalNumber].mesh.material.opacity = 0;
        computers[i+originalNumber].materials.opacity = 0;
        //scene.remove(computers[i+originalNumber].mesh);  
    };
    GAME.dayNightCycle({ background:decorations[0].mesh.material});
};
GAME.night = function() {
    for (var i = 0; i < originalNumber; i++) {
        computers[i].mesh.material.opacity = 0;
        //scene.remove(computers[i].mesh);  
    };
    dayTime = false;
    for (var i = computers.length; i < killedComputers.length + originalNumber; i++) {
        (computers.push(new GAME.PlatformComputer({ platform: platforms[50+i-2*originalNumber], x:10, y:0, z:0, velocityX:2 + 2*Math.random(), health:10, width:30, height:30, color:0xFF0000, ghost:true, attackLeft:i%2===0 })));
        scene.add((computers[i].mesh));
        computers[i].attack();
        //computersAdded++;
    }
    for(var i =0; i < killedComputers.length; i++) {
        computers[i+originalNumber].mesh.material.opacity = 1;
        computers[i+originalNumber].materials.opacity = .2;
        
        //computersAdded++;
    }
};
    