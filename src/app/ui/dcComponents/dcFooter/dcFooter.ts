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
import {dcSound} from "../dcSound/dcSound";

enum FOOTER_CSS_CLASSNAMES {
	LIGHT = "footer-light",
	DARK = "footer-dark",
	CONTAINER = "footer-container",
	CONTACT_CONTAINER = "footer-contact-container"
}

export class dcFooter extends dcComponent {

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CE("footer", { className: FOOTER_CSS_CLASSNAMES.CONTAINER }));

		if (autoInit)
			this.init();
	}

	public buildUI(): void {
		new dcSound(this.getMainElement(), true);

		const contactContainer = _UDom.CE("div", { className: FOOTER_CSS_CLASSNAMES.CONTACT_CONTAINER });
		const contactIcon = _UIcon.getIcon(DcIcons.DcIconMail);
		const contactTitle = dcTranslator.T(dcTranslation.CONTACT);
		const contactLabel = _UDom.CE("p", { innerText: contactTitle.toUpperCase() });
		_UDom.AC(contactContainer, contactIcon, contactLabel);

		const contactModal = this.buildContactModal(contactContainer, DcIcons.DcIconMail, contactTitle);
		contactContainer.addEventListener("click", () => contactModal.toggle());

		this.getMainElement().classList.add((dcGlobalConfig.isDarkMode) ? FOOTER_CSS_CLASSNAMES.DARK : FOOTER_CSS_CLASSNAMES.LIGHT);

		dcCursor.subscribeElementToDetectHover(contactContainer);

		_UDom.AC(this.getMainElement(), contactContainer);
	}

	private buildContactModal(button: HTMLElement, iconName: DcIcons, title: string): dcModal {
		const contactModalContent = _UDom.CE("div");

		return new dcModal(button, _UIcon.getIcon(iconName), title, contactModalContent, true, true, true);
	}

}
