var GAME = GAME || {};





GAME.preloadTextures = function(callback_update, callback_done) {
    var loadCount = 0;
    for (var t in GAME.Textures) {
        loadCount++;
    }
    var totalCount = loadCount;
    for(var t in GAME.Textures){
        
        GAME.Textures[t].threeObj = THREE.ImageUtils.loadTexture(GAME.Textures[t].src, {}, function() {
                    loadCount --;
                    callback_update((totalCount - loadCount) / totalCount);
                    if (loadCount === 0) callback_done();
                                                                 });
        
                                                        
    }
};

GAME.preloadAudio = function(callback_update, callback_done){
    var loadCount = 0;
    for (var t in GAME.Tracks) {
        loadCount++;
    }
    var totalCount = loadCount;
    for(var t in GAME.Tracks){
        GAME.Tracks[t].threeObj = document.createElement('audio');
        GAME.Tracks[t].threeObj.setAttribute('src', GAME.Tracks[t].src);
        GAME.Tracks[t].threeObj.setAttribute('crossorigin', 'anonymous');
        GAME.Tracks[t].threeObj.load();
        GAME.Tracks[t].threeObj.addEventListener("canplaythrough", function() {
                               loadCount --;
                               callback_update((totalCount - loadCount) / totalCount);
                               if (loadCount===0)callback_done();
                               });
        
        
    }
    
};
    