var GAME = GAME || {};
GAME.ParticleEmitter = function(params){//(x, y, z, width, height, dWidth, dHeight, map, color, velocityX, velocityY, pathLength, front){
  GAME.SiteObject.call( this, params );
  this.geom = new THREE.Geometry();
  this.direction = params.direction;
  var material = new THREE.ParticleBasicMaterial( { size: 256, color:0x888888, depthTest: false, transparent : true, opacity: .05, map: GAME.Textures['fire'].threeObj} );
  this.particleSyst = new THREE.ParticleSystem( this.geom, material);
  this.particleSyst.sortParticles = true;
  scene.add(this.particleSyst);
  for(var i = 0; i < 1000; i++){
    var range = 50 - this.particleSyst.position.x;
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * range - range/2 + this.position.x;
    if(this.direction==0){
        vertex.y = Math.random() * 200 + this.position.y;
    } else if(this.direction==1){
        vertex.y = -1*Math.random() * 200 + this.position.y;
    }
    vertex.z = Math.random() * 40-20+this.position.z;
    var particle1 = vertex;
    if(this.direction==0){
        particle1.velocity = new THREE.Vector3(.1, .1,.5);
    } else if(this.direction==1){
        particle1.velocity = new THREE.Vector3(.1, -.1,.5);
    }
    this.geom.vertices.push( particle1 );
    
  }
};

GAME.ParticleEmitter.prototype = GAME.clone(GAME.SiteObject.prototype);
GAME.ParticleEmitter.prototype.constructor = GAME.ParticleEmitter;
GAME.ParticleEmitter.prototype.updatePosition = function(){
    var range = 50 - this.particleSyst.position.x;
    for (i = 0; i <this.geom.vertices.length; i++){
        var particle1 = this.geom.vertices[i];
        if(this.direction==0){
            if (particle1.y > 4000*Math.random()+100+ this.position.y) {
                particle1.x = Math.random()*10+this.position.x;
                particle1.y = Math.random()* 10+ this.position.y;
                particle1.z = Math.random() * 100-50 + this.position.z;
            }
            particle1.x += 10*Math.random()-5;
            particle1.y += 3*Math.random();
            particle1.y += 4*Math.random()-2;
        } else if(this.direction==1){
            if (particle1.y < -4000*Math.random()-100+ this.position.y) {
                particle1.x = Math.random()*10+this.position.x;
                particle1.y = -1*Math.random()* 10+ this.position.y;
                particle1.z = Math.random() * 100-50 + this.position.z;
            }
            particle1.x += 10*Math.random()-5;
            particle1.y -= 3*Math.random();
            particle1.y += 4*Math.random()-2;
        }
        particle1.addSelf(particle1.velocity);
    }
}

//SMOKE PARTICLES
                /*OURBOMBS.scene1.smokeParticlesCount = 600;
                OURBOMBS.scene1.particleGeom = 
                
                OURBOMBS.scene1.particleSyst = new THREE.ParticleSystem( OURBOMBS.scene1.particleGeom, OURBOMBS.Materials.ParticleSmoke);
                OURBOMBS.scene1.particleSyst.position.y = -340;
                OURBOMBS.scene1.particleSyst.position.x = 370;
                OURBOMBS.scene1.particleSyst.position.z = -10;
                
                scene.add( OURBOMBS.scene1.particleSyst );
                
                for ( i = 0; i < OURBOMBS.scene1.smokeParticlesCount; i ++ ) {
                    addNewParticle();
				}

                function addNewParticle(){
                
            }

            
            this.materials = new THREE.ParticleBasicMaterial( { size: 64,  depthTest: false, transparent : true, opacity: .3, map: GAME.Textures['fire'].threeObj} );*/



