var GAME = GAME || {};





GAME.Platform = function(params){
    this.position = new THREE.Vector3(params.x, params.y, params.z );
    this.velocity = new THREE.Vector3(0, 0, 0);
    /*this.health = params.health;
    this.lives = params.lives;*/
    this.width = params.width;
    this.height = params.height;
    this.velocity = new THREE.Vector3(0, 0, 0);
    var plane = new THREE.PlaneGeometry(this.width,this.height);
    var material = new THREE.MeshBasicMaterial({color: params.color});
    this.mesh = new THREE.Mesh(plane, material);
    this.mesh.position.set(this.position.x+this.width/2, this.position.y+this.height/2, this.position.z);
    this.mesh.rotation.x = Math.PI/2;
    this.bounds = ({ left:this.position.x, top:this.position.y+this.height, right:this.position.x+this.width, bottom:this.position.y });
};
GAME.Platform.prototype = {
    
};
    