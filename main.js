import './style.css'

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(2);
camera.position.setX(0)
camera.position.setY(1)

// const video = document.getElementById( 'video' );
// const decoder = new THREE.VideoTexture( video );

const murphTexture = new THREE.TextureLoader().load('MurpheusFace.jpeg')
const spaceTexture = new THREE.TextureLoader().load('CloudsGoodDark.jpg');
const spaceTexture2 = new THREE.TextureLoader().load('CloudsGood.jpg');

scene.background = spaceTexture;


const geometry  = new THREE.TorusGeometry( 8, 1, 6, 5 )
const material = new THREE.MeshStandardMaterial( { map: spaceTexture2 } );
const torus = new THREE.Mesh( geometry, material );
scene.add(torus)

const loader = new GLTFLoader();
loader.load( 'Murph_Sparkles.glb', function (gltf)  {
  scene.add(gltf.scene);
  gltf.scene.position.y = -1.2;

  gtlf.scene = new THREE.Vector3.scale(10, 10, 10);


});

const pointLight2 = new THREE.PointLight(0xffffff)
pointLight2.position.set(0, 2, 1,)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5,)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, pointLight2, ambientLight)


const lightHelper = new THREE.PointLightHelper(pointLight)
const lightHelper2 = new THREE.PointLightHelper(pointLight2)
const cameraHelper = new THREE.CameraHelper(camera);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, lightHelper2, gridHelper, cameraHelper)

 
const controls = new OrbitControls(camera, renderer.domElement);


const murph = new THREE.Mesh(
  new THREE.BoxGeometry(4,5,4),
  new THREE.MeshBasicMaterial( { map: murphTexture } )
);

scene.add(murph);
murph.position.z = 3;
murph.position.setX(-20);

const murph2 = new THREE.Mesh(
  new THREE.BoxGeometry(4,5,4),
  new THREE.MeshBasicMaterial( { map: murphTexture } )
);

scene.add(murph2);
murph2.position.z = 3;
murph2.position.setX(20);



function addStar() {
 const geometry = new THREE.SphereGeometry(0.1, 24, 24);
 const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
 const star = new THREE.Mesh( geometry, material );

 const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

 star.position.set(x, y, z);
 scene.add(star)
}

Array(300).fill().forEach(addStar)


function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  murph.rotation.y += 0.09;
  murph2.rotation.y += -0.09;

  camera.position.z = t * -0.012;
  camera.position.x = t * -0.000002;
  camera.position.y = t * -0.006;
}

document.body.onscroll = moveCamera

function animate() {
    requestAnimationFrame( animate );

torus.rotation.x += 0.004;
torus.rotation.y += 0.003
torus.rotation.z += 0.02;

controls.update();

    renderer.render( scene, camera );

}

animate()