import "./dcAboutMe.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { _UIcon } from "../../../dcUtils/_UIcon";
import { DcIcons } from "../../../dcIcons/dcIcons";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";

enum ABOUT_ME_CSS {
	CONTAINER = "about-me-container",
	BACKGROUND_IMAGE = "about-me-banner",
	PROFILE_IMAGE = "about-me-profile-image",
	TITLE = "about-me-title",
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
		const imagesContainer = _UDom.div();
		const img1 = _UDom.img({ src: "https://via.placeholder.com/50" });
		const img2 = _UDom.img({ src: "https://via.placeholder.com/50" });
		const img3 = _UDom.img({ src: "https://via.placeholder.com/50" });
		//_UDom.AC(imagesContainer, img1, img2, img3);

		const aboutContainer = _UDom.div({ className: ABOUT_ME_CSS.TEXT_CONTAINER });
		const hi = _UDom.span({ innerText: dcTranslator.T(dcTranslation.HI_THERE) + ' ' });
		const hand = _UIcon.getIcon(DcIcons.DcIconHand, { className: ABOUT_ME_CSS.EMOJI_HAND });
		const about = _UDom.span({
			innerText: ', ' + dcTranslator.T(dcTranslation.ABOUT_TEXT) + " (｡◕‿◕｡)"
		});
		_UDom.AC(aboutContainer, hi, hand, about);


		_UDom.AC(this.mainElement, imagesContainer, aboutContainer);
	}
	
}