var GAME = GAME || {};




GAME.level3 = new GAME.Level({  
        init:function() {
    //decorations
    GAME.decorations = [];
    GAME.dayTime = true;
    
    //computers
    GAME.killedComputers = [];
    GAME.computers = [];
    GAME.nightComputers = [];
    GAME.originalNumber = 0;
    
    //projectiles
    GAME.projectiles = [];
    
    //powerups
    GAME.powerUps = [];
    
    //environment variables
    GAME.platforms = [];
    GAME.floor = -1000000;
    GAME.gravityOff = false;
    GAME.keyUp = true;
    
    
                             camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
                             camera.position.z = targetZ;
                             camera.position.y = 0;
                             scene.add( camera );
    //var startPlatform = new GAME.Platform({ x: 0, y:0, z:0, width:300, height:20 });
                             /*GAME.player.position.x = 0;
                             GAME.player.position.y = 1000;
                             GAME.player.mesh.position.x = 0;
                             GAME.player.mesh.position.y = 1000;*/
                             GAME.player.reset({level:3});
    
    GAME.decorations.push( new GAME.Decoration({ x:-2000, y:-5000, z:-2, width:10000, height:10000, color:0x00FFFF }));
    
    GAME.dayNightCycle({ background:GAME.decorations[0].mesh.material });
    //decorations[0].mesh.material.color.setRGB(1,1,1);
    
    
    //platforms.push(startPlatform);
    for (var i = 0; i < 50; i ++) {
        var platX = -500 + i*150 + 50*Math.random();
        var platY = -200 + i *5 + 40*i*Math.random();
        GAME.platforms.push(new GAME.Platform({ x:platX, y:platY, z:0, width:100, height:40, color:0xFF00FF, depth:100, threeD:true  }));
        GAME.decorations.push( new GAME.Decoration({ x:platX, y:platY+40, z:-1, width:100, height:10, color:0x339900, depth:100, threeD:true  }));
        if (i%4 === 0) {
            GAME.computers.push(new GAME.PlatformComputer({ platform: GAME.platforms[i], x:10, y:0, z:0, velocityX:2 + 2*Math.random(), health:10, width:20, height:20, color:0xFF00FF, ghost:false }));
            
            GAME.originalNumber++;
        }
        if (i%10 === 0) {
            GAME.powerUps.push(new GAME.PowerUp({ platform: GAME.platforms[i], x:10, y:0, z:0,  width:10, height:15, color:0x00FF00 }));
        }
    }
    
    /*var platform1 = new GAME.Platform({ x:-250, y:0, z:0, width:500, height:20 });
     platforms.push(platform1);*/
    
    for(var i = 0; i < GAME.platforms.length; i++) {
        scene.add(GAME.platforms[i].mesh);
    }
    for (var i = 0; i < GAME.decorations.length; i++) {
        scene.add(GAME.decorations[i].mesh);
    }
    for (i = 0; i < GAME.computers.length; i++) {
        scene.add(GAME.computers[i].mesh);
        
    }
    for (i = 0; i < GAME.powerUps.length; i++) {
        scene.add(GAME.powerUps[i].mesh);
    }
                             }, render : function() {
    for (i = 0; i < GAME.computers.length; i++) {
        GAME.computers[i].updatePosition();
        if (i >= GAME.originalNumber){
            GAME.computers[i].fireAttackUpdate();
        }
    }
    for (var i = 0; i < GAME.projectiles.length; i++) {
        GAME.projectiles[i].updatePosition();
    }
    
    GAME.player.updatePosition({});
    GAME.player.intersected = false;
    for (var i = 0; i < GAME.powerUps.length; i++) {
        if(GAME.intersects({ object1:GAME.player, object2:GAME.powerUps[i], platform:false })){
            //if(!GAME.powerUps[i].used) {
                GAME.player.jumpHeight *= 1.2;
            //};
            GAME.powerUps[i].absorbed();
            if (i === GAME.powerUps.length-1) {
                GAME.clearScene();
                GAME.currentLevel = GAME.level4;
                GAME.currentLevel.init();
            }
            
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
            if(GAME.intersects({ object1:GAME.player, object2:GAME.computers[i], platform:true})){
                GAME.computers[i].killed();
                
                GAME.player.jumpPlayer({ jump:8 });
            }else if(GAME.intersects({ object1:GAME.player, object2:GAME.computers[i], platform:false})){
                //computers[i].killed();
                
                GAME.player.movePlayer({  speed:10, bool:GAME.computers[i].velocity.x >0 });
                GAME.player.damage();
            }
        }
        for (var i = 0; i < GAME.projectiles.length; i++) {
            if(GAME.intersects({ object1:GAME.player, object2:GAME.projectiles[i], platform:false})&&!GAME.dayTime){
                GAME.player.movePlayer({  speed:10, bool:GAME.projectiles[i].velocity.x >0 });
                GAME.player.damage();
            }
        };
    }
    for (var i = 0; i < GAME.platforms.length; i++) {
        if(GAME.intersects({ object1:GAME.player, object2:GAME.platforms[i], platform:true })){
            
            GAME.floor = GAME.platforms[i].bounds.top;
            //player.updatePosition({newPosition:new THREE.Vector3(player.position.x, GAME.floor,player.position.z)});
            //GAME.bounce({ player:player });
            GAME.player.intersected = true;
            targetZ =1000;
        }
    }
    
    camera.position.x += (GAME.player.position.x - camera.position.x)*.03;
    camera.position.y += (GAME.player.position.y - camera.position.y)*.006;
    camera.position.z += (targetZ - camera.position.z)*.006;
    if(GAME.keyUp) {
        GAME.player.velocity.x += (0 - GAME.player.velocity.x)*.1;
    };
} 
                             });
    