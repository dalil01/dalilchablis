import "./dcOffice.css";

import {dcView} from "../dcView";
import {_UDom} from "../../dcUtils/_UDom";
import * as THREE from "three";
import {Euler, Scene, TextureLoader, Vector3, WebGLRenderer} from "three";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {dcGlobalVars} from "../../../global/dcGlobalVars";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {dcDimension} from "../../../global/dcGlobalTypes";
import {_UIcon} from "../../dcUtils/_UIcon";
import {DcIcons} from "../../dcIcons/dcIcons";
import {GLOBAL_CSS_CLASSNAMES} from "../../../global/dcGlobalEnums";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

enum OFFICE_CSS_CLASSNAMES {
	CONTAINER = "office-container",
	HTML_CONTAINER = "office-html-container",
	LOADING = "office-loading",
	PRESENTATION_CONTAINER = "office-presentation-container",
	PRESENTATION_NAME_CONTAINER = "office-presentation-name-container",
	START_VISIT_CONTAINER = "office-start-visit-container"
}

export class dcOffice extends dcView {

	private static INSTANCE: dcOffice;

	private readonly HTMLContainer: HTMLDivElement;
	private readonly canvas: HTMLCanvasElement;

	private resourcesLoaded: boolean;
	private readonly loading: HTMLElement;

	// DEBUG
	// private readonly spector: SPECTOR;
	// private readonly gui: GUI;

	private readonly scene: Scene;
	private readonly dimension: dcDimension;

	private readonly textureLoader: TextureLoader;
	private readonly dracoLoader: DRACOLoader;
	private readonly gltfLoader: GLTFLoader;

	private readonly camera: THREE.PerspectiveCamera;
	private readonly controls: OrbitControls;
	private readonly renderer: WebGLRenderer;

	private constructor(parentElement: HTMLElement, mainElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, mainElement);

		this.HTMLContainer = _UDom.CE("div", {className: OFFICE_CSS_CLASSNAMES.HTML_CONTAINER});

		this.canvas = _UDom.CE("canvas");
		this.canvas.style.cursor = "grab";

		this.resourcesLoaded = false;
		this.loading = _UIcon.getIcon(DcIcons.DcIconLoading, {className: OFFICE_CSS_CLASSNAMES.LOADING});

		//this.spector = new SPECTOR.Spector();
		//this.gui = new GUI({
		//	width: 400
		//});

		this.scene = new THREE.Scene();
		this.dimension = {w: 0, h: 0};

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

		if (autoInit)
			this.init();
	}

	public static getInstance(parentElement: HTMLElement, autoInit: boolean = false): dcOffice {
		if (!dcOffice.INSTANCE) {
			dcOffice.INSTANCE = new dcOffice(parentElement, _UDom.CCE("office", {className: OFFICE_CSS_CLASSNAMES.CONTAINER}), autoInit);
		}

		return dcOffice.INSTANCE;
	}

	public updateDimension(): void {
		this.dimension.w = globalThis.innerWidth;
		this.dimension.h = globalThis.innerHeight;
	}

	public updateCameraProperties(): void {
		this.camera.aspect = this.dimension.w / this.dimension.h;
		this.camera.updateProjectionMatrix();
	}

	public updateRendererProperties(): void {
		this.renderer.setSize(this.dimension.w, this.dimension.h);
		this.renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio, 2));
		this.renderer.outputEncoding = THREE.sRGBEncoding;
	}

	public init(): void {
		super.init();
		if (this.isInitiated()) {
			//this.spector.displayUI();
			this.animate();
		}
	}

	public destroy(): void {
		super.init();
		if (!this.isInitiated()) {
			this.unSubscribeToEventListeners();
		}
	}

	protected buildUI(): void {
		this.updateDimension();
		this.updateCameraProperties();
		this.updateRendererProperties();

		this.loadResources();

		//https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html

		const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 1);
		light.position.set(0.5, 1, 0.75);
		this.scene.add(light);

		this.scene.add(this.camera);

		//_UDom.AC(this.getMainElement(), this.HTMLContainer, this.canvas);
	}


	private buildLoading(): void {
		//this.HTMLContainer.appendChild(this.loading);
	}

	private loadResources(): void {
		const bakedTexture = this.textureLoader.load(dcGlobalVars.VIRTUAL_STUDIO_TEXTURE_PATH);
		bakedTexture.flipY = false;
		bakedTexture.encoding = THREE.sRGBEncoding;

		const bakedMaterial = new THREE.MeshBasicMaterial({map: bakedTexture /*, color: 0xff0000 */});

		this.gltfLoader.load(dcGlobalVars.VIRTUAL_STUDIO_GLB_PATH, (gltf) => {
			//setTimeout(() => {
				gltf.scene.traverse((child) => {
					// @ts-ignore
					child.material = bakedMaterial;
				});

				// console.log(gltf.scene);
				this.scene.add(gltf.scene);

				this.buildStartVisitButton();

				this.resourcesLoaded = true;

				//if (_UDom.elementHasChild(this.HTMLContainer, this.loading))
				//	this.HTMLContainer.removeChild(this.loading);
			//}, 6000);
		});
	}

	private buildStartVisitButton(): void {
		const startVisitContainer = _UDom.CE("div", {className: OFFICE_CSS_CLASSNAMES.START_VISIT_CONTAINER});
		const startVisitIcon = _UIcon.getIcon(DcIcons.DcIconArrowUp)
		startVisitContainer.appendChild(startVisitIcon);

		startVisitIcon.addEventListener("mouseover", () => {
			console.log("hover")

			gsap.to(this.camera.position, {
				duration: 1.6,
				x: 1.5,
				onUpdate: () => {
				},
				onComplete: () => {}
			});

		});

		startVisitIcon.addEventListener("mouseleave", () => {
			console.log("leave")

			gsap.to(this.camera.position, {
				duration: 1.6,
				x: -1.5,
				onUpdate: () => {
				},
				onComplete: () => {}
			});

		});

		startVisitIcon.addEventListener("click", () => {
			//this.getMainElement().removeChild(this.HTMLContainer);

			this.camera.position.set(0, 1.25, 0);

			this.controls.update();

			gsap.to(this.camera.position, {
				duration: 1.6,
				x: 1.6,
				onUpdate: () => {
					this.controls.target.set(0, 1.25, 0)
				},
				onComplete: () => {}
			});

			this.controls.enableDamping = true;
			this.controls.enablePan = false;
			this.controls.enableRotate = true;
			this.controls.enableZoom = true;
			this.controls.maxDistance = 3;
			this.controls.minDistance = 2;
			this.controls.maxPolarAngle = Math.PI;
			this.controls.minPolarAngle = 0;

			this.subscribeToEventListeners();
		});

		//this.HTMLContainer.appendChild(startVisitContainer);
	}

	private animate(): void {
		//const time = performance.now();
		this.controls.update();
		//this.prevTime = time;
		this.renderer.render(this.scene, this.camera);
		globalThis.requestAnimationFrame(() => this.animate());
	}

	private subscribeToEventListeners(): void {
		globalThis.addEventListener("resize", () => this.onResize());
		globalThis.addEventListener("mousedown", () => this.onMouseDown());
		globalThis.addEventListener("mouseup", () => this.onMouseUp());
	}

	private unSubscribeToEventListeners(): void {
		globalThis.removeEventListener("resize", this.onResize);
		globalThis.removeEventListener("mousedown", this.onMouseDown);
		globalThis.removeEventListener("mouseup", this.onMouseUp);
	}

	private onResize(): void {
		this.updateDimension();
		this.updateCameraProperties();
		this.updateRendererProperties();
	}

	private onMouseDown(): void {
		this.canvas.style.cursor = "grabbing";
	}

	private onMouseUp(): void {
		this.canvas.style.cursor = "grab";
	}

}
