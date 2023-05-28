import "./dcModal.css";

import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";
import { GLOBAL_CSS } from "../../../global/dcGlobalEnums";
import { dcGlobalConfig } from "../../../global/dcGlobalConfig";
import { _UIcon } from "../../dcUtils/_UIcon";
import { DcIcons } from "../../dcIcons/dcIcons";
import { dcCursor } from "../dcCursor/dcCursor";

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

export class dcModal extends dcComponent {

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

	private onCloseCallback: Function = () => {};
	
	constructor(type: Modal_TYPE, button: HTMLElement, icon: HTMLElement, title: string, content: HTMLElement | undefined = undefined, withFooter: boolean = false, closeWhenClickOutside: boolean = true, autoInit: boolean = false) {
		super(document.body, _UDom.CCE("modal-background", { className: Modal_CSS.BACKGROUND + ' ' + GLOBAL_CSS.DISPLAY_NONE }));

		this.type = type;
		this.button = button;
		this.icon = icon;
		this.title = title;
		this.content = content;
		this.modal = _UDom.CCE("modal", { className: Modal_CSS.CONTAINER });
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
	
	public setContent(content: HTMLElement): void {
		this.content = content;
		this.modalBody.appendChild(this.content);
	}

	public onClose(callback: Function): void {
		this.onCloseCallback = callback;
	}
	
	public buildUI(): void {
		this.mainElement.classList.add(dcGlobalConfig.isDarkMode ? Modal_CSS.DARK : Modal_CSS.LIGHT);
		
		const header = _UDom.header({ className: Modal_CSS.HEADER });
		const h2 = _UDom.h2({ className: Modal_CSS.TITLE });
		
		h2.appendChild(this.icon);
		h2.appendChild(_UDom.span({ innerText: this.title }));
		
		header.appendChild(h2);
		
		const closeIcon = _UIcon.getIcon(DcIcons.DcIconCloseCircle, { className: Modal_CSS.CLOSE_BTN });
		closeIcon.addEventListener("click", () => this.close());
		dcCursor.subscribeElementToDetectHover(closeIcon);
		header.appendChild(closeIcon);
		
		this.modalBody = _UDom.main({ className: Modal_CSS.BODY });
		
		const footer = _UDom.footer({ className: Modal_CSS.FOOTER });
		
		_UDom.AC(this.modal, header, this.modalBody);
		
		if (this.content) {
			this.modalBody.appendChild(this.content);
		}
		
		if (this.withFooter) {
			this.modal.appendChild(footer);
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
	}
	
	public open(): void {
		this.mainElement.classList.remove(GLOBAL_CSS.DISPLAY_NONE);
		this.modal.classList.remove(Modal_CSS.ZOOM_OUT);
		this.modal.classList.add(Modal_CSS.ZOOM_IN);
		this.isOpen = true;
	}
	
	public close(): void {
		this.modal.classList.remove(Modal_CSS.ZOOM_IN);
		this.modal.classList.add(Modal_CSS.ZOOM_OUT);
		setTimeout(() => {
			this.mainElement.classList.add(GLOBAL_CSS.DISPLAY_NONE);
		}, 300);
		this.isOpen = false;
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
