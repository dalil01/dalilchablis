import "./dcCursor.css";

import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";
import { dcGlobalConfig } from "../../../global/dcGlobalConfig";
import { VIEWS } from "../../../global/dcGlobalEnums";

enum CURSOR_CSS {
	CONTAINER = "cursor-container",
	CURSOR = "cursor",
	CURSOR_HOVER = "cursor-hover",
	CURSOR_INNER = "cursor-inner",
	CURSOR_INNER_HOVER = "cursor-inner-hover"
}

export class dcCursor extends dcComponent {

	private readonly cursor: HTMLDivElement;
	private static cursorInner: HTMLDivElement;

	private static minScreenSize: number = 1024;

	public static mouseOverDetectedElem: boolean = false;

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("cursor", { className: CURSOR_CSS.CONTAINER }));

		this.cursor = _UDom.div({ className: CURSOR_CSS.CURSOR });
		dcCursor.cursorInner = _UDom.div({ className: CURSOR_CSS.CURSOR_INNER });

		if (autoInit)
			this.init();
	}

	public buildUI(): void {
		this.subscribeToEventListeners();
		_UDom.AC(this.getMainElement(), this.cursor, dcCursor.cursorInner);
	}

	public static subscribeElementToDetectHover(element: HTMLElement): void {
		element.addEventListener("mouseover", () => {
			if (globalThis.innerWidth < dcCursor.minScreenSize) {
				document.body.style.cursor = "pointer";
			}

			dcCursor.cursorInner.classList.add(CURSOR_CSS.CURSOR_HOVER);
			dcCursor.mouseOverDetectedElem = true;
		});

		element.addEventListener("mouseout", () => {
			if (globalThis.innerWidth < dcCursor.minScreenSize) {
				document.body.style.cursor = "auto";
			}

			dcCursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_HOVER);
			dcCursor.mouseOverDetectedElem = false;
		});
	}

	public static subscribeElementsToDetectHover(elements: HTMLElement[]): void {
		elements.forEach((e) => dcCursor.subscribeElementToDetectHover(e));
	}

	private subscribeToEventListeners(): void {
		globalThis.addEventListener("mousemove", (e) => {
			if (!dcGlobalConfig.modalIsOpen) {
				e.preventDefault();
			}

			window.requestAnimationFrame(() => {
				if (!dcCursor.mouseOverDetectedElem && globalThis.innerWidth < dcCursor.minScreenSize && dcGlobalConfig.currentView == VIEWS.OFFICE && document.body.style.cursor != "grabbing") {
					document.body.style.cursor = (dcGlobalConfig.modalIsOpen) ? "auto" : "grab";
				}

				this.cursor.style.transform = `translate3d(calc(${ e.clientX }px - 50%), calc(${ e.clientY }px - 50%), 0)`;
				dcCursor.cursorInner.style.left = e.clientX + "px";
				dcCursor.cursorInner.style.top = e.clientY + "px";
			})
		});

		globalThis.addEventListener("mouseenter", () => {
			dcCursor.cursorInner.classList.add(CURSOR_CSS.CURSOR_HOVER);
		});

		globalThis.addEventListener("pointerdown", () => {
			if (!dcCursor.mouseOverDetectedElem && dcGlobalConfig.currentView == VIEWS.OFFICE && globalThis.innerWidth < dcCursor.minScreenSize) {
				document.body.style.cursor = (dcGlobalConfig.modalIsOpen) ? "auto" : "grabbing";
			}

			dcCursor.cursorInner.classList.add(CURSOR_CSS.CURSOR_INNER_HOVER);
		});

		globalThis.addEventListener("pointerup", () => {
			if (!dcCursor.mouseOverDetectedElem && dcGlobalConfig.currentView == VIEWS.OFFICE && globalThis.innerWidth < dcCursor.minScreenSize) {
				document.body.style.cursor = "grab";
			}

			if (dcGlobalConfig.modalIsOpen) {
				document.body.style.cursor = "auto";
			}

			dcCursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_HOVER);
			dcCursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_INNER_HOVER);
		});

		globalThis.addEventListener("mouseout", () => {
			dcCursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_HOVER);
			dcCursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_INNER_HOVER);
		});
	}

}
