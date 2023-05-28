import "./dcFooter.css";

import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";
import { _UIcon } from "../../dcUtils/_UIcon";
import { DcIcons } from "../../dcIcons/dcIcons";
import { dcCursor } from "../dcCursor/dcCursor";
import { dcTranslation } from "../../dcTranslator/dcTranslation";
import { dcTranslator } from "../../dcTranslator/dcTranslator";
import { dcModal, Modal_TYPE } from "../dcModal/dcModal";
import { dcSound } from "../dcSound/dcSound";
import { dcContact } from "../dcContact/dcContact";

enum FOOTER_CSS {
	CONTAINER = "footer-container",
	CONTACT_CONTAINER = "footer-contact-container"
}

export class dcFooter extends dcComponent {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.footer({ className: FOOTER_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		new dcSound(this.mainElement, true);
		
		const contactContainer = _UDom.div({ className: FOOTER_CSS.CONTACT_CONTAINER });
		const contactIcon = _UIcon.getIcon(DcIcons.DcIconTelephoneFill);
		const contactLabel = _UDom.p({ innerText: dcTranslator.T(dcTranslation.CONTACT).toUpperCase() });
		_UDom.AC(contactContainer, contactIcon, contactLabel);
		
		this.buildContactModal(contactContainer, DcIcons.DcIconTelephoneFill, dcTranslator.T(dcTranslation.CONTACT_ME).toUpperCase());

		dcCursor.subscribeElementToDetectHover(contactContainer);
		
		_UDom.AC(this.mainElement, contactContainer);
	}
	
	private buildContactModal(button: HTMLElement, iconName: DcIcons, title: string): void {
		const contactModal = new dcModal(Modal_TYPE.SMALL, button, _UIcon.getIcon(iconName), title, undefined, true, true, true);
		const contactComponent = new dcContact(contactModal.getMainElement(), true);
		contactModal.setContent(contactComponent.getMainElement());
	}
	
}
