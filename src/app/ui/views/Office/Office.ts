import "./Office.css";

import { View, VIEWS } from "../View";
import * as THREE from "three";
import { Scene, TextureLoader, Vector3, WebGLRenderer } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { OfficeEvent } from "./OfficeEvent";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { UDom } from "../../../utils/UDom";
import { Vars } from "../../../../Vars";
import { VRButton } from "three/examples/jsm/webxr/VRButton";
import { GLOBAL_CSS } from "../../../Experience";
import { UIcon } from "../../../utils/UIcon";
import { Icons } from "../../../icons/Icons";
import { Translator } from "../../../translations/Translator";
import { Translation } from "../../../translations/Translation";
import { Cursor } from "../../components/Cursor/Cursor";
import { Modal, Modal_TYPE } from "../../components/Modal/Modal";
import { AboutMe } from "../../components/Infos/AboutMe/AboutMe";
import { Contact } from "../../components/Contact/Contact";
import { Education } from "../../components/Infos/Education/Education";
import { Experience } from "../../components/Infos/Experience/Experience";
import { Projects } from "../../components/Infos/Projects/Projects";
import { Skills } from "../../components/Infos/Skills/Skills";

//import * as Stats from 'stats.js'

enum OFFICE_CSS {
	CONTAINER = "office-container",
	VR_BUTTON = "vr-button",
	POINT_WRAPPER = "point-wrapper",
	POINT = "point",
	ICON = "icon",
}

type Point = {
	offset: Vector3,
	position?: Vector3,
	element: HTMLElement
}

export type Dimension = { w: number, h: number };

export class Office extends View {

	private readonly canvas: HTMLCanvasElement;

	//private stats = new Stats();

	private readonly scene: Scene;

	private gltfSceneDark!: THREE.Group;
	private gltfSceneLight!: THREE.Group;

	private readonly dimension: Dimension;

	private readonly textureLoader: TextureLoader;
	private readonly dracoLoader: DRACOLoader;
	private readonly gltfLoader: GLTFLoader;

	private readonly camera: THREE.PerspectiveCamera;
	private readonly controls: OrbitControls;
	private readonly defaultControlsPosition: Vector3;
	private readonly renderer: WebGLRenderer;
	private readonly effectComposer: EffectComposer;

	private readonly vrButton: HTMLElement;

	private readonly officeEvent: OfficeEvent;

	private points: Map<string, Point> = new Map();

	private frustum: THREE.Frustum = new THREE.Frustum();

	private visitStarted: boolean = false;
	private resourcesLoaded: boolean = false;

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("office"));

		this.canvas = UDom.canvas();

		this.scene = new THREE.Scene();
		this.dimension = { w: 0, h: 0 };

		this.textureLoader = new THREE.TextureLoader();
		this.dracoLoader = new DRACOLoader();
		this.dracoLoader.setDecoderPath(Vars.PATH.DRACO_LOADER);
		this.gltfLoader = new GLTFLoader();
		this.gltfLoader.setDRACOLoader(this.dracoLoader);

		this.camera = new THREE.PerspectiveCamera(45, 0, 0.01, 80);

		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;
		this.controls.enablePan = false;
		this.controls.enableRotate = false;
		this.controls.enableZoom = false;

		this.defaultControlsPosition = new Vector3(0, 1.45, 0);

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: window.devicePixelRatio == 1,
			precision: "mediump",
			powerPreference: 'high-performance'
		});

		this.renderer.shadowMap.autoUpdate = false;
		this.renderer.shadowMap.needsUpdate = true;

		this.vrButton = VRButton.createButton(this.renderer);
		this.vrButton.classList.add(OFFICE_CSS.VR_BUTTON);
		this.autoSetVRMode();
		this.parentElement.appendChild(this.vrButton);

		let RenderTargetClass;
		if (this.renderer.getPixelRatio() === 1 && this.renderer.capabilities.isWebGL2) {
			RenderTargetClass = THREE.WebGLMultisampleRenderTarget;
			// console.log('Using WebGLMultisampleRenderTarget');
		} else {
			RenderTargetClass = THREE.WebGLRenderTarget;
			// console.log('Using WebGLRenderTarget');
		}

		const renderTarget = new RenderTargetClass(
			800,
			600,
			{
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				format: THREE.RGBAFormat,
				encoding: THREE.sRGBEncoding
			}
		);

		this.effectComposer = new EffectComposer(this.renderer, renderTarget)
		this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.effectComposer.setSize(this.dimension.w, this.dimension.h);

		const renderPass = new RenderPass(this.scene, this.camera);
		this.effectComposer.addPass(renderPass);

		if (this.renderer.getPixelRatio() === 1 && !this.renderer.capabilities.isWebGL2) {
			const pass = new SMAAPass(this.dimension.w, this.dimension.h);
			this.effectComposer.addPass(pass);
			// console.log("Using SMAA");
		}

		this.officeEvent = new OfficeEvent(this);

		this.officeEvent.init();
		this.officeEvent.subscribeToEventListeners();
		this.officeEvent.updateDimension();
		this.officeEvent.updateCameraProperties();
		this.officeEvent.updateRendererProperties();

		this.addPoints();

		this.scene.add(this.camera);

		if (autoInit)
			this.init();
	}

	public getCanvas(): HTMLCanvasElement {
		return this.canvas;
	}

	public getDimension(): Dimension {
		return this.dimension;
	}

	public getCamera(): THREE.PerspectiveCamera {
		return this.camera;
	}

	public getRenderer(): WebGLRenderer {
		return this.renderer;
	}

	public getEffectComposer(): EffectComposer {
		return this.effectComposer;
	}

	public setVisitStarted(value: boolean): void {
		this.visitStarted = value;
	}

	public init(): void {
		this.loadResources();

		super.init();

		if (this.isInitiated()) {
			this.renderer.setAnimationLoop(() => this.animate());
		}
	}

	public destroy(): void {
		super.destroy();

		if (!this.isInitiated()) {
			this.officeEvent.unSubscribeToEventListeners();
		}
	}

	public update() {
		super.update();

		if (!this.visitStarted) {
			this.onStartVisit();
		} else {
			this.controls.target.set(0, 1.45, 0)
			this.controls.update();
		}

		if (Vars.IS_DARK_MODE) {
			this.scene.remove(this.gltfSceneLight);
			this.scene.add(this.gltfSceneDark);
		} else {
			this.scene.remove(this.gltfSceneDark);
			this.scene.add(this.gltfSceneLight);
		}
	}

	public autoSetVRMode(): void {
		if (Vars.IS_VR_MODE) {
			this.renderer.xr.enabled = true;
			this.vrButton.classList.remove(GLOBAL_CSS.DISPLAY_NONE);
		} else {
			this.renderer.xr.enabled = false;
			this.vrButton.classList.add(GLOBAL_CSS.DISPLAY_NONE);
		}
	}

	public updateVRControlsPosition(): void {
		if (this.renderer.xr.isPresenting) {
			this.setVRControlsPosition();
		}
	}

	private setVRControlsPosition(): void {
		const cameraPosition = this.camera.position.clone();
		cameraPosition.y = this.defaultControlsPosition.y;
		this.controls.target.copy(cameraPosition);
		this.controls.update();
	}

	public onStartVisit(): void {
		this.camera.position.set(-2.5, 1.45, -3);
		this.controls.enableRotate = false;
		this.controls.update();

		this.controls.maxDistance = Infinity;
		this.controls.minDistance = 0;

		gsap.to(this.camera.position, {
			duration: 2,
			x: .85,
			z: -1,
			onUpdate: () => {
				this.controls.target.set(0, 1.45, 0);
				this.controls.update();
			},
			onComplete: () => {
				this.controls.enableRotate = true;
				this.controls.maxDistance = 10;
				this.controls.minDistance = 0;
				this.controls.maxPolarAngle = 2.1;
				this.controls.minPolarAngle = .65;
			}
		});
	}

	protected buildUI(): void {
		//this.stats.showPanel(1)
		//this.mainElement.appendChild(this.stats.dom);

		this.addPoints();
		this.updateVRControlsPosition();

		UDom.AC(this.mainElement, this.canvas);
	}

	private addPoints(): void {
		this.addAboutMePoint();
		this.addContactPoint();
		//this.addEducationPoint();
		//this.addExperiencePoint();
		//this.addSkillsPoint();
		this.addProjectsPoint();

		this.points.forEach((point) => {
			const text = point.element.getElementsByClassName("text")[0];
			if (text instanceof HTMLElement) {
				point.element.addEventListener("mouseover", () => text.style.display = "block");
				point.element.addEventListener("mouseout", () => text.style.display = "none");
			}

			this.mainElement.appendChild(point.element);
		});
	}

	private addAboutMePoint(): void {
		const pointWrapperElement = UDom.div({ className: OFFICE_CSS.POINT_WRAPPER });
		const pointElement = UDom.div({ className: OFFICE_CSS.POINT });
		const icon = UIcon.getIcon(Icons.IconAboutMe, { className: OFFICE_CSS.ICON });
		const text = UDom.div({
			className: "text text--about",
			innerText: Translator.T(Translation.ABOUT_ME)
		});

		UDom.AC(pointWrapperElement, UDom.AC(pointElement, icon), text);

		Cursor.subscribeElementToDetectHover(pointWrapperElement);

		const point = this.points.get("about");
		if (point) {
			point.element = pointWrapperElement;
		} else {
			this.points.set("about", {
				offset: new THREE.Vector3(0, 0, 0),
				position: undefined,
				element: pointWrapperElement
			});
		}

		let modal: Modal;
		pointWrapperElement.addEventListener("pointerdown", () => {
			if (!modal) {
				modal = new Modal(Modal_TYPE.MEDIUM, pointWrapperElement, UIcon.getIcon(Icons.IconAboutMe), Translator.T(Translation.ABOUT_ME), undefined, true, true, true);
				const modalComponent = new AboutMe(modal.getMainElement(), true);
				modal.setContent(modalComponent.getMainElement());
				modal.onClose(() => this.moveToDefaultPosition());
			}

			const point = this.points.get("about");
			if (point && point.position) {
				gsap.to(this.controls.target, {
					duration: 1.5,
					x: point.position.x,
					y: point.position.y,
					z: point.position.z,
					onUpdate: () => {
						this.controls.update();
					}
				});

				modal.open();
			}
		});
	}

	private addContactPoint(): void {
		const pointWrapperElement = UDom.div({ className: OFFICE_CSS.POINT_WRAPPER });
		const pointElement = UDom.div({ className: OFFICE_CSS.POINT });
		const icon = UIcon.getIcon(Icons.IconTelephoneFill, { className: OFFICE_CSS.ICON });
		const text = UDom.div({
			className: "text text--contact",
			innerText: Translator.T(Translation.CONTACT)
		});

		UDom.AC(pointWrapperElement, UDom.AC(pointElement, icon), text);

		Cursor.subscribeElementToDetectHover(pointWrapperElement);

		const point = this.points.get("contact");
		if (point) {
			point.element = pointWrapperElement
		} else {
			this.points.set("contact", {
				offset: new THREE.Vector3(0, 0, 0),
				position: undefined,
				element: pointWrapperElement
			});
		}

		let modal: Modal;
		pointWrapperElement.addEventListener("pointerdown", () => {
			if (!modal) {
				modal = new Modal(Modal_TYPE.SMALL, pointWrapperElement, UIcon.getIcon(Icons.IconTelephoneFill), Translator.T(Translation.CONTACT_ME), undefined, false, true, true);
				const modalComponent = new Contact(modal.getMainElement(), true);
				modal.setContent(modalComponent.getMainElement());
				modal.onClose(() => this.moveToDefaultPosition());
			}

			const point = this.points.get("contact");
			if (point && point.position) {
				gsap.to(this.controls.target, {
					duration: 1.5,
					x: point.position.x,
					y: point.position.y,
					z: point.position.z,
					onUpdate: () => {
						this.controls.update();
					}
				});

				modal.open();
			}
		});
	}

	private addEducationPoint(): void {
		const pointWrapperElement = UDom.div({ className: OFFICE_CSS.POINT_WRAPPER });
		const pointElement = UDom.div({ className: OFFICE_CSS.POINT });
		const icon = UIcon.getIcon(Icons.IconGraduationCap, { className: OFFICE_CSS.ICON });
		const text = UDom.div({
			className: "text text--education",
			innerText: Translator.T(Translation.EDUCATION)
		});

		UDom.AC(pointWrapperElement, UDom.AC(pointElement, icon), text);

		Cursor.subscribeElementToDetectHover(pointWrapperElement);

		const point = this.points.get("education");
		if (point) {
			point.element = pointWrapperElement;
		} else {
			this.points.set("education", {
				offset: new THREE.Vector3(0, 0, 0),
				position: undefined,
				element: pointWrapperElement
			});
		}

		let modal: Modal;
		pointWrapperElement.addEventListener("pointerdown", () => {
			if (!modal) {
				modal = new Modal(Modal_TYPE.MEDIUM, pointWrapperElement, UIcon.getIcon(Icons.IconGraduationCap), Translator.T(Translation.EDUCATION), undefined, false, true, true);
				const modalComponent = new Education(modal.getMainElement(), true);
				modal.setContent(modalComponent.getMainElement());
				modal.onClose(() => this.moveToDefaultPosition());
			}

			const point = this.points.get("education");
			if (point && point.position) {
				gsap.to(this.controls.target, {
					duration: 1.5,
					x: point.position.x,
					y: point.position.y,
					z: point.position.z,
					onUpdate: () => {
						this.controls.update();
					}
				});

				modal.open();
			}
		});
	}

	private addExperiencePoint(): void {
		const pointWrapperElement = UDom.div({ className: OFFICE_CSS.POINT_WRAPPER });
		const pointElement = UDom.div({ className: OFFICE_CSS.POINT });
		const icon = UIcon.getIcon(Icons.IconUserGraduate, { className: OFFICE_CSS.ICON });
		const text = UDom.div({
			className: "text text--experience",
			innerText: Translator.T(Translation.EXPERIENCE)
		});

		UDom.AC(pointWrapperElement, UDom.AC(pointElement, icon), text);

		Cursor.subscribeElementToDetectHover(pointWrapperElement);

		const point = this.points.get("experience");
		if (point) {
			point.element = pointWrapperElement;
		} else {
			this.points.set("experience", {
				offset: new THREE.Vector3(0, 0, 0),
				position: undefined,
				element: pointWrapperElement
			});
		}

		let modal: Modal;
		pointWrapperElement.addEventListener("pointerdown", () => {
			if (!modal) {
				modal = new Modal(Modal_TYPE.MEDIUM, pointWrapperElement, UIcon.getIcon(Icons.IconUserGraduate), Translator.T(Translation.EXPERIENCE), undefined, false, true, true);
				const modalComponent = new Experience(modal.getMainElement(), true);
				modal.setContent(modalComponent.getMainElement());
				modal.onClose(() => this.moveToDefaultPosition());
			}

			const point = this.points.get("experience");
			if (point && point.position) {
				gsap.to(this.controls.target, {
					duration: 1.5,
					x: point.position.x,
					y: point.position.y,
					z: point.position.z,
					onUpdate: () => {
						this.controls.update();
					}
				});

				modal.open();
			}
		});
	}

	private addProjectsPoint(): void {
		const pointWrapperElement = UDom.div({ className: OFFICE_CSS.POINT_WRAPPER });
		const pointElement = UDom.div({ className: OFFICE_CSS.POINT });
		const icon = UIcon.getIcon(Icons.IconHeart, { className: OFFICE_CSS.ICON });
		const text = UDom.div({
			className: "text text--projects",
			innerText: Translator.T(Translation.PROJECTS)
		});

		UDom.AC(pointWrapperElement, UDom.AC(pointElement, icon), text);

		Cursor.subscribeElementToDetectHover(pointWrapperElement);

		const point = this.points.get("projects");
		if (point) {
			point.element = pointWrapperElement
		} else {
			this.points.set("projects", {
				offset: new THREE.Vector3(0, 0, 0),
				position: undefined,
				element: pointWrapperElement
			});
		}

		let modal: Modal;
		pointWrapperElement.addEventListener("pointerdown", () => {
			window.open(Vars.CODE_LAB_URL, "_blank");

			/*
			if (!modal) {
				modal = new Modal(Modal_TYPE.SMALL, pointWrapperElement, UIcon.getIcon(Icons.IconHeart), Translator.T(Translation.PROJECTS), undefined, true, true, true);
				const modalComponent = new Projects(modal.getMainElement());
				modalComponent.setMenuParent(<HTMLElement>modal.getFooter());
				modalComponent.init();
				modal.setContent(modalComponent.getMainElement());
				modal.onClose(() => this.moveToDefaultPosition());
			}

			const point = this.points.get("projects");
			if (point && point.position) {
				gsap.to(this.controls.target, {
					duration: 1.5,
					x: point.position.x,
					y: point.position.y,
					z: point.position.z,
					onUpdate: () => {
						this.controls.update();
					}
				});

				modal.open();
			}
			 */
		});
	}

	private addSkillsPoint(): void {
		const pointWrapperElement = UDom.div({ className: OFFICE_CSS.POINT_WRAPPER });
		const pointElement = UDom.div({ className: OFFICE_CSS.POINT });
		const icon = UIcon.getIcon(Icons.IconSkills, { className: OFFICE_CSS.ICON });
		const text = UDom.div({
			className: "text text--skills",
			innerText: Translator.T(Translation.SKILLS)
		});
		UDom.AC(pointWrapperElement, UDom.AC(pointElement, icon), text);

		Cursor.subscribeElementToDetectHover(pointWrapperElement);

		const point = this.points.get("skills");
		if (point) {
			point.element = pointWrapperElement;
		} else {
			this.points.set("skills", {
				offset: new THREE.Vector3(0, 0, 0),
				position: undefined,
				element: pointWrapperElement
			});
		}

		let modal: Modal;
		pointWrapperElement.addEventListener("pointerdown", () => {
			if (!modal) {
				modal = new Modal(Modal_TYPE.MEDIUM, pointWrapperElement, UIcon.getIcon(Icons.IconSkills), Translator.T(Translation.SKILLS), undefined, true, true, true);
				const modalComponent = new Skills(modal.getMainElement());
				modalComponent.setMenuParent(<HTMLElement>modal.getFooter());
				modalComponent.init();
				modal.setContent(modalComponent.getMainElement());
				modal.onClose(() => this.moveToDefaultPosition());
			}

			const point = this.points.get("skills");
			if (point && point.position) {
				gsap.to(this.controls.target, {
					duration: 1.5,
					x: point.position.x,
					y: point.position.y,
					z: point.position.z,
					onUpdate: () => {
						this.controls.update();
					}
				});

				modal.open();
			}
		});
	}

	private loadResources(): void {
		if (this.resourcesLoaded) {
			return;
		}

		const bakedTextureDark = this.textureLoader.load(Vars.PATH.STUDIO_DARK_TEXTURE);
		bakedTextureDark.flipY = false;
		bakedTextureDark.encoding = THREE.sRGBEncoding;

		const bakedTextureLight = this.textureLoader.load(Vars.PATH.STUDIO_LIGHT_TEXTURE);
		bakedTextureLight.flipY = false;
		bakedTextureLight.encoding = THREE.sRGBEncoding;

		const gltfPromise = new Promise<void>(async (resolve) => {
			this.gltfLoader.load(Vars.PATH.STUDIO_GLB, (gltf) => {
				this.gltfSceneDark = gltf.scene;
				this.gltfSceneLight = gltf.scene.clone(true);

				for (let i = 0; i < 2; i++) {
					let scene;
					let bakedMaterial;

					if (i == 0) {
						scene = this.gltfSceneDark;
						bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTextureDark /*, color: 0xff0000 */ })
					} else {
						scene = this.gltfSceneLight;
						bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTextureLight /*, color: 0xff0000 */ })
					}

					scene.traverse(async (child: any) => {
						const name = child.name.trim().toLowerCase();
						switch (name) {
							case "about":
							case "contact":
							case "education":
							case "experience":
							case "projects":
							case "skills":
								const point = this.points.get(name);
								if (point) {
									point.position = new THREE.Vector3(
										child.position.x + point.offset.x,
										child.position.y + point.offset.y,
										child.position.z + point.offset.z
									);
								}
								break;
							case "windows":
								child.material = new THREE.MeshBasicMaterial({
									opacity: 0.12,
									color: "#818181",
									transparent: true,
									side: THREE.DoubleSide,
									depthWrite: false
								});
								break;
							case "outside":
								const outsideTexture = new THREE.TextureLoader().load(Vars.PATH.OUTSIDE_CITY);
								outsideTexture.flipY = false;
								//outsideTexture.minFilter = THREE.LinearFilter;
								//outsideTexture.magFilter = THREE.LinearFilter;
								outsideTexture.wrapS = THREE.RepeatWrapping;
								outsideTexture.wrapT = THREE.RepeatWrapping;
								child.material = new THREE.MeshBasicMaterial({ map: outsideTexture });
								break;
							case "table_1_glass":
							case "table_2_glass":
								child.material = new THREE.MeshBasicMaterial({
									opacity: (i == 0) ? 0.1 : 0.21,
									color: "#818181",
									transparent: true,
									side: THREE.DoubleSide,
									depthWrite: false
								});
								break;
							case "cactus":
								child.material = new THREE.MeshBasicMaterial({ color: "#bcf1c0" });
								break;
							case "circle":
								child.material = new THREE.MeshBasicMaterial({ color: "#2efc34" });
								break;
							case "triangle":
								child.material = new THREE.MeshBasicMaterial({ color: "#f8a724" });
								break;
							case "square":
								child.material = new THREE.MeshBasicMaterial({ color: "#dc27fd" });
								break;
							case "cross":
								child.material = new THREE.MeshBasicMaterial({ color: "#1d49fa" });
								break;
							case "pacman_yellow":
								child.material = new THREE.MeshBasicMaterial({ color: "#F9FE3E" });
								break;
							case "pacman_white":
								child.material = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
								break;
							case "pacman_green":
								child.material = new THREE.MeshBasicMaterial({ color: "#28FE22" });
								break;
							case "pacman_blue":
								child.material = new THREE.MeshBasicMaterial({ color: "#243AFE" });
								break;
							default:
								if (name.startsWith("led")) {
									child.material = new THREE.MeshBasicMaterial({ color: "#544db4" });
								} else {
									child.material = bakedMaterial;
								}
						}

						if (child instanceof THREE.Mesh) {
							child.castShadow = true;
							child.receiveShadow = true;
						}
					});

					this.scene.add(Vars.IS_DARK_MODE ? this.gltfSceneDark : this.gltfSceneLight);
				}

				resolve();
			});
		});

		this.resourcesLoaded = true;
	}

	private moveToDefaultPosition(): void {
		this.controls.enableRotate = false;
		gsap.to(this.controls.target, {
			duration: 1,
			x: this.defaultControlsPosition.x,
			y: this.defaultControlsPosition.y,
			z: this.defaultControlsPosition.z,
			onUpdate: () => {
				this.controls.update();
			},
			onComplete: () => {
				this.controls.enableRotate = true;
			}
		});
	}

	private animate(): void {
		if (Vars.CURRENT_VIEW !== VIEWS.OFFICE) {
			return;
		}

		this.controls.update();

		//if (this.stats) {
		//	this.stats.begin();
		//}

		this.points.forEach((point) => {
			if (point.position) {
				const screenPosition = point.position.clone();
				screenPosition.project(this.camera);

				const translateX = screenPosition.x * this.dimension.w * 0.5;
				const translateY = -screenPosition.y * this.dimension.h * 0.5;
				point.element.style.transform = `translateX(${ translateX }px) translateY(${ translateY }px)`;

				const distanceToCamera = point.position.distanceTo(this.camera.position);
				this.frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse));
				if (this.frustum.containsPoint(point.position) && distanceToCamera > 0) {
					point.element.style.display = "block";
				} else {
					point.element.style.display = "none";
				}
			}
		});

		this.effectComposer.render();

		//if (this.stats) {
		//	this.stats.end();
		//}
	}

}
