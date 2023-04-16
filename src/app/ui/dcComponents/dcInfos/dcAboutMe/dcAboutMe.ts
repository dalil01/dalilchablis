import "./dcAboutMe.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { _UIcon } from "../../../dcUtils/_UIcon";
import { DcIcons } from "../../../dcIcons/dcIcons";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";

enum ABOUT_ME_CSS {
	CONTAINER = "about-me-container",
	AVATAR = "about-me-avatar",
	IMAGES_CONTAINER = "about-me-images-container",
	IMAGE_1 = "about-me-image-1",
	IMAGE_2 = "about-me-image-2",
	IMAGE_3 = "about-me-image-3",
	IMAGE_4 = "about-me-image-4",
	IMAGE_5 = "about-me-image-5",
	IMAGE_6 = "about-me-image-6",
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
		//const imagesContainer = _UDom.div({ className: ABOUT_ME_CSS.IMAGES_CONTAINER });
		/*const img1 = _UDom.img({ src: "https://via.placeholder.com/50", className: ABOUT_ME_CSS.IMAGE_1 });
		const img2 = _UDom.img({ src: "https://via.placeholder.com/50", className: ABOUT_ME_CSS.IMAGE_2 });
		const img3 = _UDom.img({ src: "https://via.placeholder.com/50", className: ABOUT_ME_CSS.IMAGE_3 });
		const img4 = _UDom.img({ src: "https://via.placeholder.com/50", className: ABOUT_ME_CSS.IMAGE_4 });
		const img5 = _UDom.img({ src: "https://via.placeholder.com/50", className: ABOUT_ME_CSS.IMAGE_5 });
		const img6 = _UDom.img({ src: "https://via.placeholder.com/50", className: ABOUT_ME_CSS.IMAGE_6 });

		//_UDom.AC(imagesContainer, img1, img2, img3, img4, img5, img6);
		 */

		const aboutContainer = _UDom.div({ className: ABOUT_ME_CSS.TEXT_CONTAINER });
		//const avatar = _UDom.img({ src: "https://via.placeholder.com/50", className: ABOUT_ME_CSS.AVATAR });
		const hi = _UDom.span({ innerText: dcTranslator.T(dcTranslation.HI_THERE) + ' ' });
		const hand = _UIcon.getIcon(DcIcons.DcIconHand, { className: ABOUT_ME_CSS.EMOJI_HAND });
		const about = _UDom.span({
			innerText: ', ' + dcTranslator.T(dcTranslation.ABOUT_TEXT) + " (｡◕‿◕｡)"
		});
		_UDom.AC(aboutContainer, /*avatar, _UDom.AC(_UDom.CE("div"),*/ hi, hand, about);


		_UDom.AC(this.mainElement, aboutContainer);
	}
	
}