import "./dcProjects.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";

enum PROJECTS_CSS_CLASSNAMES {
	CONTAINER = "projects-container",
}

export class dcProjects extends dcComponent {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("projects", { className: PROJECTS_CSS_CLASSNAMES.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const title = _UDom.h2( { innerText: dcTranslator.T(dcTranslation.PROJECTS) });
		
		
		_UDom.AC(this.getMainElement(), title);
	}
	
}