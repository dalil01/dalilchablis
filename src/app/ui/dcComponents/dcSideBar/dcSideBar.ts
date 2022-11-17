import "./dcSideBar.css";

import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";

enum SIDE_BAR_CSS_CLASSNAMES {
	CONTAINER = "side-bar-container",
}

export class dcSideBar extends dcComponent {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("side-bar", { className: SIDE_BAR_CSS_CLASSNAMES.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	
	public buildUI() {
		const sideBar = _UDom.div({
		
		});
		
		
		
		_UDom.AC(this.getMainElement(), sideBar);
	}
	
}