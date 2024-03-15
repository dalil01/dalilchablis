import "./Modal.css";

import { Component } from "../Component";
import { UDom } from "../../../utils/UDom";
import { Vars } from "../../../../Vars";
import { UIcon } from "../../../utils/UIcon";
import { Icons } from "../../../icons/Icons";
import { Cursor } from "../Cursor/Cursor";
import { GLOBAL_CSS } from "../../../Experience";

export enum Modal_TYPE {
	SMALL,
	MEDIUM,
	LARGE
}

enum Modal_CSS {
	LIGHT = "modal-light",
	DARK = "modal-dark",
	BACKGROUND = "modal-background",
	CONTAINER = "modal",
	SMALL = "modal-small",
	MEDIUM = "modal-medium",
	LARGE = "modal-large",
	HEADER = "modal-header",
	CLOSE_BTN = "modal-close-btn",
	TITLE = "modal-title",
	BODY = "modal-body",
	FOOTER = "modal-footer",
	ZOOM_IN = "modal-zoom-in",
	ZOOM_OUT = "modal-zoom-out"
}

export class Modal extends Component {

	private readonly type: Modal_TYPE;
	private readonly button: HTMLElement;
	private readonly icon: HTMLElement;
	private readonly title: string;
	private readonly modal: HTMLElement;
	private modalBody!: HTMLElement;
	private content: HTMLElement | undefined;
	private readonly withFooter: boolean;
	private readonly closeWhenClickOutside: boolean;
	
	private isOpen: boolean;

	private canSelect: boolean = false;

	private footer!: HTMLElement;

	private onCloseCallback: Function = () => {};
	
	constructor(type: Modal_TYPE, button: HTMLElement, icon: HTMLElement, title: string, content: HTMLElement | undefined = undefined, withFooter: boolean = false, closeWhenClickOutside: boolean = true, autoInit: boolean = false) {
		super(document.body, UDom.CCE("modal-background", { className: Modal_CSS.BACKGROUND + ' ' + GLOBAL_CSS.DISPLAY_NONE }));

		this.type = type;
		this.button = button;
		this.icon = icon;
		this.title = title;
		this.content = content;
		this.modal = UDom.CCE("modal", { className: Modal_CSS.CONTAINER });
		switch (this.type) {
			case Modal_TYPE.SMALL:
				this.modal.classList.add(Modal_CSS.SMALL);
				break;
			case Modal_TYPE.LARGE:
				this.modal.classList.add(Modal_CSS.LARGE);
				break;
			case Modal_TYPE.MEDIUM:
			default:
				this.modal.classList.add(Modal_CSS.MEDIUM)
		}
		this.withFooter = withFooter;
		this.closeWhenClickOutside = closeWhenClickOutside;
		
		this.isOpen = false;
		
		if (autoInit)
			this.init();
	}

	public getFooter(): undefined | HTMLElement {
		return this.footer;
	}

	public setContent(content: HTMLElement): void {
		this.content = content;
		this.modalBody.appendChild(this.content);
	}

	public onClose(callback: Function): void {
		this.onCloseCallback = callback;
	}
	
	public buildUI(): void {
		this.mainElement.classList.add(Vars.IS_DARK_MODE ? Modal_CSS.DARK : Modal_CSS.LIGHT);
		
		const header = UDom.header({ className: Modal_CSS.HEADER });
		const h2 = UDom.h2({ className: Modal_CSS.TITLE });
		
		h2.appendChild(this.icon);
		h2.appendChild(UDom.span({ innerText: this.title }));
		
		header.appendChild(h2);
		
		const closeIcon = UIcon.getIcon(Icons.DcIconCloseCircle, { className: Modal_CSS.CLOSE_BTN });
		closeIcon.addEventListener("click", () => this.close());
		Cursor.subscribeElementToDetectHover(closeIcon);
		header.appendChild(closeIcon);
		
		this.modalBody = UDom.main({ className: Modal_CSS.BODY });
		
		this.footer = UDom.footer({ className: Modal_CSS.FOOTER });
		
		UDom.AC(this.modal, header, this.modalBody);
		
		if (this.content) {
			this.modalBody.appendChild(this.content);
		}
		
		if (this.withFooter) {
			this.modal.appendChild(this.footer);
		}
		
		if (this.closeWhenClickOutside) {
			this.mainElement.addEventListener("click", (e) => {
				if (e.target == this.mainElement) {
					this.close();
				}
			});
		}
		
		this.mainElement.appendChild(this.modal);
		
		this.button.addEventListener("click", () => this.open());

		this.mainElement.addEventListener("selectstart", (e) => {
			if (!this.canSelect) {
				e.preventDefault();
			}
		});

		this.mainElement.addEventListener("pointerup", () => this.canSelect = true);
	}
	
	public open(): void {
		this.canSelect = false;
		this.mainElement.classList.remove(GLOBAL_CSS.DISPLAY_NONE);
		this.modal.classList.remove(Modal_CSS.ZOOM_OUT);
		this.modal.classList.add(Modal_CSS.ZOOM_IN);
		this.isOpen = Vars.MODAL_IS_OPEN = true;
	}
	
	public close(): void {
		this.modal.classList.remove(Modal_CSS.ZOOM_IN);
		this.modal.classList.add(Modal_CSS.ZOOM_OUT);
		setTimeout(() => {
			this.mainElement.classList.add(GLOBAL_CSS.DISPLAY_NONE);
		}, 200);
		this.isOpen = Vars.MODAL_IS_OPEN = false;
		this.onCloseCallback();
	}
	
	public toggle(): void {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}
	
}
