import "./dcExperience.css"

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";

enum EXPERIENCE_CSS_CLASSNAMES {
	CONTAINER = "education-container",
}

export class dcExperience extends dcComponent {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("experience", { className: EXPERIENCE_CSS_CLASSNAMES.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const title = _UDom.h2( { innerText: dcTranslator.T(dcTranslation.EXPERIENCE) });
		
		
		_UDom.AC(this.getMainElement(), title);
	}
	
}