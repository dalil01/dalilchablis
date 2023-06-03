import "./dcAboutMe.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { _UIcon } from "../../../dcUtils/_UIcon";
import { DcIcons } from "../../../dcIcons/dcIcons";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";
import { dcGlobalVars } from "../../../../global/dcGlobalVars";

enum ABOUT_ME_CSS {
	CONTAINER = "about-me-container",
	AVATAR = "about-me-avatar",
	TEXT_CONTAINER = "about-me-text-container",
	EMOJI_HAND = "about-me-emoji-hand"
}

export class dcAboutMe extends dcComponent {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("about-me", { className: ABOUT_ME_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const avatar = _UDom.img({ src: dcGlobalVars.IMAGE_PATH + "about/me.png", className: ABOUT_ME_CSS.AVATAR });
		this.mainElement.appendChild(avatar);

		const aboutContainer = _UDom.div({ className: ABOUT_ME_CSS.TEXT_CONTAINER });
		const hi = _UDom.span({ innerText: dcTranslator.T(dcTranslation.HI_THERE) + ' ' });
		const hand = _UIcon.getIcon(DcIcons.DcIconHand, { className: ABOUT_ME_CSS.EMOJI_HAND });
		const about = _UDom.span({
			innerText: ", " + dcTranslator.T(dcTranslation.ABOUT_TEXT)
		});

		_UDom.AC(aboutContainer, hi, hand, about);

		this.mainElement.appendChild(aboutContainer);
	}
	
}