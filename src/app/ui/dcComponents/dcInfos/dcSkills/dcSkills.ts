import "./dcSkills.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";

enum PROJECTS_CSS_CLASSNAMES {
	CONTAINER = "skills-container",
}

export class dcSkills extends dcComponent {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("skills", { className: PROJECTS_CSS_CLASSNAMES.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const title = _UDom.h2( { innerText: dcTranslator.T(dcTranslation.SKILLS) });
		
		
		_UDom.AC(this.getMainElement(), title);
	}
	
}