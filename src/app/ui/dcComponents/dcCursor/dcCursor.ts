import "./dcCursor.css";

import {dcComponent} from "../dcComponent";
import {_UDom} from "../../dcUtils/_UDom";

enum CURSOR_CSS_CLASSNAMES {
	CONTAINER = "cursor-container",
	CURSOR = "cursor",
	CURSOR_HOVER = "cursor-hover",
	CURSOR_INNER = "cursor-inner",
	CURSOR_INNER_HOVER = "cursor-inner-hover",
}

export class dcCursor extends dcComponent {

	private readonly cursor: HTMLDivElement;
	private static cursorInner: HTMLDivElement;

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("cursor", {  className: CURSOR_CSS_CLASSNAMES.CONTAINER }));

		this.cursor = _UDom.CE("div", { className: CURSOR_CSS_CLASSNAMES.CURSOR });
		dcCursor.cursorInner = _UDom.CE("div", { className: CURSOR_CSS_CLASSNAMES.CURSOR_INNER });

		if (autoInit)
			this.init();
	}

	public buildUI(): void {
		this.subscribeToEventListeners();
		_UDom.AC(this.getMainElement(), this.cursor, dcCursor.cursorInner);
	}

	public static subscribeElementToDetectHover(element: HTMLElement): void {
		element.addEventListener("mouseover", () => dcCursor.cursorInner.classList.add(CURSOR_CSS_CLASSNAMES.CURSOR_HOVER))
		element.addEventListener("mouseleave", () => dcCursor.cursorInner.classList.remove(CURSOR_CSS_CLASSNAMES.CURSOR_HOVER))
	}

	private subscribeToEventListeners(): void {
		globalThis.addEventListener("mousemove", (e) => {
			this.cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
			dcCursor.cursorInner.style.left = e.clientX + "px";
			dcCursor.cursorInner.style.top = e.clientY + "px";
		});

		globalThis.addEventListener("mousedown", () => {
			dcCursor.cursorInner.classList.add(CURSOR_CSS_CLASSNAMES.CURSOR_INNER_HOVER);
		});

		globalThis.addEventListener("mouseup", () => {
			dcCursor.cursorInner.classList.remove(CURSOR_CSS_CLASSNAMES.CURSOR_INNER_HOVER);
		});
	}

}
