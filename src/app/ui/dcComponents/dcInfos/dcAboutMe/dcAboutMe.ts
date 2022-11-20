import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";

enum ABOUT_ME_CSS_CLASSNAMES {
	CONTAINER = "about-me-container",
}

export class dcAboutMe extends dcComponent {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("about-me", { className: ABOUT_ME_CSS_CLASSNAMES.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const title = _UDom.h2( { innerText: dcTranslator.T(dcTranslation.ME) });
		
		this.getMainElement().appendChild(title);
		
		const meImageContainer = _UDom.div();
		
		const img1 = _UDom.img({ src: "https://via.placeholder.com/80" });
		const img2 = _UDom.img({ src: "https://via.placeholder.com/150" });
		const img3 = _UDom.img({ src: "https://via.placeholder.com/80" });
		
		//_UDom.AC(meImageContainer, img1, img2, img3);
		
		const about = _UDom.p({
			innerText:
				"I'm a Full-Stack Developer in Paris.\n" +
				"I'm passionate about everything related to computer science.\n" +
				"Right now, my interests are rather in field of web, connected objects, 3D and virtual reality!\n" +
				"I'm also passionate about sports, I go from athletics and I'm a javelin thrower!"
		});
		
		_UDom.AC(this.getMainElement(), meImageContainer, about);
	}
	
}