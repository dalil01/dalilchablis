import * as THREE from "three";

import { Dimension, office } from "./Office";
import { WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

export class officeEvent {

	private readonly office: office;

	private canvas!: HTMLCanvasElement;
	private dimension!: Dimension;
	private camera!: THREE.PerspectiveCamera;
	private renderer!: WebGLRenderer;
	private effectComposer!: EffectComposer;

	constructor(office: office) {
		this.office = office;
	}

	public init() {
		this.canvas = this.office.getCanvas();
		this.dimension = this.office.getDimension();
		this.camera = this.office.getCamera();
		this.renderer = this.office.getRenderer();
		this.effectComposer = this.office.getEffectComposer();
	}

	public subscribeToEventListeners(): void {
		globalThis.addEventListener("resize", () => this.onResize());
		globalThis.addEventListener("pointerdown", () => this.onMouseDown());
		globalThis.addEventListener("pointerup", () => this.onMouseUp());
	}

	public unSubscribeToEventListeners(): void {
		globalThis.removeEventListener("resize", this.onResize);
		globalThis.removeEventListener("pointerdown", this.onMouseDown);
		globalThis.removeEventListener("pointerup", this.onMouseUp);
	}

	private onResize(): void {
		this.updateDimension();
		this.updateCameraProperties();
		this.updateRendererProperties();
		this.updateEffectComposer();
		this.updateVRControlsPosition();
	}

	private onMouseDown(): void {
	}

	private onMouseUp(): void {
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

	private updateEffectComposer(): void {
		this.effectComposer.setSize(this.dimension.w, this.dimension.h)
	}

	private updateVRControlsPosition(): void {
		this.office.updateVRControlsPosition();
	}

}