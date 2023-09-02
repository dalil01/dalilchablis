import "./Header.css";

import { component } from "../../Component";
import { UDom } from "../../../dcUtils/UDom";
import { UIcon } from "../../../dcUtils/UIcon";
import { DcIcons } from "../../../dcIcons/dcIcons";
import { vars } from "../../../../Vars";
import { dcGlobalConfig } from "../../../global/dcGlobalConfig";
import { dcCursor } from "../cursor/cursor";
import { LOCALE } from "../../../global/dcGlobalEnums";
import { Experience } from "../../../Experience";

enum HEADER_CSS {
	CONTAINER = "header-container",
	LOGO_CONTAINER = "header-logo-container",
	LOGO = "header-logo",
	MENU_CONTAINER = "header-menu-container",
	VR_CONTAINER = "header-vr-container",
	MODE_CONTAINER = "header-mode-container",
	LOCALE_CONTAINER = "header-locale-container"
}

export class Header extends component {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.header({ className: HEADER_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		this.buildLogo().then(() => {
			this.buildMenu();
		});
	}

	private async buildLogo(): Promise<void> {
		const logoContainer = UDom.div({ className: HEADER_CSS.LOGO_CONTAINER });
		const logoImg = UDom.img({
			src: dcGlobalConfig.isDarkMode ? await vars.getLogoWhitePath() : await vars.getLogoDarkPath(),
			className: HEADER_CSS.LOGO,
			alt: "Dalil CHABLIS"
		});

		logoContainer.addEventListener("click", () => {
			Experience.get().refreshUI();
		});

		dcCursor.subscribeElementToDetectHover(logoContainer);

		UDom.AC(this.mainElement, UDom.AC(logoContainer, logoImg));
	}

	private buildMenu(): void {
		const menuContainer = UDom.nav({ className: HEADER_CSS.MENU_CONTAINER });

		const vrIconContainer = UDom.div({ className: HEADER_CSS.VR_CONTAINER });
		const vrIcon = UIcon.getIcon(dcGlobalConfig.isVRMode ? DcIcons.DcIconVrHeadsetSolid : DcIcons.DcIconVrHeadset);
		vrIconContainer.addEventListener("click", () => Experience.get().toggleVR());
		UDom.AC(menuContainer, UDom.AC(vrIconContainer, vrIcon));
		dcCursor.subscribeElementToDetectHover(vrIconContainer);

		const modeIconContainer = UDom.div({ className: HEADER_CSS.MODE_CONTAINER });
		const modeIcon = UIcon.getIcon(dcGlobalConfig.isDarkMode ? DcIcons.DcIconMoonOutline : DcIcons.DcIconLight);
		modeIconContainer.addEventListener("click", () => Experience.get().toggleMode());
		UDom.AC(menuContainer, UDom.AC(modeIconContainer, modeIcon));
		modeIconContainer.appendChild(modeIcon);
		dcCursor.subscribeElementToDetectHover(modeIconContainer);

		const localeIconContainer = UDom.div({ className: HEADER_CSS.LOCALE_CONTAINER });
		const globeIcon = UIcon.getIcon(DcIcons.DcIconGlobe);
		const locale = UDom.span({ innerText: dcGlobalConfig.locale === LOCALE.EN ? LOCALE.EN : LOCALE.FR });
		localeIconContainer.addEventListener("click", () => Experience.get().toggleLocale());
		UDom.AC(menuContainer, UDom.AC(localeIconContainer, globeIcon, locale));
		dcCursor.subscribeElementToDetectHover(localeIconContainer);

		UDom.AC(this.mainElement, menuContainer);
	}
	
}
