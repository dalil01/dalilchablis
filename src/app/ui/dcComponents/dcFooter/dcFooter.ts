import "./dcFooter.css";

import {dcComponent} from "../dcComponent";
import {_UDom} from "../../dcUtils/_UDom";
import {_UIcon} from "../../dcUtils/_UIcon";
import {DcIcons} from "../../dcIcons/dcIcons";

enum FOOTER_CSS_CLASSNAMES {
	CONTAINER = "footer-container",
	HELP_CONTAINER = "footer-help-container",
	CONTACT_CONTAINER = "footer-contact-container"
}

export class dcFooter extends dcComponent {

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CE("footer", { className: FOOTER_CSS_CLASSNAMES.CONTAINER }));

		if (autoInit)
			this.init();
	}

	public buildUI(): void {
		const helpContainer = _UDom.CE("div", { className: FOOTER_CSS_CLASSNAMES.HELP_CONTAINER });
		const helpIcon = _UIcon.getIcon(DcIcons.DcIconHelp);
		helpContainer.appendChild(helpIcon);

		const contactContainer = _UDom.CE("div", { className: FOOTER_CSS_CLASSNAMES.CONTACT_CONTAINER });
		const contactIcon = _UIcon.getIcon(DcIcons.DcIconContact);
		const contactLabel = _UDom.CE("p", { innerText: "CONTACT" });
		_UDom.AC(contactContainer, contactIcon, contactLabel);

		_UDom.AC(this.getMainElement(), helpContainer, contactContainer);
	}

}