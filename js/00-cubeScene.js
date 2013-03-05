sc1 = function(){

	var container,
	camera, 
	controls, 
	scene,
	renderer;		
	this.things = [];

	
}

sc1.prototype.init = function() {

	this.camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 1000 );
	this.camera.position.z = -200;
	this.camera.position.y = 200;
		this.camera.position.x = 200;


	this.controls = new THREE.OrbitControls( this.camera );
	this.controls.addEventListener( 'change', this.render );

	this.scene = new THREE.Scene();
	this.scene.fog = new THREE.FogExp2( 0x000000, 0.00052 );

	this.addGeo();

	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 );
	this.scene.add( light );

	light = new THREE.DirectionalLight( 0x002288 );
	light.position.set( -1, -1, -1 );
	this.scene.add( light );

	light = new THREE.AmbientLight( 0x222222 );
	this.scene.add( light );

	this.renderer = new THREE.WebGLRenderer( { antialias: true } );
	//this.renderer.setClearColor( scene.fog.color, 1 );
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	console.log(this.renderer);
	

	this.container = document.getElementById( 'container' );
	this.container.appendChild( this.renderer.domElement );

	//window.addEventListener( 'resize', onWindowResize, false );
	//console.log(this.renderer, + " " + this.scene.children.length + " " + this.camera.toString());

	
}

sc1.prototype.addGeo = function(){

	var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
	var material =  new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading } );
	
	var parms={color1:0x003399,color2:0xbbffdd,color3:0x0099ff};
	var cuber = new peep(parms);
	cuber.groundSquares(cuber,40,100,40);
	//cuber.parentSquares(10,10,10,30);
	
	for ( var i = 0; i < 10; i ++ ) {
		for ( var j = 0; j < 10; j ++ ) {
		var mesh = new THREE.Mesh( geometry, material );
		//var pos = new THREE.Vector3( ( Math.random() - 0.5 ) * 1000, ( Math.random() - 0.5 ) * 1, ( Math.random() - 0.5 ) * 1000);
		var zeroVec = new THREE.Vector3(0,0,0);
		var pos = new THREE.Vector3((i-5)*40,-15,(j-5)*40 );
		
		var parms={color1:0x003399,color2:0xbbffdd,color3:0x0099ff};
		var cuber = new peep(parms);
		
		cuber.groundSquares(cuber,40,100,40);
		cuber.CTRL.position = pos;
		this.scene.add(cuber.CTRL);
		cuber.q = i+j;
		cuber.speed = (i+(j*2))*.000081;
		
		console.log(cuber.CTRL);
		
		this.things.push(cuber);
	}
	
	}
	
}

sc1.prototype.moveThings = function(){
		
	this.go = false;
	
	for ( var i = 1, il = this.things.length; i < il; i ++ ) {
		var thing = this.things[i];
		
		
		for ( var j = 0; j < this.things.length ; j ++ ) {
		
			var t = this.things[j];
			
			t.pos_big.position.y = (0+(Math.sin(t.q/3))*10);
			t.pos_med.position.y = (15+(Math.sin(t.q/3-1))*10);
			t.pos_small.position.y = (18+(Math.sin(t.q/3-2))*10);

			t.q += t.speed;
			
		}
	}
}

sc1.prototype.animate = function(){
	
	//this.render();
	this.renderer.render( this.scene, this.camera );
	this.moveThings();
	var that = this;
	requestAnimationFrame( function() { that.animate(); });
	this.controls.update();
	
}

sc1.prototype.render = function() {
	//console.log("wtf");
	//wtf does this throw errors even when it's not being used?
	//this.renderer.render( this.scene, this.camera );

}

