
			//dat.gui adds controls----------------------------
			//why won't you work dat.gui?  damn you
		/*
			var ctrl;

			window.onload = function() {
				ctrl = new world();
				var gui = new dat.GUI();
				gui.add(ctrl, 'message');
				gui.add(ctrl, 'speed', 1, 5);
			
				gui.add(ctrl, 'size', .1, 55);
				//gui.add(ctrl, 'freq', 0,2);
			};

			var world = function()
			{
				this.message = "hi";
				this.speed = 1;
				this.size = 10;
				this.freq = 1;
			};
			
			//console.log(ctrl.speed);
			*/

			
		
			
			//dat.gui adds controls----------------------------
			

			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var container, stats;

			var camera, controls, scene, renderer;

			var cross;
			
			var yes = true;
			var count = 0;
			
			var mover;
			
			var myNoise = new ImprovedNoise();
			
			var things = [];
			
			var heart = [];

			init();
			window.addEventListener('load', function() { animate();}, false)
			

			function init() {
			
		

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 250;

				controls = new THREE.OrbitControls( camera );
				controls.addEventListener( 'change', render );

				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2( 0x002244, 0.004 );

				// world

				var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
				var material =  new THREE.MeshLambertMaterial( { color:0xffffff } );
				
					
			
				//mover = new Mover();
		
				//scene.add(mover.mesh);
				
				//make objects!-----------------------------------------------
				
				var texture2 = new THREE.Texture();

				var loader2 = new THREE.ImageLoader();
				loader2.addEventListener( 'load', function ( event ) {

					texture2.image = event.content;
					texture2.needsUpdate = true;

				} );
				loader2.load( 'textures/red.jpg' );

				
				var loader2 = new THREE.OBJLoader();
				
				loader2.addEventListener( 'load', function ( event ) {

					var object = event.content;

					object.traverse( function ( child ) {

						if ( child instanceof THREE.Mesh ) {

							child.material.map = texture2;

						}

					} );
					
						object.position = new THREE.Vector3(  0,-25,0  );
		
					object.scale.x = 100;
					object.scale.y = 100;
					object.scale.z = 100;
					
					scene.add( object );
					heart.push(object);
				});
				loader2.load( 'models/heart_xhi.obj' );
					
				
				for ( var i = 0; i < 200; i ++ ) {
				
				
				
				var texture = new THREE.Texture();

				var loader = new THREE.ImageLoader();
				loader.addEventListener( 'load', function ( event ) {

					texture.image = event.content;
					texture.needsUpdate = true;

				} );
				loader.load( 'textures/arrow.jpg' );

				
				var loader = new THREE.OBJLoader();
				
				loader.addEventListener( 'load', function ( event ) {

					var object = event.content;

					object.traverse( function ( child ) {

						if ( child instanceof THREE.Mesh ) {

							child.material.map = texture;

						}

					} );

					object.position = new THREE.Vector3(   (Math.random())*100,   (Math.random())*100,   (Math.random())*100   );
					object.velocity = new THREE.Vector3(   (Math.random()-.5)*1,   (Math.random()-.5)*1,   (Math.random()-.5)*1   );
					object.scale.x = 10;
					object.scale.y = 10;
					object.scale.z = 10;
					
					object.updateMatrix();
					object.matrixAutoUpdate = true;
					object.drop = false;
					object.dropCount = 0;
					object.previous = new THREE.Vector3(0,0,0);
					
					object.noiseOffset = (Math.random()*10000);
					
					scene.add( object );
					things.push(object);

				});
				
				loader.load( 'models/arrow.obj' );
				
				
			
				
					/*
					var mesh = new THREE.Mesh( geometry, material );
					mesh.position = new THREE.Vector3(   (Math.random())*100,   (Math.random())*100,   (Math.random())*100   );
					mesh.velocity = new THREE.Vector3(   (Math.random()-.5)*1,   (Math.random()-.5)*1,   (Math.random()-.5)*1   );
					mesh.updateMatrix();
					mesh.matrixAutoUpdate = true;
					mesh.drop = false;
					mesh.dropCount = 0;
					mesh.previous = new THREE.Vector3(0,0,0);
					
					mesh.noiseOffset = (Math.random()*10000);
					
					
					mover = new Mover();
					
					scene.add( mesh );
					things.push(mesh);
					*/
					

				}
				
				
				//for(x in things){
				//	setRandom(x);
				//}
				
				scene.add(things);

				// lights

				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 1, 1, 1 );
				scene.add( light );

				light = new THREE.DirectionalLight( 0x0088cc,1,0 );
				light.position.set( -1, -1, -1 );
				scene.add( light );

				light = new THREE.AmbientLight( 0x222222 );
				scene.add( light );


				// renderer

				renderer = new THREE.WebGLRenderer( { clearColor: 0xff0000, antialias: false } );
				renderer.setClearColor( scene.fog.color, 1 );
				renderer.setSize( window.innerWidth, window.innerHeight-100 );
				
				//renderer = new THREE.CanvasRenderer( { antialias: false } );
				//renderer = new THREE.WebGLRenderer();

				container = document.getElementById( 'container' );
				container.appendChild( renderer.domElement );
				
				//stats will display an fps counter in the upper left
				/*
				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				stats.domElement.style.zIndex = 100;
				container.appendChild( stats.domElement );
				*/
				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			

			}

			function animate() {
			
				if(yes){
					console.log(things);
						console.log(yes + count);
				}	
					
				if(things.length>1)
					yes = false;
					
				
				count++;
				render();
				moveThings();
				//console.log(things.length);
				//mover.step();
				for(x in things){
					//console.log(x.mesh[rotation]);
				}
				requestAnimationFrame( animate );
				controls.update();
				
			}
			
			function moveThings(){
			
				
			
				var timer = .0001 * Date.now();
				
				console.log(heart.length);
				
				//this syntax is horrendous - help please
				for ( var i = 0, il = heart.length; i < il; i ++ ) {
					var th = heart.shift();
					th.scale.x = map_range(((Math.sin(timer*100)*80)+20)+(Math.sin(timer*25)*50)+(Math.sin(timer*525)*5),0,100,90,100);
					th.scale.y = map_range(((Math.sin((timer*100)-1)*80)+20)+(Math.sin(timer*25)*50)+(Math.sin((timer*525)-.5)*5),0,100,90,100);
					heart.push(th);
				}
				
				function map_range(value, low1, high1, low2, high2) {
					return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
				}
				
				for ( var i = 0, il = things.length; i < il; i ++ ) {
					var thing = things.shift();
					thing.position.add(thing.velocity);
					if (thing.position.x > 200 || thing.position.x < -200 ||
					thing.position.y > 200 || thing.position.y < -1000 ||
					thing.position.z > 200 || thing.position.z < -200){
						thing.velocity.multiplyScalar(-1);
					}
					var fq = 1;//ctrl.freq;
					var a = timer+thing.noiseOffset+10000 * fq;
					var b = timer+thing.noiseOffset* fq;
					var c = timer+(thing.noiseOffset*3)* fq;
					var speed = 2;//ctrl.speed;
					
					thing.velocity.x = myNoise.noise(a,a,a)*speed;
					thing.velocity.y = myNoise.noise(b,b,b)*speed;
					thing.velocity.z = myNoise.noise(c,c,c)*speed;
					
					thing.scale.x = 15;//ctrl.size;
					thing.scale.y = 15;//ctrl.size;
					thing.scale.z = 15;//ctrl.size;
					
					var center = new THREE.Vector3(0,0,0);
					thing.position.multiplyScalar(.999,.999,.999);
					
					var extraRot = map_range(((Math.sin(thing.noiseOffset/89+(timer*300))*80)+20)+(Math.sin(thing.noiseOffset+(timer*225))*50),0,100,-.1,.1);
					
						//wtf??? why does this work?  Stolen from a boids example
					thing.rotation.y = Math.atan2( - thing.velocity.z, thing.velocity.x );
					thing.rotation.z = (Math.asin( thing.velocity.y / thing.velocity.length() ) - 3.1415/2)+extraRot;
					
					/*
					if(thing.position.y>100){
						var fall = new THREE.Vector3(0.00,-10,0);
						thing.velocity.add(fall);
						thing.drop = true;
					}
					if(thing.velocity.y < -1 ){
						//var fallStop = new THREE.Vector3(1,.2,1);
						thing.velocity.y *=.9;
						//console.log(thing.velocity.y);
					}
					
				
					
					
					if(thing.drop){
						thing.dropCount++;
						var randDir = new THREE.Vector3(myNoise.noise(timer,timer,timer));
						//var randDir = new THREE.Vector3(   (Math.random()-.5)*1,   (Math.random()-.5)*1,   (Math.random()-.5)*1   );
						//thing.velocity.add(randDir);
						thing.velocity.x = myNoise.noise(timer,timer,timer);
						thing.velocity.y = myNoise.noise(timer+1000,1000+timer,1000+timer);
						thing.velocity.z = myNoise.noise(10000+timer,10000+timer,10000+timer);
					}
					
					if(!thing.drop){// || thing.dropCount > 10){
						limit(thing.velocity,1);
						thing.dropCount = 0;
					}
					
					console.log(thing.drop);
					
					if(thing.dropCount > 100){
						thing.drop = false;
					}
					//if(thing.velocity.x >5 || thing.velocity.y >5 || thing.velocity.z >5 || thing.velocity.x < -5 || thing.velocity.y <-5 || thing.velocity.z <-5){
					//	thing.velocity.multiplyScalar(-.5);
					//}
					*/
					
					things.push(thing);
				}
			}
			
			function limit(vToCheck, max){
				if(vToCheck.length() > max){
					vToCheck.setLength(max);		
			}
}
			
			function render() {
				//moveThings();
				renderer.render( scene, camera );
				//stats.update();
				

			}
					
			function Mover(){
				//set up
				
				
				this.location = new THREE.Vector3(((Math.random())*100,(Math.random())*100,(Math.random())*100));
				this.velocity = new THREE.Vector3(((Math.random()),(Math.random()),(Math.random())));
				this.acceleration = new THREE.Vector3(0.01,0.01,0.01);
				
				/*
				geometry1 = new THREE.CubeGeometry(15, 1, 1);
				
				var geometry = new THREE.Geometry(); 
				geometry.vertices.push( new THREE.Vector3( -10, 10, 0 ) ); 
				geometry.vertices.push( new THREE.Vector3( -10, -10, 0 ) ); 
				geometry.vertices.push( new THREE.Vector3( 10, -10, 0 ) ); 
				geometry.vertices.push( new THREE.Vector3( 0, 0, -10 ) ); 
				geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
				geometry.faces.push( new THREE.Face3( 0, 1, 3 ) );
				
				*/
				var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
				material = new THREE.MeshBasicMaterial({
					color: 0x00ff00
				});
				
				
	
				
				this.mesh = new THREE.Mesh(geometry, material);
	
				this.mesh.matrixAutoUpdate = true;
				this.mesh.updateMatrix();
				
				//console.log(this.velocity);
				this.step = function(){
					this.mesh.rotation.x += 1;
					this.velocity.add(this.acceleration);
					this.location.add(this.velocity);
					this.mesh.position = this.location;
					//this.mesh1.position = this.location;
					//checkBounds(this);
					//limit(this.velocity ,10);
					
					//setRandom(this);
					//this.velocity = randy;
					this.acceleration = new THREE.Vector3((Math.random()-0.5)/10,(Math.random()-0.5)/10,(Math.random()-0.5)/10);
				};
			}
			
			function setRandom(vecName){
				vecName = new THREE.Vector3(Math.random()*10000,Math.random()*10000,Math.random()*10000);
				//console.log(vecName);
			}


