import "./dcStudio.css";
import { dcView } from "../dcView";
import * as SPECTOR from "spectorjs";
import { GUI } from "lil-gui";
import { _UDom } from "../../dcUtils/_UDom";
import { Scene, TextureLoader, WebGLRenderer } from "three";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { dcGlobalVars } from "../../../dcGlobalVars";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { dcDimension } from "../../../dcGlobalTypes";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
	private readonly controls: OrbitControls;
	private readonly renderer: WebGLRenderer;

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

		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true
		});
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
		this.camera.position.x = 4;
		this.camera.position.y = 2;
		this.camera.position.z = 4;
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

		this.scene.add(this.camera);

		this.getMainElement().appendChild(this.canvas);
	}

	private animate(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
		globalThis.requestAnimationFrame(() => this.animate());
	}

	private subscribeToEventListeners(): void {
		globalThis.addEventListener("resize", () => this.onResize());
	}

	private onResize(): void {
		this.autoSetDimension();
		this.autoSetCameraProperties();
		this.autoSetRendererProperties();
	}

	private unSubscribeToEventListeners(): void {
		globalThis.removeEventListener("resize", this.onResize);
	}

}