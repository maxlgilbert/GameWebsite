var GAME = GAME || {};





GAME.Level = function(params){
    this.initFunction = params.init;
    this.renderFunction = params.render;
};
GAME.Level.prototype = {
    init : function() {
        this.initFunction();
    },
    
    render : function() {
        this.renderFunction();
    }    
};
    