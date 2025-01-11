import "./Cursor.css";

import { Component } from "../Component";
import { UDom } from "../../../utils/UDom";
import { Vars } from "../../../../Vars";
import { VIEWS } from "../../views/View";

enum CURSOR_CSS {
	CONTAINER = "cursor-container",
	CURSOR = "cursor",
	CURSOR_HOVER = "cursor-hover",
	CURSOR_INNER = "cursor-inner",
	CURSOR_INNER_HOVER = "cursor-inner-hover"
}

export class Cursor extends Component {

	private readonly cursor: HTMLDivElement;
	private static cursorInner: HTMLDivElement;

	private static minScreenSize: number = 1024;

	public static mouseOverDetectedElem: boolean = false;

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("cursor", { className: CURSOR_CSS.CONTAINER }));

		this.cursor = UDom.div({ className: CURSOR_CSS.CURSOR });
		Cursor.cursorInner = UDom.div({ className: CURSOR_CSS.CURSOR_INNER });

		if (autoInit)
			this.init();
	}

	public buildUI(): void {
		this.subscribeToEventListeners();
		UDom.AC(this.getMainElement(), this.cursor, Cursor.cursorInner);
	}

	public static subscribeElementToDetectHover(element: HTMLElement): void {
		element.addEventListener("mouseover", Cursor.handleHoverIn);
		element.addEventListener("mouseout", Cursor.handleHoverOut);
	}

	public static subscribeElementsToDetectHover(elements: HTMLElement[]): void {
		elements.forEach(Cursor.subscribeElementToDetectHover);
	}

	private subscribeToEventListeners(): void {
		let animationFrameId: number;

		const handleMouseMove = (e: MouseEvent) => {
			if (animationFrameId) return;

			animationFrameId = window.requestAnimationFrame(() => {
				this.updateCursorPosition(e.clientX, e.clientY);
				animationFrameId = 0;
			});
		};

		globalThis.addEventListener("mousemove", handleMouseMove);
		globalThis.addEventListener("pointerdown", Cursor.handlePointerDown);
		globalThis.addEventListener("pointerup", Cursor.handlePointerUp);
		globalThis.addEventListener("mouseenter", Cursor.handleHoverIn);
		globalThis.addEventListener("mouseout", Cursor.handleHoverOut);
	}

	private updateCursorPosition(x: number, y: number): void {
		const cursorInner = Cursor.cursorInner;
		const { minScreenSize } = Cursor;

		if (!Cursor.mouseOverDetectedElem && globalThis.innerWidth < minScreenSize && Vars.CURRENT_VIEW === VIEWS.OFFICE) {
			document.body.style.cursor = Vars.MODAL_IS_OPEN ? "auto" : "grab";
		}

		this.cursor.style.transform = `translate3d(calc(${ x }px - 50%), calc(${ y }px - 50%), 0)`;
		cursorInner.style.left = `${ x }px`;
		cursorInner.style.top = `${ y }px`;
	}

	private static handleHoverIn(): void {
		Cursor.cursorInner.classList.add(CURSOR_CSS.CURSOR_HOVER);
	}

	private static handleHoverOut(): void {
		Cursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_HOVER);
		Cursor.mouseOverDetectedElem = false;
	}

	private static handlePointerDown(): void {
		if (!Cursor.mouseOverDetectedElem && Vars.CURRENT_VIEW === VIEWS.OFFICE && globalThis.innerWidth < Cursor.minScreenSize) {
			document.body.style.cursor = Vars.MODAL_IS_OPEN ? "auto" : "grabbing";
		}

		Cursor.cursorInner.classList.add(CURSOR_CSS.CURSOR_INNER_HOVER);
	}

	private static handlePointerUp(): void {
		if (!Cursor.mouseOverDetectedElem && Vars.CURRENT_VIEW === VIEWS.OFFICE && globalThis.innerWidth < Cursor.minScreenSize) {
			document.body.style.cursor = Vars.MODAL_IS_OPEN ? "auto" : "grab";
		}

		Cursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_INNER_HOVER);
	}

}
