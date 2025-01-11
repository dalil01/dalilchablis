import "./Footer.css";

import { Component } from "../Component";
import { Modal, Modal_TYPE } from "../Modal/Modal";
import { Sound } from "../Sound/Sound";
import { UDom } from "../../../utils/UDom";
import { UIcon } from "../../../utils/UIcon";
import { Icons } from "../../../icons/Icons";
import { Translator } from "../../../translations/Translator";
import { Translation } from "../../../translations/Translation";
import { Cursor } from "../Cursor/Cursor";
import { Contact } from "../Contact/Contact";

enum FOOTER_CSS {
	CONTAINER = "footer-container",
	CONTACT_CONTAINER = "footer-contact-container"
}

export class Footer extends Component {

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
		const contactIcon = UIcon.getIcon(Icons.IconTelephoneFill);
		const contactLabel = UDom.p({ innerText: Translator.T(Translation.CONTACT).toUpperCase() });
		UDom.AC(contactContainer, contactIcon, contactLabel);
		
		this.buildContactModal(contactContainer, Icons.IconTelephoneFill, Translator.T(Translation.CONTACT_ME).toUpperCase());

		Cursor.subscribeElementToDetectHover(contactContainer);
		
		UDom.AC(this.mainElement, contactContainer);
	}
	
	private buildContactModal(button: HTMLElement, iconName: Icons, title: string): void {
		const contactModal = new Modal(Modal_TYPE.SMALL, button, UIcon.getIcon(iconName), title, undefined, true, true, true);
		const contactComponent = new Contact(contactModal.getMainElement(), true);
		contactModal.setContent(contactComponent.getMainElement());
	}
	
}
