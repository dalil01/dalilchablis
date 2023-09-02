import "./Cursor.css";

import { component } from "../../Component";
import { UDom } from "../../../utils/UDom";
import { Vars } from "../../../../Vars";
import { VIEWS } from "../../View";

enum CURSOR_CSS {
	CONTAINER = "cursor-container",
	CURSOR = "cursor",
	CURSOR_HOVER = "cursor-hover",
	CURSOR_INNER = "cursor-inner",
	CURSOR_INNER_HOVER = "cursor-inner-hover"
}

export class Cursor extends component {

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
		element.addEventListener("mouseover", () => {
			if (globalThis.innerWidth < Cursor.minScreenSize) {
				document.body.style.cursor = "pointer";
			}

			Cursor.cursorInner.classList.add(CURSOR_CSS.CURSOR_HOVER);
			Cursor.mouseOverDetectedElem = true;
		});

		element.addEventListener("mouseout", () => {
			if (globalThis.innerWidth < Cursor.minScreenSize) {
				document.body.style.cursor = "auto";
			}

			Cursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_HOVER);
			Cursor.mouseOverDetectedElem = false;
		});
	}

	public static subscribeElementsToDetectHover(elements: HTMLElement[]): void {
		elements.forEach((e) => Cursor.subscribeElementToDetectHover(e));
	}

	private subscribeToEventListeners(): void {
		globalThis.addEventListener("mousemove", (e) => {
			if (!Vars.modalIsOpen) {
				e.preventDefault();
			}

			window.requestAnimationFrame(() => {
				if (!Cursor.mouseOverDetectedElem && globalThis.innerWidth < Cursor.minScreenSize && Vars.currentView == VIEWS.OFFICE && document.body.style.cursor != "grabbing") {
					document.body.style.cursor = (Vars.modalIsOpen) ? "auto" : "grab";
				}

				this.cursor.style.transform = `translate3d(calc(${ e.clientX }px - 50%), calc(${ e.clientY }px - 50%), 0)`;
				Cursor.cursorInner.style.left = e.clientX + "px";
				Cursor.cursorInner.style.top = e.clientY + "px";
			})
		});

		globalThis.addEventListener("mouseenter", () => {
			Cursor.cursorInner.classList.add(CURSOR_CSS.CURSOR_HOVER);
		});

		globalThis.addEventListener("pointerdown", () => {
			if (!Cursor.mouseOverDetectedElem && Vars.currentView == VIEWS.OFFICE && globalThis.innerWidth < Cursor.minScreenSize) {
				document.body.style.cursor = (Vars.modalIsOpen) ? "auto" : "grabbing";
			}

			Cursor.cursorInner.classList.add(CURSOR_CSS.CURSOR_INNER_HOVER);
		});

		globalThis.addEventListener("pointerup", () => {
			if (!Cursor.mouseOverDetectedElem && Vars.currentView == VIEWS.OFFICE && globalThis.innerWidth < Cursor.minScreenSize) {
				document.body.style.cursor = "grab";
			}

			if (Vars.modalIsOpen) {
				document.body.style.cursor = "auto";
			}

			Cursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_HOVER);
			Cursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_INNER_HOVER);
		});

		globalThis.addEventListener("mouseout", () => {
			Cursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_HOVER);
			Cursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_INNER_HOVER);
		});
	}

}
