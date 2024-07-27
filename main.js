const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;

camera.position.z = 6;

const loader = new THREE.GLTFLoader();
loader.load(
    'plik.glb',
    function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        model.position.set(0, 0, 0);
        model.scale.set(10, 10, 10);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const toggleButton = document.getElementById('toggleButton');
let interactionEnabled = true;

toggleButton.addEventListener('click', () => {
    interactionEnabled = !interactionEnabled;
    controls.enabled = interactionEnabled;
    toggleButton.textContent = interactionEnabled ? 'Disable Interaction' : 'Enable Interaction';
});

