var GAME = GAME || {};



var videoD, imageD, imageContextD,
            textureD;


GAME.level1 =new GAME.Level({
                            
init:function() {
    GAME.siteObjects = [];
    //decorations
    GAME.decorations = [];
    GAME.dayTime = true;
    
    //computers
    GAME.killedComputers = [];
    GAME.computers = [];
    GAME.nightComputers = [];
    GAME.originalNumber = 0;
                            GAME.sharpThings = [];
    
    //projectiles
    GAME.projectiles = [];
    
    //powerups
    GAME.powerUps = [];
                            GAME.jumpPads = [];
    
    //environment variables
    GAME.buttons = [];
    GAME.platforms = [];
    GAME.platformMeshes = [];
    GAME.floor = -1000000;
    GAME.gravityOff = false;
    GAME.keyUp = true;
    GAME.previousPlatformNumber = -1;
   // GAME.videos.sintel.pause();
    //GAME.videos.reel.pause();
                            

    
                            //camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
                            camera.position.z = 5000;//targetZ;
                            targetZ = 5000;
                            camera.position.y = 0;
                            //scene.add( camera );*/
                            GAME.player = new GAME.Player({ x:0, y:1000, z:0, health:100, lives:4, width:100, height:150} );
                            GAME.player.reset({level:1});
                            
                            //GAME.Tracks['maintheme'].threeObj.play();
    
    
    //var startPlatform = new GAME.Platform({ x: 0, y:0, z:0, width:300, height:20 });
    GAME.siteObjects.push(new GAME.ParticleEmitter({ x:550, y:0, z:-200, width:0, height:0, color:0xFF0000}));
    //GAME.siteObjects.push(new GAME.ParticleEmitter({ x:600, y:600, z:-100, width:0, height:0, color:0xFF0000}));
    //console.log(test.width);
    
                            //GAME.decorations.push( new GAME.Decoration({ x:-2000, y:-5000, z:-100, width:10000, height:10000, color:0x00FFFF, threeD:false }));
                            //GAME.decorations.push( new GAME.Decoration({ x:-512, y:0, z:1, width:1024, height:1024, color:0xFFFFFF, map:GAME.Textures['background'].threeObj, threeD:false }));
                            
                            //GAME.dayNightCycle({ background:GAME.decorations[0].mesh.material });
    //decorations[0].mesh.material.color.setRGB(1,1,1);

    //GAME.platforms.push(new GAME.Button({x:500, y:-200, z:0, width:100, height:40, dWidth:100, dHeight:512, map:GAME.Textures['background'].threeObj, color:0xFFFFFF, velocityX:0, velocityY:0, pathLength:0, front:true  }));
                                                                        //GAME.Platform = function(geometry, material, x, y, z, width, height, dWidth, dHeight, map, color, velocityX, velocityY, pathLength, front)
    GAME.platforms.push(new GAME.Platform({x:-500, y:100, z:10, width:10240, height:32,color:0x00FFFF, velocityX:0, velocityY:0, pathLength:0}));
    //GAME.platforms.push(new GAME.Button({destination: GAME.artWork, x:-600, y:150, z:0, width:100, height:32,color:0x00FFFF, velocityX:0, velocityY:2, pathLength:100}));
    GAME.platforms.push(new GAME.Button({trigger:null, x:-600, y:150, z:10, width:100, height:32,color:0x00FFFF, velocityX:0, velocityY:2, pathLength:100}));
   
    
    imageD = document.createElement( 'canvas' );
    imageD.width = 1280;
    imageD.height = 720;

    imageContextD = imageD.getContext( '2d' );
    imageContextD.fillStyle = '#000000';
    imageContextD.fillRect( 0, 0, 1280, 720 );

    textureD= new THREE.Texture( imageD );
    textureD.minFilter = THREE.LinearFilter;
    textureD.magFilter = THREE.LinearFilter;
    GAME.decorations.push( new GAME.Decoration({ map:textureD, x:0, y:2000, z:-10, width:1280, height:720, color:0xFFFFFF, threeD:false }));
                            

    

    GAME.play = function(){
GAME.videos.reel.play();
targetZ = 2000;

    }

    GAME.stop = function(){
GAME.videos.reel.pause();
targetZ = 5000;
console.log("here");

    }
    GAME.platforms.push(new GAME.Button({trigger: GAME.play, x:0, y:1800, z:10, width:640, height:32,color:0x00FF00, velocityX:0, velocityY:0, pathLength:0}));
    GAME.platforms.push(new GAME.Button({trigger: GAME.stop, x:640, y:1800, z:10, width:640, height:32,color:0xFF0000, velocityX:0, velocityY:0, pathLength:0}));
    


    GAME.platforms.push(new GAME.Button({x:700, y:200, z:10, width:100, height:32,color:0x00FFFF, velocityX:0, velocityY:3, pathLength:200}));
    GAME.platforms.push(new GAME.Button({x:600, y:600, z:10, width:100, height:32,color:0x00FFFF, velocityX:0, velocityY:-3, pathLength:200}));         
    GAME.platforms.push(new GAME.Button({x:900, y:800, z:10, width:100, height:32,color:0x00FFFF, velocityX:4, velocityY:0, pathLength:200}));         
    GAME.platforms.push(new GAME.Button({x:900, y:1150, z:10, width:100, height:32,color:0x00FFFF, velocityX:0, velocityY:0, pathLength:0})); 
    GAME.decorations.push( new GAME.Decoration({ x:0, y:100, z:-10, width:1280, height:1720, color:0x000000, threeD:false }));
    GAME.decorations.push( new GAME.Decoration({map:GAME.Textures['resume'].threeObj, x:1400, y:100, z:-10, width:1024, height:1024, color:0xFFFFFF, threeD:false }));
       
     


                

    //GAME.platforms.push(new GAME.Button({destination: GAME.objs, x:200, y:200, z:0, width:100, height:32,color:0xFFFFFF, velocityX:2, velocityY:0, pathLength:200}));
    

                    /*GAME.siteObjects.push(new GAME.Platform({x:-500, y:0, z:0, width:1024, height:1024, dWidth:1024, dHeight:1024, map:GAME.Textures['background'].threeObj, color:0xFFFFFF, velocityX:0, velocityY:0, pathLength:0, front:true  }));
                    GAME.siteObjects.push(new GAME.Platform({x:-600, y:150, z:0, width:100, height:200, dWidth:100, dHeight:200, map:GAME.Textures['background'].threeObj, color:0xFFFFFF, velocityX:0, velocityY:2, pathLength:100, front:true  }));
                    GAME.siteObjects.push(new GAME.Platform({x:550, y:200, z:0, width:100, height:200, dWidth:100, dHeight:200, map:GAME.Textures['background'].threeObj, color:0xFFFFFF, velocityX:2, velocityY:0, pathLength:200, front:true  }));
                    */    


                            //GAME.platforms.push(new GAME.Platform({ x:-650, y:200, z:0, width:200, height:20, dWidth:200, dHeight:400, color:0xFFFFFF, pathLength:0, velocityx:0, velocityY:0,map:GAME.Textures['background'].threeObj, front:true }));
                            //GAME.platforms.push(new GAME.Platform({ x:550, y:200, z:0, width:100, height:10, dWidth:100, dHeight:200, color:0xFFFFFF, pathLength:0, velocityX:0,map:GAME.Textures['background'].threeObj, front:true  }));
     GAME.siteObjects.push(new GAME.JumpPad({ siteObject: GAME.platforms[0], x:0, y:0, z:0,  width:40, height:10, color:0xFF00FF, temporary:true}));
     GAME.siteObjects.push(new GAME.JumpPad({ siteObject: GAME.platforms[7], x:0, y:0, z:0,  width:40, height:10, color:0xFF00FF, temporary:true}));
                    //GAME.jumpPads.push(new GAME.JumpPad({ siteObject: GAME.platforms[2], x:0, y:0, z:0,  width:60, height:10, dWidth:60, dHeight:10,color:0xFF00FF, temporary:true, map:GAME.Textures['fire'].threeObj }));
    //GAME.powerUps.push(new GAME.PowerUp({ platform: GAME.platforms[3], x:10, y:0, z:0,  width:10, height:15, color:0x00FF00, temporary:true }));
                            //GAME.sharpThings.push(new GAME.SharpThing({ platform: GAME.platforms[1], x:150, y:0, z:0,  width:20, height:30, dWidth:20, dHeight:30,color:0xFF00FF, temporary:true, map:GAME.Textures['ant'].threeObj }));
                            //GAME.powerUps.push(new GAME.PowerUp({ platform: GAME.platforms[0], x:100, y:0, z:0,  width:10, height:15, color:0x00FF00, temporary:true }));
                           
            //GAME.computers.push(new GAME.PlatformComputer({ platform: GAME.platforms[1], x:-400, y:0, z:0, velocityX: 3, health:10, width:472, height:326, color:0xFF00FF, ghost:false, map:GAME.Textures['ant'].threeObj, boundLevel:15 }));
                            //GAME.computers.push(new GAME.PlatformComputer({ platform: GAME.platforms[1], x:10, y:0, z:0, velocityX: 3, health:10, width:20, height:20, color:0xFF00FF, ghost:false, boundLevel:0 }));
                            var s = GAME.Textures['ant'].threeObj;
                            s = s;
                            
                            
                            //GAME.platforms[0].addRestingObject({restingObject:GAME.computers[0]});
                            //GAME.platforms[0].addRestingObject({restingObject:GAME.jumpPads[0]});
                            //GAME.platforms[0].linkObjectsResting();
                            for(var i = 0; i < GAME.platforms.length; i++) {
                            //GAME.decorations.push( new GAME.Decoration({ platform:GAME.platforms[i], height:10, color:0x339900, threeD:true }));
                            }
    
    //platforms.push(startPlatform);
    /*for (var i = 0; i < 50; i ++) {
        var platX = -500 + i*150 + 50*Math.random();
        var platY = -200 + i *5 + 20*i*Math.random();
                            GAME.platforms.push(new GAME.Platform({ x:platX, y:platY, z:0, width:100, height:40, depth:100, threeD:true, color:0x663300 }));
                            GAME.decorations.push( new GAME.Decoration({ x:platX, y:platY+40, z:-1, width:100, height:10, color:0x339900, depth:100, threeD:true }));
        if (i%4 === 0) {
            GAME.computers.push(new GAME.PlatformComputer({ platform: GAME.platforms[i], x:10, y:0, z:0, velocityX:2 + 2*Math.random(), health:10, width:20, height:20, color:0xFF00FF, ghost:false }));
            
            GAME.originalNumber++;
        }
        if (i%10 === 0) {
            GAME.powerUps.push(new GAME.PowerUp({ platform: GAME.platforms[i], x:10, y:0, z:0,  width:10, height:15, color:0x00FF00 }));
        }
    }*/
    
    /*var platform1 = new GAME.Platform({ x:-250, y:0, z:0, width:500, height:20 });
     platforms.push(platform1);*/
     for(var i = 0; i < GAME.platforms.length; i++) {
        GAME.siteObjects.push(GAME.platforms[i]);
        //GAME.platformMeshes.push(GAME.platforms[i].mesh);
    }
     for(var i = 0; i < GAME.siteObjects.length; i++) {
        scene.add(GAME.siteObjects[i].mesh);
        //GAME.platformMeshes.push(GAME.platforms[i].mesh);
    }
    
    
    for (var i = 0; i < GAME.decorations.length; i++) {
        GAME.decorations[i].draw();
    }
    for (i = 0; i < GAME.computers.length; i++) {
        scene.add(GAME.computers[i].mesh);
                            GAME.originalNumber++;
        
    }
    for (i = 0; i < GAME.powerUps.length; i++) {
        scene.add(GAME.powerUps[i].mesh);
    }
                            for (i = 0; i < GAME.sharpThings.length; i++) {
                            scene.add(GAME.sharpThings[i].mesh);
                            }
                            for (i = 0; i < GAME.jumpPads.length; i++) {
                            scene.add(GAME.jumpPads[i].mesh);
                            }
                            },
                            
                            
                            
                            render : function() {
   if ( GAME.videos.reel.readyState === GAME.videos.reel.HAVE_ENOUGH_DATA ) {

                                 imageContextD.drawImage( GAME.videos.reel, 0, 0 );

                                if ( textureD ) textureD.needsUpdate = true;

                            }



                            
                            GAME.player.updatePosition({});
                                for (var i = 0; i < GAME.siteObjects.length; i++) {
                            GAME.siteObjects[i].updatePosition();
                            }
                            for (var i = 0; i < GAME.platforms.length; i++) {
                            //GAME.platforms[i].updatePosition();
                            }
                            for (i = 0; i < GAME.computers.length; i++) {
                            GAME.computers[i].updatePosition();
                            if (i >= GAME.originalNumber){
                            GAME.computers[i].fireAttackUpdate();
                            }
                            }
                            for (var i = 0; i < GAME.projectiles.length; i++) {
                            GAME.projectiles[i].updatePosition();
                            }
                            for (var i = 0; i < GAME.jumpPads.length; i++) {
                            //GAME.jumpPads[i].updatePosition();
                            }
                            for (var i = 0; i < GAME.sharpThings.length; i++) {
                            GAME.sharpThings[i].updatePosition();
                            }
                            
                            for (var i = 0; i < GAME.decorations.length; i++) {
                            GAME.decorations[i].updatePosition();
                            }
                            if(GAME.player.intersected) {
                            //GAME.player.velocity.y = GAME.platforms[GAME.player.platformNumber].velocity.y;
                            }
    

    //GAME.player.intersected = false;
                            //GAME.player.impededRight = false;
                            //GAME.player.impededLeft = false;
    for (var i = 0; i < GAME.powerUps.length; i++) {
                            var interNum = GAME.intersects({ object1:GAME.player, object2:GAME.powerUps[i], platform:false });
            //if(!GAME.powerUps[i].used) {
            
            //};
                            if(interNum !== -1) {
                            GAME.powerUps[i].absorbed();
                            if (i === GAME.powerUps.length-1) {
                            // GAME.clearScene();
                                //GAME.currentLevel = GAME.level2;
                            //GAME.currentLevel.init();
                            }
                            }
                            }
                            
                            for (var i = 0; i < GAME.siteObjects.length; i++) {
                            var interNum = GAME.intersects({ object1:GAME.player, object2:GAME.siteObjects[i], platform:true });
                            if ( interNum === 0||interNum ===1||interNum ===2||interNum ===4){
                            GAME.siteObjects[i].intersect();
                            }
                            }

                            
                          
    if (!GAME.player.takingDamage) {
        var computersStart = 0;
        var computersFinish = GAME.originalNumber;
        if (!GAME.dayTime) {
            computersStart = GAME.originalNumber;
            computersFinish = GAME.computers.length;
        };
        for (var i = computersStart; i < computersFinish; i++) {
                            var interNum = GAME.intersects({ object1:GAME.player, object2:GAME.computers[i], platform:false})
                            if (interNum === 1 ) {
                            GAME.computers[i].killed();
                            GAME.player.jumps=0;
                            GAME.player.jumpPlayer({ jump:8 });
                            }else if(interNum!== -1){
                            if (interNum === 0) {
                            GAME.player.movePlayerLeft({  speed:10 });
                            } else if ( interNum ===2 ){
                            GAME.player.movePlayerRight({  speed:10 });
                            }
                            GAME.player.damage();
            }
        }
                            for (var i = 0; i < GAME.sharpThings.length; i++) {
                            var interNum = GAME.intersects({ object1:GAME.player, object2:GAME.sharpThings[i], platform:false})
                            if (interNum !== -1 && !GAME.player.takingDamage) {
                            GAME.player.damage();
                            GAME.player.velocity.y = -10;
                            if (interNum === 0) {
                            GAME.player.movePlayerLeft({  speed:2 });
                            } else if ( interNum ===2 ){
                            GAME.player.movePlayerRight({  speed:2 });
                            }
                            
                            }
                            }
        for (var i = 0; i < GAME.projectiles.length; i++) {
                            var interNum = GAME.intersects({ object1:GAME.player, object2:GAME.projectiles[i], platform:false});
                            if(!GAME.dayTime && interNum!==-1){
                            if (interNum === 0) {
                            GAME.player.movePlayerLeft({  speed:10 });
                            } else if ( interNum ===2 ){
                            GAME.player.movePlayerRight({  speed:10 });
                            }
                            GAME.player.damage();
            }
        };
    }
                            if(GAME.player.platformNumber!=GAME.previousPlatformNumber){
                                if(GAME.previousPlatformNumber != -1){
                                    //GAME.platforms[GAME.previousPlatformNumber].mesh.material.color.setHex(0xFFFFFF);
                                }
                                if(GAME.player.platformNumber !=-1){
                                    //GAME.platforms[GAME.player.platformNumber].mesh.material.color.setHex(0x0000FF);
                                }
                            }
                            GAME.previousPlatformNumber = GAME.player.platformNumber;
                            
                            if(GAME.keyUp) {
                            var targetVelocityX = 0;
                            if(GAME.player.platformNumber !== -1&&!GAME.player.takingDamage) {
                            targetVelocityX = GAME.platforms[GAME.player.platformNumber].velocity.x;
                            }
                            GAME.player.velocity.x += (targetVelocityX - GAME.player.velocity.x)*.3;
                            }

                            //CAMERA


                            /*camera.position.x += (GAME.player.position.x - camera.position.x)*.03;
                            camera.position.y += (GAME.player.position.y - camera.position.y)*.006;*/
                            camera.position.z += (targetZ - camera.position.z)*.03;
                            //camera.position.z = 3000;
                            
}
                            });
    