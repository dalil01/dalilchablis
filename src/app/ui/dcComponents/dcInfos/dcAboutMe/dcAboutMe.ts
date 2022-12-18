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
		const banner = _UDom.img({ src: "https://via.placeholder.com/150", className: ABOUT_ME_CSS_CLASSNAMES.BACKGROUND_IMAGE });
		this.getMainElement().appendChild(banner);
		
		const profileImage = _UDom.img({ src: "https://via.placeholder.com/50", className: ABOUT_ME_CSS_CLASSNAMES.PROFILE_IMAGE });
		this.getMainElement().appendChild(profileImage);
		
		const textContainer = _UDom.div({ className: ABOUT_ME_CSS_CLASSNAMES.TEXT_CONTAINER });
		
		const name = _UDom.h2({ innerText: "Dalil CHABLIS" });
		const job = _UDom.p({ innerText: "Full-Stack Developer" });
		const location = _UDom.p({ innerText: "Paris, France" });
		
		const title = _UDom.h3( { innerText: dcTranslator.T(dcTranslation.ABOUT_ME), className: ABOUT_ME_CSS_CLASSNAMES.TITLE });
		this.getMainElement().appendChild(title);
		
		const about = _UDom.p({
			innerText:
				"Hi there (emoji) I'm Dalil, " +
				"a Full-Stack Developer in Paris. " +
				"I'm passionate about everything related to computer science. " +
				"Right now, my interests are rather in field of web, connected objects, 3D and virtual reality. " +
				"I'm also passionate about sports, I go from athletics and I'm a javelin thrower!"
		});
		
		_UDom.AC(this.getMainElement(), _UDom.AC(textContainer, name, job, location, title, about));
	}
	
}