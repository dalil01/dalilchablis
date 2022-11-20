import "./dcEducation.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";

enum EDUCATION_CSS_CLASSNAMES {
	CONTAINER = "education-container",
}

export class dcEducation extends dcComponent {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("education", { className: EDUCATION_CSS_CLASSNAMES.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const title = _UDom.h2( { innerText: dcTranslator.T(dcTranslation.EDUCATION) });
		
		
		_UDom.AC(this.getMainElement(), title);
	}
	
}