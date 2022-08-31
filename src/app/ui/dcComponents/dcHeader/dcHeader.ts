import "./dcHeader.css";

import {dcComponent} from "../dcComponent";
import {_UDom} from "../../dcUtils/_UDom";
import {_UIcon} from "../../dcUtils/_UIcon";
import {DcIcons} from "../../dcIcons/dcIcons";

enum HEADER_CSS_CLASSNAMES {
	CONTAINER = "header-container",
	LOGO_CONTAINER = "header-logo-container",
	SETTINGS_CONTAINER = "header-settings-container"
}

export class dcHeader extends dcComponent {

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CE("header", {  className: HEADER_CSS_CLASSNAMES.CONTAINER }));

		if (autoInit)
			this.init();
	}

	public buildUI(): void {
		const logoContainer = _UDom.CE("div", { className: HEADER_CSS_CLASSNAMES.LOGO_CONTAINER });
		const logo = _UDom.CE("strong", { innerText: "DC" });
		logoContainer.appendChild(logo);

		const settingsIconContainer = _UDom.CE("div", { className: HEADER_CSS_CLASSNAMES.SETTINGS_CONTAINER });
		const settingsIcon = _UIcon.getIcon(DcIcons.DcIconSettings);
		settingsIconContainer.appendChild(settingsIcon);

		_UDom.AC(this.getMainElement(), logoContainer, settingsIconContainer);
	}

}