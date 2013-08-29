var GAME = GAME || {};





GAME.level1Init = function() {
    player = new GAME.Player({ x:0, y:1000, z:0, health:100, lives:4, width:75, height:75} );
    object.push(player.mesh);
    scene.add(player.mesh);
    //var startPlatform = new GAME.Platform({ x: 0, y:0, z:0, width:300, height:20 });
    
    
    decorations.push( new GAME.Decoration({ x:-2000, y:-5000, z:-2, width:10000, height:10000, color:0x00FFFF }));
    
    GAME.dayNightCycle({ background:decorations[0].mesh.material });
    //decorations[0].mesh.material.color.setRGB(1,1,1);
    
    
    //platforms.push(startPlatform);
    for (var i = 0; i < 50; i ++) {
        var platX = -500 + i*150 + 50*Math.random();
        var platY = -200 + i *5 + 20*i*Math.random();
        platforms.push(new GAME.Platform({ x:platX, y:platY, z:0, width:100, height:40, color:0x663300 }));
        decorations.push( new GAME.Decoration({ x:platX, y:platY+40, z:-1, width:100, height:10, color:0x339900 }));
        if (i%4 === 0) {
            computers.push(new GAME.PlatformComputer({ platform: platforms[i], x:10, y:0, z:0, velocityX:2 + 2*Math.random(), health:10, width:20, height:20, color:0xFF00FF, ghost:false }));
            
            originalNumber++;
        }
        if (i%10 === 0) {
            powerUps.push(new GAME.PowerUp({ platform: platforms[i], x:10, y:0, z:0,  width:10, height:10, color:0x00FF00 }));
        }
    }
    
    /*var platform1 = new GAME.Platform({ x:-250, y:0, z:0, width:500, height:20 });
     platforms.push(platform1);*/
    
    for(var i = 0; i < platforms.length; i++) {
        scene.add(platforms[i].mesh);
    }
    for (var i = 0; i < decorations.length; i++) {
        scene.add(decorations[i].mesh);
    }
    for (i = 0; i < computers.length; i++) {
        scene.add(computers[i].mesh);
        
    }
    for (i = 0; i < powerUps.length; i++) {
        scene.add(powerUps[i].mesh);
    }
};

GAME.level1Render = function() {
    for (i = 0; i < computers.length; i++) {
        computers[i].updatePosition();
        if (i >= originalNumber){
            computers[i].fireAttackUpdate();
        }
    }
    for (var i = 0; i < projectiles.length; i++) {
        projectiles[i].updatePosition();
    }
    
    player.updatePosition({});
    player.intersected = false;
    for (var i = 0; i < powerUps.length; i++) {
        if(GAME.intersects({ object1:player, object2:powerUps[i], platform:false })){
            if(!powerUps[i].used) {
                player.jumpHeight *= 1.2;
            };
            powerUps[i].absorbed();
            if (i === 0) {
                //GAME.clearScene();
                //currentLevel = level2;
                //currentLevel.init();
            }
            
        }
    }
    if (!player.takingDamage) {
        var computersStart = 0;
        var computersFinish = originalNumber;
        if (!dayTime) {
            computersStart = originalNumber;
            computersFinish = computers.length;
        };
        for (var i = computersStart; i < computersFinish; i++) {
            if(GAME.intersects({ object1:player, object2:computers[i], platform:true})){
                computers[i].killed();
                
                player.jumpPlayer({ jump:8 });
            }else if(GAME.intersects({ object1:player, object2:computers[i], platform:false})){
                //computers[i].killed();
                
                player.movePlayer({  speed:10, bool:computers[i].velocity.x >0 });
                player.damage();
            }
        }
        for (var i = 0; i < projectiles.length; i++) {
            if(GAME.intersects({ object1:player, object2:projectiles[i], platform:false})&&!dayTime){
                player.movePlayer({  speed:10, bool:projectiles[i].velocity.x >0 });
                player.damage();
            }
        };
    }
    for (var i = 0; i < platforms.length; i++) {
        if(GAME.intersects({ object1:player, object2:platforms[i], platform:true })){
            
            GAME.floor = platforms[i].bounds.top;
            //player.updatePosition({newPosition:new THREE.Vector3(player.position.x, GAME.floor,player.position.z)});
            //GAME.bounce({ player:player });
            player.intersected = true;
            targetZ =1000;
        }
    }
    
    camera.position.x += (player.position.x - camera.position.x)*.03;
    camera.position.y += (player.position.y - camera.position.y)*.006;
    camera.position.z += (targetZ - camera.position.z)*.006;
    if(keyUp) {
        player.velocity.x += (0 - player.velocity.x)*.1;
    };
};
    