import "./dcAboutMe.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";

enum ABOUT_ME_CSS_CLASSNAMES {
	CONTAINER = "about-me-container",
	BACKGROUND_IMAGE = "about-me-banner",
	PROFILE_IMAGE = "about-me-profile-image",
	TITLE = "about-me-title",
	TEXT_CONTAINER = "about-me-text-container",
}

export class dcAboutMe extends dcComponent {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("about-me", { className: ABOUT_ME_CSS_CLASSNAMES.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const imagesContainer = _UDom.div();
		const img1 = _UDom.img({ src: "https://via.placeholder.com/50" });
		const img2 = _UDom.img({ src: "https://via.placeholder.com/50" });
		const img3 = _UDom.img({ src: "https://via.placeholder.com/50" });
		_UDom.AC(imagesContainer, img1, img2, img3);

		const aboutContainer = _UDom.div();
		const about = _UDom.p({
			innerText:
				"Hi there (emoji) I'm Dalil CHABLIS, " +
				"a Full-Stack Developer in Paris. " +
				"I'm passionate about everything related to computer science. " +
				"Right now, my interests are rather in field of web, connected objects, 3D and virtual reality. " +
				"I'm also passionate about sports, I go from athletics and I'm a javelin thrower!"
		});
		_UDom.AC(aboutContainer, about);


		_UDom.AC(this.mainElement, imagesContainer, aboutContainer);
	}
	
}