import "./AboutMe.css";

import { Component } from "../../Component";
import { UDom } from "../../../../utils/UDom";
import { UIcon } from "../../../../utils/UIcon";
import { Icons } from "../../../../icons/Icons";
import { Translator } from "../../../../translations/Translator";
import { Translation } from "../../../../translations/Translation";

enum ABOUT_ME_CSS {
	CONTAINER = "about-me-container",
	AVATAR = "about-me-avatar",
	TEXT_CONTAINER = "about-me-text-container",
	EMOJI_HAND = "about-me-emoji-hand"
}

export class AboutMe extends Component {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("about-me", { className: ABOUT_ME_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const avatar = UDom.img({ src: "images/about/me.webp", className: ABOUT_ME_CSS.AVATAR });
		this.mainElement.appendChild(avatar);

		const aboutContainer = UDom.div({ className: ABOUT_ME_CSS.TEXT_CONTAINER });
		const hi = UDom.span({ innerText: Translator.T(Translation.HI_THERE) + ' ' });
		const hand = UIcon.getIcon(Icons.IconHand, { className: ABOUT_ME_CSS.EMOJI_HAND });
		const about = UDom.span({
			innerText: ", " + Translator.T(Translation.ABOUT_TEXT)
		});

		UDom.AC(aboutContainer, hi, hand, about);

		this.mainElement.appendChild(aboutContainer);
	}
	
}