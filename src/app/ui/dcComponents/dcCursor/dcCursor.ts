import "./dcCursor.css";

import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";

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
		element.addEventListener("mouseover", () => dcCursor.cursorInner.classList.add(CURSOR_CSS.CURSOR_HOVER));
		element.addEventListener("mouseout", () => dcCursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_HOVER));
	}
	
	public static subscribeElementsToDetectHover(elements: HTMLElement[]): void {
		elements.forEach((e) => dcCursor.subscribeElementToDetectHover(e));
	}
	
	private subscribeToEventListeners(): void {
		globalThis.addEventListener("mousemove", (e) => {
			e.preventDefault();
			this.cursor.style.transform = `translate3d(calc(${ e.clientX }px - 50%), calc(${ e.clientY }px - 50%), 0)`;
			dcCursor.cursorInner.style.left = e.clientX + "px";
			dcCursor.cursorInner.style.top = e.clientY + "px";
		});
		
		globalThis.addEventListener("mouseenter", () => {
			dcCursor.cursorInner.classList.add(CURSOR_CSS.CURSOR_HOVER);
		});
		
		globalThis.addEventListener("pointerdown", () => {
			dcCursor.cursorInner.classList.add(CURSOR_CSS.CURSOR_INNER_HOVER);
		});
		
		globalThis.addEventListener("pointerup", () => {
			dcCursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_HOVER);
			dcCursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_INNER_HOVER);
		});
		
		globalThis.addEventListener("mouseout", () => {
			dcCursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_HOVER);
			dcCursor.cursorInner.classList.remove(CURSOR_CSS.CURSOR_INNER_HOVER);
		});
	}
	
}
