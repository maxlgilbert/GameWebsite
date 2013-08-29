var GAME = GAME || {};

var video, image, imageContext,
            imageReflection, imageReflectionContext, imageReflectionGradient,
            texture, textureReflection;

var videoD, imageD, imageContextD,
            textureD;



GAME.video =new GAME.Level({
                            
init:function() {
    GAME.siteObjects = [];
    
    //environment variables
    GAME.buttons = [];
    GAME.pictures = [];
    GAME.platforms = [];
    GAME.floor = -1000000;
    GAME.gravityOff = false;
    GAME.keyUp = true;
    GAME.previousPlatformNumber = -1;
                            

    
                            //camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
                            camera.position.z = 2000;//targetZ;
                            camera.position.y = 0;

                            //scene.add( camera );*/
                            GAME.player = new GAME.Player({ x:0, y:1000, z:0, health:100, lives:4, width:100, height:150} );
                            GAME.player.reset({level:1});

                //

                image = document.createElement( 'canvas' );
                image.width = 480;
                image.height = 204;

                imageContext = image.getContext( '2d' );
                imageContext.fillStyle = '#000000';
                imageContext.fillRect( 0, 0, 480, 204 );

                texture = new THREE.Texture( image );
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                GAME.videos.sintel.play();

                //

                imageD = document.createElement( 'canvas' );
                imageD.width = 1280;
                imageD.height = 720;

                imageContextD = imageD.getContext( '2d' );
                imageContextD.fillStyle = '#000000';
                imageContextD.fillRect( 0, 0, 1280, 720 );

                textureD= new THREE.Texture( imageD );
                textureD.minFilter = THREE.LinearFilter;
                textureD.magFilter = THREE.LinearFilter;
                GAME.videos.reel.play();

    GAME.platforms.push(new GAME.Platform({x:-1200, y:-500, z:0, width:2400, height:32,color:0xFFFFFF, velocityX:0, velocityY:0, pathLength:0}));
    //GAME.platforms.push(new GAME.Platform({x:-600, y:150, z:0, width:100, height:32,color:0xFFFFFF, velocityX:0, velocityY:2, pathLength:100}));
    GAME.platforms.push(new GAME.Button({destitnation: GAME.level1, x:550, y:-400, z:0, width:100, height:32,color:0xFFFFFF, velocityX:2, velocityY:0, pathLength:200}));
    GAME.pictures.push(new GAME.Picture({x:0, y:-441, z:0, width:1280, height:720, map:textureD, color:0xFFFFFF, velocityX:0, velocityY:0, pathLength:0, number:GAME.pictures.length}));
    //GAME.pictures.push(new GAME.Picture({x:0, y:-333, z:0, width:1000, height:666, map:GAME.Textures['LittleFoot'].threeObj, color:0xFFFFFF, velocityX:0, velocityY:0, pathLength:0, number:GAME.pictures.length}));
    GAME.pictures.push(new GAME.Picture({x:0, y:-333, z:0, width:720, height:306, map:texture, color:0xFFFFFF, velocityX:0, velocityY:0, pathLength:0, number:GAME.pictures.length}));

     //GAME.siteObjects.push(new GAME.JumpPad({ siteObject: GAME.platforms[0], x:0, y:0, z:0,  width:40, height:10, color:0xFF00FF, temporary:true}));

     for(var i = 0; i < GAME.platforms.length; i++) {
        GAME.siteObjects.push(GAME.platforms[i]);
    }
    for(var i = 0; i < GAME.pictures.length; i++) {
        GAME.siteObjects.push(GAME.pictures[i]);
    }
     for(var i = 0; i < GAME.siteObjects.length; i++) {
        scene.add(GAME.siteObjects[i].mesh);
    }
    
                            },
                            
                            
                            
                            render : function() {
                            
                            GAME.player.updatePosition({});
                            for (var i = 0; i < GAME.siteObjects.length; i++) {
                                GAME.siteObjects[i].updatePosition();
                            }
    

                            for (var i = 0; i < GAME.siteObjects.length; i++) {
                            var interNum = GAME.intersects({ object1:GAME.player, object2:GAME.siteObjects[i], platform:true });
                            if ( interNum === 0||interNum ===1||interNum ===2||interNum ===4){
                            GAME.siteObjects[i].intersect();
                            }
                            }


                            if(GAME.player.platformNumber!=GAME.previousPlatformNumber){
                                if(GAME.previousPlatformNumber != -1){
                                    GAME.platforms[GAME.previousPlatformNumber].mesh.material.color.setHex(0xFFFFFF);
                                }
                                if(GAME.player.platformNumber !=-1){
                                    GAME.platforms[GAME.player.platformNumber].mesh.material.color.setHex(0x0000FF);
                                }
                            }
                            GAME.previousPlatformNumber = GAME.player.platformNumber;
                            
                            /*camera.position.x += (GAME.player.position.x - camera.position.x)*.03;
                            camera.position.y += (GAME.player.position.y - camera.position.y)*.006;
                            camera.position.z += (targetZ - camera.position.z)*.006;*/
                            //camera.position.z = 3000;
                            if(GAME.keyUp) {
                            var targetVelocityX = 0;
                            if(GAME.player.platformNumber !== -1&&!GAME.player.takingDamage) {
                            targetVelocityX = GAME.platforms[GAME.player.platformNumber].velocity.x;
                            }
                            GAME.player.velocity.x += (targetVelocityX - GAME.player.velocity.x)*.3;
                            }
                            if ( GAME.videos.sintel.readyState === GAME.videos.sintel.HAVE_ENOUGH_DATA ) {

                                 imageContext.drawImage( GAME.videos.sintel, 0, 0 );

                                if ( texture ) texture.needsUpdate = true;

                            }
                             if ( GAME.videos.reel.readyState === GAME.videos.reel.HAVE_ENOUGH_DATA ) {

                                 imageContextD.drawImage( GAME.videos.reel, 0, 0 );

                                if ( textureD ) textureD.needsUpdate = true;

                            }
                            
}
                            });
    