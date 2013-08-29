var GAME = GAME || {};

GAME.Tracks = {
    'powerUpSFX' : {src:'Audio/powerup.wav', threeObj:undefined},
    'killCompSFX' : {src:'Audio/killcomp.wav', threeObj:undefined},
    'damageSFX' : {src:'Audio/damage.wav', threeObj:undefined},
    'maintheme' : {src:'Audio/maintheme.wav', threeObj:undefined}
};


GAME.Audio = function(params){
    this.track = document.createElement('audio');
    this.track.setAttribute('src', params.track);
    this.track.load();
};
GAME.Audio.prototype = {
    play : function() {
        this.track.play();
    }
};
    