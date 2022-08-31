import "./dcOffice.css";

import {dcView} from "../dcView";
import {_UDom} from "../../dcUtils/_UDom";
import * as THREE from "three";
import {Scene, TextureLoader, Vector3, WebGLRenderer} from "three";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {dcGlobalVars} from "../../../dcGlobalVars";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {dcDimension} from "../../../dcGlobalTypes";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";
import {_UIcon} from "../../dcUtils/_UIcon";
import {DcIcons} from "../../dcIcons/dcIcons";
import {DOM_CSS_CLASSNAMES} from "../../../dcGlobalEnums";

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
	private readonly controls: PointerLockControls;
	private readonly renderer: WebGLRenderer;

	private moveForward: boolean;
	private moveBackward: boolean;
	private moveLeft: boolean;
	private moveRight: boolean;

	private prevTime: number;
	private velocity: Vector3;
	private direction: Vector3;

	private constructor(parentElement: HTMLElement, mainElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, mainElement);

		this.HTMLContainer = _UDom.CE("div", { className: OFFICE_CSS_CLASSNAMES.HTML_CONTAINER });
		this.canvas = _UDom.CE("canvas");

		this.resourcesLoaded = false;
		this.loading = _UIcon.getIcon(DcIcons.DcIconLoading, { className: OFFICE_CSS_CLASSNAMES.LOADING });

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

		this.camera = new THREE.PerspectiveCamera(45, 0, 0.01, 100);
		this.camera.position.x = -1.5;
		this.camera.position.y = 1.5;
		this.camera.position.z = -1.5;
		this.camera.lookAt(new THREE.Vector3(-1.2, 1.2, 0));

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

		if (autoInit)
			this.init();
	}

	public static getInstance(parentElement: HTMLElement, autoInit: boolean = false): dcOffice {
		if (!dcOffice.INSTANCE) {
			dcOffice.INSTANCE = new dcOffice(parentElement, _UDom.CCE("office", { className: OFFICE_CSS_CLASSNAMES.CONTAINER }), autoInit);
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
		this.buildPresentationText();

		this.updateDimension();
		this.updateCameraProperties();
		this.updateRendererProperties();

		this.loadResources();

		//https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html

		const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 1 );
		light.position.set( 0.5, 1, 0.75 );
		this.scene.add( light );

		this.scene.add(this.camera);

		_UDom.AC(this.getMainElement(), this.HTMLContainer, this.canvas);
	}

	private buildPresentationText(): void {
		const presentationContainer = _UDom.CE("div", { className: OFFICE_CSS_CLASSNAMES.PRESENTATION_CONTAINER });

		const ms = 62;

		const presentationText = _UDom.CE("p");
		presentationContainer.appendChild(presentationText);

		const hello = "Hello, welcome to my website. \n I'm ";
		const name = "Dalil CHABLIS, ";
		const job = "Junior Fullstack Developer ! ";

		this.writeTextInElement([
			{ startCallback: null, endCallback: null, element: presentationText, text: hello},
			{ startCallback: () => {
					const nameContainer = _UDom.CE("span", { className: OFFICE_CSS_CLASSNAMES.PRESENTATION_NAME_CONTAINER });
					presentationText.appendChild(nameContainer);
					return nameContainer;
				}, element: null, text: name, endCallback: null
			},
			{ startCallback: () => {
					const jobContainer = _UDom.CE("span");
					presentationText.appendChild(jobContainer);
					return jobContainer;
				}, element: null, text: job,
				endCallback: () => {
					presentationText.appendChild(_UIcon.getIcon(DcIcons.DcIconSmile));
					presentationText.appendChild(_UDom.CE("span", { className: DOM_CSS_CLASSNAMES.BLINK, innerText: '_' }));

					if (!this.resourcesLoaded)
						this.buildLoading();
				}
			}
		], ms, true, false)

		/*
		presentationText.appendChild(_UIcon.getIcon(DcIcons.DcIconSmile));
					presentationText.appendChild(_UDom.CE("span", { className: DOM_CSS_CLASSNAMES.BLINK, innerText: '_' }));

					if (!this.resourcesLoaded)
						this.buildLoading();
		 */

		this.HTMLContainer.appendChild(presentationContainer);
	}

	public writeTextInElement(elements: { startCallback: null | Function, endCallback: null | Function, element: HTMLElement | null, text: string }[], ms: number = 100, blink: boolean = true, blinkAlwaysActive: boolean = true, blinkChar: string = '_'): void {
		const resolveAfterMs = () => new Promise((resolve, _reject) => setTimeout(resolve, ms));

		let elemIndex = 0;
		let startIndex = 0;

		const asyncCall =async () => {
			await resolveAfterMs();

			let element = elements[elemIndex];

			if (element.startCallback && !element.element) {
				element.element = element.startCallback();
			}

			if (startIndex < element.text.length) {
				// @ts-ignore
				element.element.innerText = element.text.substring(0, startIndex + 1);

				if (blink) {
					// @ts-ignore
					element.element.appendChild(_UDom.CE("span", {className: DOM_CSS_CLASSNAMES.BLINK, innerText: blinkChar}));
					// @ts-ignore
					if (!blinkAlwaysActive && startIndex + 1 == element.text.length && element.element.lastChild)
						{ // @ts-ignore
							element.element.removeChild(element.element.lastChild);
						}
				}
			}

			startIndex += 1

			if (startIndex >= element.text.length) {
				if (element.endCallback) {
					element.endCallback();
				}

				if (elemIndex >= elements.length) {
					return;
				}
				elemIndex += 1;
				startIndex = 0;
			}

			asyncCall();
		}

		asyncCall();
	}

	private buildLoading(): void {
		this.HTMLContainer.appendChild(this.loading);
	}

	private loadResources(): void {
		const bakedTexture = this.textureLoader.load(dcGlobalVars.VIRTUAL_STUDIO_TEXTURE_PATH);
		bakedTexture.flipY = false;
		bakedTexture.encoding = THREE.sRGBEncoding;

		const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture /*, color: 0xff0000 */ });

		this.gltfLoader.load(dcGlobalVars.VIRTUAL_STUDIO_GLB_PATH, (gltf) => {
			setTimeout(() => {
				gltf.scene.traverse((child) => {
					// @ts-ignore
					child.material = bakedMaterial;
				});
				console.log(gltf.scene);
				this.scene.add(gltf.scene);

				this.buildStartVisitButton();

				this.resourcesLoaded = true;

				this.HTMLContainer.removeChild(this.loading);
			}, 8000);
		});
	}

	private buildStartVisitButton(): void {
		const startVisitContainer = _UDom.CE("div", { className: OFFICE_CSS_CLASSNAMES.START_VISIT_CONTAINER });
		const startVisitIcon = _UIcon.getIcon(DcIcons.DcIconArrowUp)
		startVisitContainer.appendChild(startVisitIcon);

		// https://loading.io/

		this.HTMLContainer.appendChild(startVisitContainer);
	}

	private animate(): void {
		const time = performance.now();

		if (this.controls.isLocked) {
			const delta = ( time - this.prevTime ) / 1000;

			this.velocity.x -= this.velocity.x * 100.0 * delta;
			this.velocity.z -= this.velocity.z * 100.0 * delta;

			this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
			this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
			this.direction.normalize(); // this ensures consistent movements in all directions

			if (this.moveForward || this.moveBackward) {
				this.velocity.z -= this.direction.z * 500.0 * delta;
			}

			if (this.moveLeft || this.moveRight) {
				this.velocity.x -= this.direction.x * 500.0 * delta;
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

		//this.canvas.addEventListener("click", () => this.controls.lock());
	}

	private unSubscribeToEventListeners(): void {
		globalThis.removeEventListener("resize", this.onResize);
		globalThis.removeEventListener("keydown", this.onKeyDown);
		globalThis.removeEventListener("keyup", this.onKeyUp);
	}

	private onResize(): void {
		this.updateDimension();
		this.updateCameraProperties();
		this.updateRendererProperties();
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