import "./dcStudio.css";
import { dcView } from "../dcView";
import * as SPECTOR from "spectorjs";
import { GUI } from "lil-gui";
import { _UDom } from "../../dcUtils/_UDom";
import { Scene, TextureLoader, Vector3, WebGLRenderer } from "three";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { dcGlobalVars } from "../../../dcGlobalVars";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { dcDimension } from "../../../dcGlobalTypes";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

enum VIRTUAL_STUDIO_CSS_CLASSNAMES {
	CONTAINER = "studio-container"
}

export class dcStudio extends dcView {

	private static INSTANCE: dcStudio;

	private readonly canvas: HTMLCanvasElement;

	// DEBUG
	private readonly spector: SPECTOR;
	private readonly gui: GUI;

	private readonly scene: Scene;
	private readonly dimension: dcDimension;

	private readonly textureLoader: TextureLoader;
	private readonly dracoLoader: DRACOLoader;
	private readonly gltfLoader: GLTFLoader;

	private readonly camera: THREE.PerspectiveCamera;
	private readonly controls: PointerLockControls;
	private readonly renderer: WebGLRenderer;

	private moveForward: boolean;
	private moveBackward: boolean;
	private moveLeft: boolean;
	private moveRight: boolean;

	private prevTime: number;
	private velocity: Vector3;
	private direction: Vector3;

	private constructor(parentElement: HTMLElement, mainElement: HTMLElement) {
		super(parentElement, mainElement);
		this.canvas = _UDom.CE("canvas");

		this.spector = new SPECTOR.Spector();
		this.gui = new GUI({
			width: 400
		});

		this.scene = new THREE.Scene();
		this.dimension = { w: 0, h: 0 };

		this.textureLoader = new THREE.TextureLoader();
		this.dracoLoader = new DRACOLoader();
		this.dracoLoader.setDecoderPath(dcGlobalVars.DRACO_LOADER_PATH);
		this.gltfLoader = new GLTFLoader();
		this.gltfLoader.setDRACOLoader(this.dracoLoader);

		this.camera = new THREE.PerspectiveCamera(45, 0, 0.1, 100);

		this.controls = new PointerLockControls(this.camera, this.canvas);

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true
		});

		this.moveForward = false;
		this.moveBackward = false;
		this.moveLeft = false;
		this.moveRight = false;

		this.prevTime = performance.now();
		this.velocity = new THREE.Vector3();
		this.direction = new THREE.Vector3();
	}

	public static getInstance(parentElement: HTMLElement): dcStudio {
		if (!dcStudio.INSTANCE) {
			dcStudio.INSTANCE = new dcStudio(parentElement, _UDom.CCE("studio"));
		}

		return dcStudio.INSTANCE;
	}

	public autoSetDimension(): void {
		this.dimension.w = globalThis.innerWidth;
		this.dimension.h = globalThis.innerHeight;
	}

	public autoSetCameraProperties(): void {
		this.camera.aspect = this.dimension.w / this.dimension.h;
		this.camera.updateProjectionMatrix();
		//this.camera.position.x = 4;
		//this.camera.position.y = 2;
		//this.camera.position.z = 4;
	}

	public autoSetRendererProperties(): void {
		this.renderer.setSize(this.dimension.w, this.dimension.h);
		this.renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio, 2));
		this.renderer.outputEncoding = THREE.sRGBEncoding;
	}

	public init(): void {
		super.init();
		if (this.isInitiated()) {
			this.spector.displayUI();
			this.animate();
			this.subscribeToEventListeners();
		}
	}

	public destroy(): void {
		super.init();
		if (!this.isInitiated()) {
			this.unSubscribeToEventListeners();
		}
	}

	protected buildUI(): void {
		this.autoSetDimension();
		this.autoSetCameraProperties();
		this.autoSetRendererProperties();

		this.loadRessources();

		//https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html

		this.scene.add(this.camera);

		this.getMainElement().appendChild(this.canvas);
	}

	private loadRessources(): void {
		const bakedTexture = this.textureLoader.load(dcGlobalVars.VIRTUAL_STUDIO_TEXTURE_PATH);
		bakedTexture.flipY = false;
		bakedTexture.encoding = THREE.sRGBEncoding;

		const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture /*, color: 0xff0000 */ });

		this.gltfLoader.load(dcGlobalVars.VIRTUAL_STUDIO_GLB_PATH, (gltf) => {
			gltf.scene.traverse((child) => {
				// @ts-ignore
				child.material = bakedMaterial;
			});
			console.log(gltf.scene);
			this.scene.add(gltf.scene);
		});
	}

	private animate(): void {
		//this.controls.update();

		const time = performance.now();

		if (this.controls.isLocked) {

			const delta = ( time - this.prevTime ) / 1000;

			this.velocity.x -= this.velocity.x * 10.0 * delta;
			this.velocity.z -= this.velocity.z * 10.0 * delta;

			this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

			this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
			this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
			this.direction.normalize(); // this ensures consistent movements in all directions

			if (this.moveForward || this.moveBackward) {
				this.velocity.z -= this.direction.z * 400.0 * delta;
			}

			if (this.moveLeft || this.moveRight) {
				this.velocity.x -= this.direction.x * 400.0 * delta;
			}

			this.controls.moveRight(-this.velocity.x * delta);
			this.controls.moveForward(-this.velocity.z * delta);


		}

		this.prevTime = time;

		this.renderer.render(this.scene, this.camera);

		globalThis.requestAnimationFrame(() => this.animate());
	}

	private subscribeToEventListeners(): void {
		globalThis.addEventListener("resize", () => this.onResize());
		globalThis.addEventListener("keydown", (e) => this.onKeyDown(e));
		globalThis.addEventListener("keyup", (e) => this.onKeyUp(e));

		this.canvas.addEventListener("click", () => this.controls.lock());
	}

	private unSubscribeToEventListeners(): void {
		globalThis.removeEventListener("resize", this.onResize);
		globalThis.removeEventListener("keydown", this.onKeyDown);
		globalThis.removeEventListener("keyup", this.onKeyUp);
	}

	private onResize(): void {
		this.autoSetDimension();
		this.autoSetCameraProperties();
		this.autoSetRendererProperties();
	}

	private onKeyDown(event: KeyboardEvent): void {
		switch ( event.code ) {
			case "ArrowUp":
			case "KeyW":
				this.moveForward = true;
				break;
			case "ArrowLeft":
			case "KeyA":
				this.moveLeft = true;
				break;
			case "ArrowDown":
			case "KeyS":
				this.moveBackward = true;
				break;
			case "ArrowRight":
			case "KeyD":
				this.moveRight = true;
				break;
		}
	}

	private onKeyUp(event: KeyboardEvent): void {
		switch ( event.code ) {
			case 'ArrowUp':
			case 'KeyW':
				this.moveForward = false;
				break;
			case 'ArrowLeft':
			case 'KeyA':
				this.moveLeft = false;
				break;
			case 'ArrowDown':
			case 'KeyS':
				this.moveBackward = false;
				break;
			case 'ArrowRight':
			case 'KeyD':
				this.moveRight = false;
				break;
		}
	}

}