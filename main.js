// Find the latest version by visiting https://cdn.skypack.dev/three.

import * as THREE from "https://cdn.skypack.dev/three@0.124.0";

const background = "#2c2a38";

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(background, 1, 300000);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(background, 1);
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(10, 3, 100, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x3ac3d3,
  opacity: 0,
  /* wireframe: true, */
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
let circles = [];
for (let i = 0; i < plane.geometry.vertices.length; i++) {
  const v = plane.geometry.vertices[i];
  const circleGeometry = new THREE.CircleGeometry(0.01, 12);
  const circleMaterial = new THREE.MeshBasicMaterial({
    color: 0x3ac3d3,
    opacity: 1,
  });
  circles[i] = new THREE.Mesh(circleGeometry, circleMaterial);
  circles[i].position.set(v.x, v.y, v.z);
  circles[i].quaternion.copy(camera.quaternion);
  scene.add(circles[i]);
}

camera.rotation.x = (95 * Math.PI) / 180;

camera.position.set(0, -3, 0.45);

for (let i = 0; i < circles.length; i++) {
  circles[i].quaternion.copy(camera.quaternion);
}

scene.remove(plane);

const clock = new THREE.Clock();

function animate() {
  const t = clock.getElapsedTime();
  for (let i = 0; i < circles.length; i++) {
    //const asd = Math.sin(Math.random() - 1) * 0.0001;
    const waveX1 = 0.05 * Math.sin(circles[i].position.x * 4 + t * 0.5);
    const waveX2 = 0.0125 * Math.sin(circles[i].position.x * 8 + t * 2);
    const waveY1 = 0.035 * Math.sin(circles[i].position.y * 6 + t * 0.5);
    const waveY2 = 0.0125 * Math.sin(circles[i].position.y * 4 + t * 2.5);
    circles[i].position.z = waveX1 + waveX2 + waveY1 + waveY2;
    //circles[i].position.x += asd;
    //camera.position.x += 0.000001;
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
