var GAME = GAME || {};





GAME.clearScene = function() {
    var children = scene.children;
    for(var i = children.length-1;i>=0;i--){
        var child = children[i];
        scene.remove(child);
    };
};
    