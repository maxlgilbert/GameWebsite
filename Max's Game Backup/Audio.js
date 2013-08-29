var GAME = GAME || {};





GAME.Audio = function(params){
    this.track = document.createElement('audio');
    this.track.setAttribute('src', params.track);
    this.track.load();
    /*track.addEventListener("canplaythrough", function() {
                           loadCount --;
                           callback_update((totalCount - loadCount) / totalCount);
                           if (loadCount==0)callback_done(function);
                           });
    
    track.addEventListener("ended", function);*/
};
GAME.Audio.prototype = {
    play : function() {
        this.track.play();
    }
};
    