import "./dcModal.css";

import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";
import { GLOBAL_CSS_CLASSNAMES } from "../../../global/dcGlobalEnums";
import { dcGlobalConfig } from "../../../global/dcGlobalConfig";
import { _UIcon } from "../../dcUtils/_UIcon";
import { DcIcons } from "../../dcIcons/dcIcons";
import { dcCursor } from "../dcCursor/dcCursor";

enum Modal_CSS_CLASSNAMES {
	LIGHT = "modal-light",
	DARK = "modal-dark",
	BACKGROUND = "modal-background",
	CONTAINER = "modal",
	HEADER = "modal-header",
	TITLE = "modal-title",
	BODY = "modal-body",
	FOOTER = "modal-footer",
	ZOOM_IN = "modal-zoom-in",
	ZOOM_OUT = "modal-zoom-out"
}

export class dcModal extends dcComponent {
	
	private readonly button: HTMLElement;
	private readonly icon: HTMLElement;
	private readonly title: string;
	private readonly modal: HTMLElement;
	private modalBody!: HTMLElement;
	private content: HTMLElement | undefined;
	private readonly withFooter: boolean;
	private readonly closeWhenClickOutside: boolean;
	
	private isOpen: boolean;
	
	constructor(button: HTMLElement, icon: HTMLElement, title: string, content: HTMLElement | undefined = undefined, withFooter: boolean = false, closeWhenClickOutside: boolean = true, autoInit: boolean = false) {
		super(document.body, _UDom.CCE("modal-background", { className: Modal_CSS_CLASSNAMES.BACKGROUND + ' ' + GLOBAL_CSS_CLASSNAMES.DISPLAY_NONE }));
		
		this.button = button;
		this.icon = icon;
		this.title = title;
		this.content = content;
		this.modal = _UDom.CCE("modal", { className: Modal_CSS_CLASSNAMES.CONTAINER });
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
	
	public buildUI(): void {
		this.getMainElement().classList.add(dcGlobalConfig.isDarkMode ? Modal_CSS_CLASSNAMES.DARK : Modal_CSS_CLASSNAMES.LIGHT);
		
		const header = _UDom.header({ className: Modal_CSS_CLASSNAMES.HEADER });
		const h2 = _UDom.h2({ className: Modal_CSS_CLASSNAMES.TITLE });
		
		h2.appendChild(this.icon);
		h2.appendChild(_UDom.span({ innerText: this.title }));
		
		header.appendChild(h2);
		
		const closeIcon = _UIcon.getIcon(DcIcons.DcIconCloseCircle);
		closeIcon.addEventListener("click", () => this.close());
		dcCursor.subscribeElementToDetectHover(closeIcon);
		header.appendChild(closeIcon);
		
		this.modalBody = _UDom.main({ className: Modal_CSS_CLASSNAMES.BODY });
		
		const footer = _UDom.footer({ className: Modal_CSS_CLASSNAMES.FOOTER });
		
		_UDom.AC(this.modal, header, this.modalBody);
		
		if (this.content) {
			this.modalBody.appendChild(this.content);
		}
		
		if (this.withFooter) {
			this.modal.appendChild(footer);
		}
		
		if (this.closeWhenClickOutside) {
			this.getMainElement().addEventListener("click", (e) => {
				if (e.target == this.getMainElement())
					this.close();
			});
		}
		
		this.getMainElement().appendChild(this.modal);
		
		this.button.addEventListener("click", () => this.open());
	}
	
	public open(): void {
		this.getMainElement().classList.remove(GLOBAL_CSS_CLASSNAMES.DISPLAY_NONE);
		this.modal.classList.remove(Modal_CSS_CLASSNAMES.ZOOM_OUT);
		this.modal.classList.add(Modal_CSS_CLASSNAMES.ZOOM_IN);
		this.isOpen = true;
	}
	
	public close(): void {
		this.modal.classList.remove(Modal_CSS_CLASSNAMES.ZOOM_IN);
		this.modal.classList.add(Modal_CSS_CLASSNAMES.ZOOM_OUT);
		setTimeout(() => {
			this.getMainElement().classList.add(GLOBAL_CSS_CLASSNAMES.DISPLAY_NONE);
		}, 300);
		this.isOpen = false;
	}
	
	public toggle(): void {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}
	
}
