// Find the latest version by visiting https://cdn.skypack.dev/three.

import * as THREE from "https://cdn.skypack.dev/three@0.124.0";

const scene = new THREE.Scene();
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
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(10, 6, 100, 60);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x3ac3d3,
  opacity: 0,
  /* wireframe: true, */
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
let spheres = [];
for (let i = 0; i < plane.geometry.vertices.length; i++) {
  const v = plane.geometry.vertices[i];
  const sphereGeometry = new THREE.SphereGeometry(0.0125, 10, 10);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x3ac3d3,
    opacity: 1,
  });
  spheres[i] = new THREE.Mesh(sphereGeometry, sphereMaterial);
  spheres[i].position.set(v.x, v.y, v.z);
  scene.add(spheres[i]);
}

camera.rotation.x = (95 * Math.PI) / 180;

camera.position.set(0, -2, 0.5);

scene.remove(plane);

const clock = new THREE.Clock();

function animate() {
  const t = clock.getElapsedTime();
  for (let i = 0; i < spheres.length; i++) {
    const waveX1 = 0.025 * Math.sin(spheres[i].position.x * 6 + t);
    const waveX2 = 0.0125 * Math.sin(spheres[i].position.x * 8 + t * 2);
    const waveY1 = 0.025 * Math.sin(spheres[i].position.y * 6 + t * 1.5);
    const waveY2 = 0.0125 * Math.sin(spheres[i].position.y * 4 + t * 2.5);
    spheres[i].position.z = waveX1 + waveX2 + waveY1 + waveY2;
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
