var GAME = GAME || {};





GAME.clearScene = function() {
	light.position.z = 2000;
    light.intensity = 1
    TWEEN.removeAll();
    var children = scene.children;
    for(var i = children.length-1;i>=0;i--){
        var child = children[i];
        scene.remove(child);
    };
};
    