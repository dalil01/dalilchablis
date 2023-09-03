import "./Header.css";

import { Component } from "../Component";
import { UDom } from "../../../utils/UDom";
import { UIcon } from "../../../utils/UIcon";
import { Experience } from "../../../Experience";
import { LOCALE, Vars } from "../../../../Vars";
import { Cursor } from "../Cursor/Cursor";
import { Icons } from "../../../icons/Icons";

enum HEADER_CSS {
	CONTAINER = "header-container",
	LOGO_CONTAINER = "header-logo-container",
	LOGO = "header-logo",
	MENU_CONTAINER = "header-menu-container",
	VR_CONTAINER = "header-vr-container",
	MODE_CONTAINER = "header-mode-container",
	LOCALE_CONTAINER = "header-locale-container"
}

export class Header extends Component {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.header({ className: HEADER_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		this.buildLogo();
		this.buildMenu();
	}

	private buildLogo(): void {
		const logoContainer = UDom.div({ className: HEADER_CSS.LOGO_CONTAINER });
		const logoImg = UDom.img({
			src: Vars.IS_DARK_MODE ? Vars.PATH.LOGO.LIGHT : Vars.PATH.LOGO.DARK,
			className: HEADER_CSS.LOGO,
			alt: "Dalil CHABLIS"
		});

		logoContainer.addEventListener("click", () => {
			Experience.get().refreshUI();
		});

		Cursor.subscribeElementToDetectHover(logoContainer);

		UDom.AC(this.mainElement, UDom.AC(logoContainer, logoImg));
	}

	private buildMenu(): void {
		const menuContainer = UDom.nav({ className: HEADER_CSS.MENU_CONTAINER });

		const vrIconContainer = UDom.div({ className: HEADER_CSS.VR_CONTAINER });
		const vrIcon = UIcon.getIcon(Vars.IS_VR_MODE ? Icons.DcIconVrHeadsetSolid : Icons.DcIconVrHeadset);
		vrIconContainer.addEventListener("click", () => Experience.get().toggleVR());
		UDom.AC(menuContainer, UDom.AC(vrIconContainer, vrIcon));
		Cursor.subscribeElementToDetectHover(vrIconContainer);

		const modeIconContainer = UDom.div({ className: HEADER_CSS.MODE_CONTAINER });
		const modeIcon = UIcon.getIcon(Vars.IS_DARK_MODE ? Icons.DcIconMoonOutline : Icons.DcIconLight);
		modeIconContainer.addEventListener("click", () => Experience.get().toggleMode());
		UDom.AC(menuContainer, UDom.AC(modeIconContainer, modeIcon));
		modeIconContainer.appendChild(modeIcon);
		Cursor.subscribeElementToDetectHover(modeIconContainer);

		const localeIconContainer = UDom.div({ className: HEADER_CSS.LOCALE_CONTAINER });
		const globeIcon = UIcon.getIcon(Icons.DcIconGlobe);
		const locale = UDom.span({ innerText: Vars.LOCALE === LOCALE.EN ? LOCALE.EN : LOCALE.FR });
		localeIconContainer.addEventListener("click", () => Experience.get().toggleLocale());
		UDom.AC(menuContainer, UDom.AC(localeIconContainer, globeIcon, locale));
		Cursor.subscribeElementToDetectHover(localeIconContainer);

		UDom.AC(this.mainElement, menuContainer);
	}
	
}
