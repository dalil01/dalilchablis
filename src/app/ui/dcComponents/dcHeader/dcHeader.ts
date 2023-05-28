import "./dcHeader.css";

import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";
import { _UIcon } from "../../dcUtils/_UIcon";
import { DcIcons } from "../../dcIcons/dcIcons";
import { dcGlobalVars } from "../../../global/dcGlobalVars";
import { dcGlobalConfig } from "../../../global/dcGlobalConfig";
import { dcCursor } from "../dcCursor/dcCursor";
import { LOCALE } from "../../../global/dcGlobalEnums";
import { dcUIManager } from "../../dcUIManager";

enum HEADER_CSS {
	CONTAINER = "header-container",
	LOGO_CONTAINER = "header-logo-container",
	LOGO = "header-logo",
	MENU_CONTAINER = "header-menu-container",
	VR_CONTAINER = "header-vr-container",
	MODE_CONTAINER = "header-mode-container",
	LOCALE_CONTAINER = "header-locale-container"
}

export class dcHeader extends dcComponent {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.header({ className: HEADER_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		this.buildLogo();
		this.buildMenu();
	}

	private buildLogo(): void {
		const logoContainer = _UDom.div({ className: HEADER_CSS.LOGO_CONTAINER });
		const logoImg = _UDom.img({ src: dcGlobalConfig.isDarkMode ? dcGlobalVars.LOGO_WHITE_PATH : dcGlobalVars.LOGO_BLACK_PATH, className: HEADER_CSS.LOGO });

		logoContainer.addEventListener("click", () => {
			dcUIManager.get().refreshUI();
		});

		dcCursor.subscribeElementToDetectHover(logoContainer);

		_UDom.AC(this.mainElement, _UDom.AC(logoContainer, logoImg));
	}

	private buildMenu(): void {
		const menuContainer = _UDom.nav({ className: HEADER_CSS.MENU_CONTAINER });

		const vrIconContainer = _UDom.div({ className: HEADER_CSS.VR_CONTAINER });
		const vrIcon = _UIcon.getIcon(dcGlobalConfig.isVRMode ? DcIcons.DcIconVrHeadsetSolid : DcIcons.DcIconVrHeadset);
		vrIconContainer.addEventListener("click", () => dcUIManager.get().toggleVR());
		_UDom.AC(menuContainer, _UDom.AC(vrIconContainer, vrIcon));
		dcCursor.subscribeElementToDetectHover(vrIconContainer);

		const modeIconContainer = _UDom.div({ className: HEADER_CSS.MODE_CONTAINER });
		const modeIcon = _UIcon.getIcon(dcGlobalConfig.isDarkMode ? DcIcons.DcIconLight : DcIcons.DcIconMoonOutline);
		modeIconContainer.addEventListener("click", () => dcUIManager.get().toggleMode());
		_UDom.AC(menuContainer, _UDom.AC(modeIconContainer, modeIcon));
		modeIconContainer.appendChild(modeIcon);
		dcCursor.subscribeElementToDetectHover(modeIconContainer);

		const localeIconContainer = _UDom.div({ className: HEADER_CSS.LOCALE_CONTAINER });
		const globeIcon = _UIcon.getIcon(DcIcons.DcIconGlobe);
		const locale = _UDom.span({ innerText: dcGlobalConfig.locale === LOCALE.EN ? LOCALE.FR : LOCALE.EN });
		localeIconContainer.addEventListener("click", () => dcUIManager.get().toggleLocale());
		_UDom.AC(menuContainer, _UDom.AC(localeIconContainer, globeIcon, locale));
		dcCursor.subscribeElementToDetectHover(localeIconContainer);

		_UDom.AC(this.mainElement, menuContainer);
	}
	
}
