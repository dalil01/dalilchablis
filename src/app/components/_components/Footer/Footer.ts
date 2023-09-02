import "./Footer.css";

import { component } from "../../Component";
import { UDom } from "../../../dcUtils/UDom";
import { UIcon } from "../../../dcUtils/UIcon";
import { DcIcons } from "../../../dcIcons/dcIcons";
import { dcCursor } from "../cursor/cursor";
import { translation } from "../../../translator/Translation";
import { dcTranslator } from "../../../translator/translator";
import { Modal, Modal_TYPE } from "../dcModal/Modal";
import { Sound } from "../dcSound/Sound";
import { dcContact } from "../contact/contact";

enum FOOTER_CSS {
	CONTAINER = "footer-container",
	CONTACT_CONTAINER = "footer-contact-container"
}

export class Footer extends component {

	private sound: Sound;

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.footer({ className: FOOTER_CSS.CONTAINER }));

		this.sound = new Sound(this.mainElement, true);

		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const soundMainElem = this.sound.getMainElement();
		if (!this.mainElement.contains(soundMainElem)) {
			this.mainElement.appendChild(soundMainElem);
		}

		const contactContainer = UDom.div({ className: FOOTER_CSS.CONTACT_CONTAINER });
		const contactIcon = UIcon.getIcon(DcIcons.DcIconTelephoneFill);
		const contactLabel = UDom.p({ innerText: dcTranslator.T(translation.CONTACT).toUpperCase() });
		UDom.AC(contactContainer, contactIcon, contactLabel);
		
		this.buildContactModal(contactContainer, DcIcons.DcIconTelephoneFill, dcTranslator.T(translation.CONTACT_ME).toUpperCase());

		dcCursor.subscribeElementToDetectHover(contactContainer);
		
		UDom.AC(this.mainElement, contactContainer);
	}
	
	private buildContactModal(button: HTMLElement, iconName: DcIcons, title: string): void {
		const contactModal = new Modal(Modal_TYPE.SMALL, button, UIcon.getIcon(iconName), title, undefined, true, true, true);
		const contactComponent = new dcContact(contactModal.getMainElement(), true);
		contactModal.setContent(contactComponent.getMainElement());
	}
	
}
