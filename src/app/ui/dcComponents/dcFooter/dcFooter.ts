import "./dcFooter.css";

import {dcComponent} from "../dcComponent";
import {_UDom} from "../../dcUtils/_UDom";
import {_UIcon} from "../../dcUtils/_UIcon";
import {DcIcons} from "../../dcIcons/dcIcons";
import {dcCursor} from "../dcCursor/dcCursor";
import {dcGlobalConfig} from "../../../global/dcGlobalConfig";
import {dcTranslation} from "../../dcTranslator/dcTranslation";
import {dcTranslator} from "../../dcTranslator/dcTranslator";
import {dcModal} from "../dcModal/dcModal";

enum FOOTER_CSS_CLASSNAMES {
	LIGHT = "footer-light",
	DARK = "footer-dark",
	CONTAINER = "footer-container",
	HELP_CONTAINER = "footer-help-container",
	CONTACT_CONTAINER = "footer-contact-container",
	CONTACT_CONTAINER_LIGHT = "footer-contact-container-light",
	CONTACT_CONTAINER_DARK = "footer-contact-container-dark"
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
		const helpTitle = dcTranslator.T(dcTranslation.HELP);
		helpContainer.appendChild(helpIcon);

		const helpModal = this.buildHelpModal(helpContainer, DcIcons.DcIconHelpOutline, helpTitle);
		helpContainer.addEventListener("click", () => helpModal.toggle());

		const contactContainer = _UDom.CE("div", { className: FOOTER_CSS_CLASSNAMES.CONTACT_CONTAINER });
		const contactIcon = _UIcon.getIcon(DcIcons.DcIconContact);
		const contactTitle = dcTranslator.T(dcTranslation.CONTACT);
		const contactLabel = _UDom.CE("p", { innerText: contactTitle.toUpperCase() });
		_UDom.AC(contactContainer, contactIcon, contactLabel);

		const contactModal = this.buildContactModal(contactContainer, DcIcons.DcIconContact, contactTitle);
		contactContainer.addEventListener("click", () => contactModal.toggle());

		this.getMainElement().classList.add((dcGlobalConfig.isDarkMode) ? FOOTER_CSS_CLASSNAMES.DARK : FOOTER_CSS_CLASSNAMES.LIGHT);

		dcCursor.subscribeElementToDetectHover(helpContainer);
		dcCursor.subscribeElementToDetectHover(contactContainer);

		_UDom.AC(this.getMainElement(), helpContainer, contactContainer);
	}

	private buildHelpModal(button: HTMLElement, iconName: DcIcons, title: string): dcModal {
		const helpModalContent = _UDom.CE("div");

		return new dcModal(button, _UIcon.getIcon(iconName), title, helpModalContent, true, true, true);
	}

	private buildContactModal(button: HTMLElement, iconName: DcIcons, title: string): dcModal {
		const contactModalContent = _UDom.CE("div");

		return new dcModal(button, _UIcon.getIcon(iconName), title, contactModalContent, true, true, true);
	}

}
