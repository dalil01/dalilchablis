import "./dcPopup.css";

import {dcComponent} from "../dcComponent";
import {_UDom} from "../../dcUtils/_UDom";
import {GLOBAL_CSS_CLASSNAMES} from "../../../global/dcGlobalEnums";
import {dcGlobalConfig} from "../../../global/dcGlobalConfig";
import {_UIcon} from "../../dcUtils/_UIcon";
import {DcIcons} from "../../dcIcons/dcIcons";
import {dcCursor} from "../dcCursor/dcCursor";

enum POPUP_CSS_CLASSNAMES {
	LIGHT = "popup-light",
	DARK = "popup-dark",
	BACKGROUND = "popup-background",
	CONTAINER = "popup",
	HEADER = "popup-header",
	BODY = "popup-body",
	FOOTER = "popup-footer"
}

export class dcPopup extends dcComponent {

	private readonly button: HTMLElement;
	private readonly icon: HTMLElement;
	private readonly title: string;
	private readonly popup: HTMLElement;
	private readonly content: HTMLElement;
	private readonly withFooter: boolean;
	private readonly closeWhenClickOutside: boolean;

	constructor(button: HTMLElement, icon: HTMLElement, title: string, content: HTMLElement, withFooter: boolean = false, closeWhenClickOutside: boolean = true, autoInit: boolean = false) {
		super(document.body, _UDom.CCE("popup-background", { className: POPUP_CSS_CLASSNAMES.BACKGROUND + ' ' /*+ GLOBAL_CSS_CLASSNAMES.DISPLAY_NONE */ }));

		this.button = button;
		this.icon = icon;
		this.title = title;
		this.content = content;
		this.popup = _UDom.CCE("popup", { className: POPUP_CSS_CLASSNAMES.CONTAINER });
		this.withFooter = withFooter;
		this.closeWhenClickOutside = closeWhenClickOutside;

		if (autoInit)
			this.init();
	}

	public close(): void {
		this.getMainElement().classList.add(GLOBAL_CSS_CLASSNAMES.DISPLAY_NONE);
		this.popup.classList.add(GLOBAL_CSS_CLASSNAMES.DISPLAY_NONE);
	}

	protected buildUI(): void {
		this.getMainElement().classList.add(dcGlobalConfig.isDarkMode ? POPUP_CSS_CLASSNAMES.DARK : POPUP_CSS_CLASSNAMES.LIGHT );

		const header = _UDom.CE("header", { className: POPUP_CSS_CLASSNAMES.HEADER });
		const h2 = _UDom.CE("h2");

		h2.appendChild(this.icon);
		h2.appendChild(_UDom.CE("span", { innerText: this.title }));

		header.appendChild(h2);

		const closeIcon = _UIcon.getIcon(DcIcons.DcIconCloseCircle);
		dcCursor.subscribeElementToDetectHover(closeIcon);
		header.appendChild(closeIcon);

		const main = _UDom.CE("main", { className: POPUP_CSS_CLASSNAMES.BODY });

		const footer = _UDom.CE("footer", { className: POPUP_CSS_CLASSNAMES.FOOTER });

		_UDom.AC(this.popup, header, main);

		main.appendChild(this.content);

		if (this.withFooter) {
			this.popup.appendChild(footer);
		}

		if (this.closeWhenClickOutside) {
			this.getMainElement().addEventListener("click", () => this.close());
		}

		[this.button, closeIcon].forEach((e) => e.addEventListener("click", () => {
			this.getMainElement().classList.toggle(GLOBAL_CSS_CLASSNAMES.DISPLAY_NONE);
			this.popup.classList.toggle(GLOBAL_CSS_CLASSNAMES.DISPLAY_NONE);
		}));

		this.getMainElement().appendChild(this.popup);
	}

}
