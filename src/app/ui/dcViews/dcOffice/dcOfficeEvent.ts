import * as THREE from "three";
import {dcOffice} from "./dcOffice";
import {dcDimension} from "../../../global/dcGlobalTypes";
import {WebGLRenderer} from "three";

export class dcOfficeEvent {

    private readonly canvas: HTMLCanvasElement;
    private readonly dimension: dcDimension;
    private readonly camera: THREE.PerspectiveCamera;
    private readonly renderer: WebGLRenderer;

    constructor(office: dcOffice) {
        this.canvas = office.getCanvas();
        this.dimension = office.getDimension();
        this.camera = office.getCamera();
        this.renderer = office.getRenderer();
    }

    public subscribeToEventListeners(): void {
        globalThis.addEventListener("resize", () => this.onResize());
        globalThis.addEventListener("mousedown", () => this.onMouseDown());
        globalThis.addEventListener("mouseup", () => this.onMouseUp());
    }

    public unSubscribeToEventListeners(): void {
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

}