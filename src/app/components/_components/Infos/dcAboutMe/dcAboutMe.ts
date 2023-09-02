import "./dcAboutMe.css";

import { component } from "../../../Component";
import { UDom } from "../../../../dcUtils/UDom";
import { UIcon } from "../../../../dcUtils/UIcon";
import { DcIcons } from "../../../../dcIcons/dcIcons";
import { dcTranslator } from "../../../../translator/translator";
import { translation } from "../../../../translator/Translation";

enum ABOUT_ME_CSS {
	CONTAINER = "about-me-container",
	AVATAR = "about-me-avatar",
	TEXT_CONTAINER = "about-me-text-container",
	EMOJI_HAND = "about-me-emoji-hand"
}

export class dcAboutMe extends component {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("about-me", { className: ABOUT_ME_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public async buildUI(): Promise<void> {
		const avatar = UDom.img({ src: "images/about/me.webp", className: ABOUT_ME_CSS.AVATAR });
		this.mainElement.appendChild(avatar);

		const aboutContainer = UDom.div({ className: ABOUT_ME_CSS.TEXT_CONTAINER });
		const hi = UDom.span({ innerText: dcTranslator.T(translation.HI_THERE) + ' ' });
		const hand = UIcon.getIcon(DcIcons.DcIconHand, { className: ABOUT_ME_CSS.EMOJI_HAND });
		const about = UDom.span({
			innerText: ", " + dcTranslator.T(translation.ABOUT_TEXT)
		});

		UDom.AC(aboutContainer, hi, hand, about);

		this.mainElement.appendChild(aboutContainer);
	}
	
}