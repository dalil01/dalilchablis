import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";
import { _UIcon } from "../../../dcUtils/_UIcon";
import { DcIcons } from "../../../dcIcons/dcIcons";
import { dcTooltip } from "../../dcTooltip/dcTooltip";
import { GLOBAL_CSS_CLASSNAMES } from "../../../../global/dcGlobalEnums";
import { dcCursor } from "../../dcCursor/dcCursor";

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
		const title = _UDom.h2( { innerText: dcTranslator.T(dcTranslation.ABOUT_ME) });
		
		const meImageContainer = _UDom.div();
		
		const img1 = _UDom.img({ src: "https://via.placeholder.com/80" });
		const img2 = _UDom.img({ src: "https://via.placeholder.com/150" });
		const img3 = _UDom.img({ src: "https://via.placeholder.com/80" });
		
		_UDom.AC(meImageContainer, img1, img2, img3);
		
		const text = _UDom.p({ innerText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." });
		
		_UDom.AC(this.getMainElement(), title, meImageContainer, text);
	}
	
}