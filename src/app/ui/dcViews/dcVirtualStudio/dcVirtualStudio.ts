import "./dcVirtualStudio.css";
import { dcView } from "../dcView";
import * as SPECTOR from "spectorjs";
import { GUI } from "lil-gui";
import { _UDom } from "../../dcUtils/_UDom";
import { Scene, TextureLoader, WebGLRenderer } from "three";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLOBAL_VARS } from "../../../../main";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { dcDimension } from "../../dcUIGlobalTypes";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

enum VIRTUAL_STUDIO_CSS_CLASSNAMES {
	CONTAINER = "virtual-studio-container"
}

export class dcVirtualStudio extends dcView {

	private static INSTANCE: dcVirtualStudio;

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
		this.dracoLoader.setDecoderPath(GLOBAL_VARS.DRACO_LOADER_PATH);
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

	public static getInstance(parentElement: HTMLElement): dcVirtualStudio {
		if (!dcVirtualStudio.INSTANCE) {
			dcVirtualStudio.INSTANCE = new dcVirtualStudio(parentElement, _UDom.CCE("virtual-studio"));
		}

		return dcVirtualStudio.INSTANCE;
	}

	public autoSetDimension(): void {
		this.dimension.w = window.innerWidth;
		this.dimension.h = window.innerHeight;
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
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

		const bakedTexture = this.textureLoader.load(GLOBAL_VARS.VIRTUAL_STUDIO_TEXTURE_PATH);
		bakedTexture.flipY = false;
		bakedTexture.encoding = THREE.sRGBEncoding;

		const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

		this.gltfLoader.load(GLOBAL_VARS.VIRTUAL_STUDIO_GLB_PATH, (gltf) => {
			gltf.scene.traverse((child) => {
				// @ts-ignore
				child.material = bakedMaterial;
			});
			this.scene.add(gltf.scene);
		});

		this.scene.add(this.camera);

		this.getMainElement().appendChild(this.canvas);
	}

	private animate(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
		window.requestAnimationFrame(() => this.animate());
	}

	private subscribeToEventListeners(): void {
		window.addEventListener("resize", () => this.onResize());
	}

	private onResize(): void {
		this.autoSetDimension();
		this.autoSetCameraProperties();
		this.autoSetRendererProperties();
	}

	private unSubscribeToEventListeners(): void {
		window.removeEventListener("resize", this.onResize);
	}

}