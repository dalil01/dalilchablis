import "./dcOffice.css";

import { dcView } from "../dcView";
import { _UDom } from "../../dcUtils/_UDom";
import * as THREE from "three";
import { Scene, TextureLoader, WebGLRenderer } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { dcGlobalVars } from "../../../global/dcGlobalVars";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { dcDimension } from "../../../global/dcGlobalTypes";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import GUI from "lil-gui";
import * as SPECTOR from "spectorjs";
import { dcOfficeEvent } from "./dcOfficeEvent";


enum OFFICE_CSS_CLASSNAMES {
	CONTAINER = "office-container",
	HTML_CONTAINER = "office-html-container",
}

export class dcOffice extends dcView {

	private readonly canvas: HTMLCanvasElement;

	// DEBUG
	//private readonly spector: SPECTOR;
	//private readonly gui: GUI;

	private readonly scene: Scene;
	private readonly dimension: dcDimension;

	private readonly textureLoader: TextureLoader;
	private readonly dracoLoader: DRACOLoader;
	private readonly gltfLoader: GLTFLoader;

	private readonly camera: THREE.PerspectiveCamera;
	private readonly controls: OrbitControls;
	private readonly renderer: WebGLRenderer;

	private officeEvent: dcOfficeEvent;

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("office"));

		this.canvas = _UDom.canvas();
		this.canvas.style.cursor = "grab";

		//this.spector = new SPECTOR.Spector();
		//this.gui = new GUI({
		//	width: 400
		//});

		this.scene = new THREE.Scene();
		this.dimension = { w: 0, h: 0 };

		this.textureLoader = new THREE.TextureLoader();
		this.dracoLoader = new DRACOLoader();
		this.dracoLoader.setDecoderPath(dcGlobalVars.DRACO_LOADER_PATH);
		this.gltfLoader = new GLTFLoader();
		this.gltfLoader.setDRACOLoader(this.dracoLoader);

		this.camera = new THREE.PerspectiveCamera(45, 0, 0.01, 80);
		this.camera.position.set(-2.5, 1.25, -3.6);

		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.target.set(-0.3, 1.25, 0);

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true
		});

		this.officeEvent = new dcOfficeEvent(this);

		if (autoInit)
			this.init();
	}

	public getCanvas(): HTMLCanvasElement {
		return this.canvas;
	}

	public getDimension(): dcDimension {
		return this.dimension;
	}

	public getCamera(): THREE.PerspectiveCamera {
		return this.camera;
	}

	public getRenderer(): WebGLRenderer {
		return this.renderer;
	}

	public init(): void {
		super.init();
		if (this.isInitiated()) {
			//this.spector.displayUI();
			this.animate();
		}
	}

	public destroy(): void {
		super.destroy();
		if (!this.isInitiated()) {
			this.officeEvent.unSubscribeToEventListeners();
		}
	}

	protected buildUI(): void {
		this.officeEvent.updateDimension();
		this.officeEvent.updateCameraProperties();
		this.officeEvent.updateRendererProperties();

		this.loadResources();

		//https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html

		this.scene.add(this.camera);

		_UDom.AC(this.getMainElement(), this.canvas);
	}

	private loadResources(): void {
		const bakedTexture = this.textureLoader.load(dcGlobalVars.VIRTUAL_STUDIO_TEXTURE_PATH);
		bakedTexture.flipY = false;
		bakedTexture.encoding = THREE.sRGBEncoding;

		const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture /*, color: 0xff0000 */ });

		this.gltfLoader.load(dcGlobalVars.VIRTUAL_STUDIO_GLB_PATH, (gltf) => {
			gltf.scene.traverse((child) => {
				// @ts-ignore
				child.material = bakedMaterial;
			});

			// console.log(gltf.scene);
			this.scene.add(gltf.scene);

			//this.buildStartVisitButton();

		});
	}

	public onHoverStartVisitButton(): Function {
		return () => {
			gsap.to(this.camera.position, {
				duration: 1.6,
				x: 1.5,
				onUpdate: () => {
				},
				onComplete: () => {
				}
			});
		}
	}

	public onLeaveStartVisitButton(): Function {
		return () => {
			gsap.to(this.camera.position, {
				duration: 1.6,
				x: -1.5,
				onUpdate: () => {
				},
				onComplete: () => {
				}
			});
		}
	}

	public onStartVisit(): Function {
		return () => {
			this.camera.position.set(0, 1.25, 0);

			this.controls.update();

			gsap.to(this.camera.position, {
				duration: 1.6,
				x: 1.6,
				onUpdate: () => {
					this.controls.target.set(0, 1.25, 0)
				},
				onComplete: () => {
				}
			});

			this.controls.enableDamping = true;
			this.controls.enablePan = false;
			this.controls.enableRotate = true;
			this.controls.enableZoom = true;
			this.controls.maxDistance = 3;
			this.controls.minDistance = 2;
			this.controls.maxPolarAngle = Math.PI;
			this.controls.minPolarAngle = 0;

			this.officeEvent.subscribeToEventListeners();
		}
	}

	private animate(): void {
		//const time = performance.now();
		this.controls.update();
		//this.prevTime = time;
		this.renderer.render(this.scene, this.camera);
		globalThis.requestAnimationFrame(() => this.animate());
	}

}
