import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(geometry, material);
scene.add(box);
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xeeeeee, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
plane.position.y = -1;
scene.add(plane);
box.userData = { isDragging: false, previousMousePosition: { x: 0, y: 0 } };

const onMouseDown = (event) => {
  box.userData.isDragging = true;
};

const onMouseUp = (event) => {
  box.userData.isDragging = false;
};

const onMouseMove = (event) => {
  if (box.userData.isDragging) {
    const deltaMove = {
      x: event.offsetX - box.userData.previousMousePosition.x,
      y: event.offsetY - box.userData.previousMousePosition.y
    };

    const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        toRadians(deltaMove.y * 1),
        toRadians(deltaMove.x * 1),
        0,
        'XYZ'
      )
    );

    box.quaternion.multiplyQuaternions(deltaRotationQuaternion, box.quaternion);
  }

  box.userData.previousMousePosition = {
    x: event.offsetX,
    y: event.offsetY
  };
};

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('mousemove', onMouseMove);
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
function toRadians(angle) {
  return angle * (Math.PI / 180);
}
//npm run dev
