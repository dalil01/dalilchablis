import "./dcHeader.css";

import {dcComponent} from "../dcComponent";
import {_UDom} from "../../dcUtils/_UDom";
import {_UIcon} from "../../dcUtils/_UIcon";
import {DcIcons} from "../../dcIcons/dcIcons";
import {dcGlobalVars} from "../../../global/dcGlobalVars";
import {dcGlobalConfig} from "../../../global/dcGlobalConfig";
import {dcCursor} from "../dcCursor/dcCursor";
import {LOCALE, VIEWS} from "../../../global/dcGlobalEnums";
import {dcUIManager} from "../../dcUIManager";
import {dcModal} from "../dcModal/dcModal";
import {dcTranslator} from "../../dcTranslator/dcTranslator";
import {dcTranslation} from "../../dcTranslator/dcTranslation";

enum HEADER_CSS_CLASSNAMES {
	CONTAINER = "header-container",
	LOGO_CONTAINER = "header-logo-container",
	LOGO = "header-logo",
	MENU_CONTAINER = "header-menu-container",
	SETTINGS_ICON_CONTAINER = "header-settings-container",
	MODE_ICON_CONTAINER = "header-mode-container",
	LOCALE_CONTAINER = "header-locale-container"
}

export class dcHeader extends dcComponent {

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CE("header", {  className: HEADER_CSS_CLASSNAMES.CONTAINER }));

		if (autoInit)
			this.init();
	}

	public buildUI(): void {
		const logoContainer = _UDom.CE("div", { className: HEADER_CSS_CLASSNAMES.LOGO_CONTAINER });
		const logo = _UDom.CE("img", { src: dcGlobalVars.LOGO_IMAGE_PATH, className: HEADER_CSS_CLASSNAMES.LOGO });
		logoContainer.addEventListener("click", () => dcUIManager.getInstance().refreshUI());
		logoContainer.appendChild(logo);

		const menuContainer = _UDom.CE("nav", { className: HEADER_CSS_CLASSNAMES.MENU_CONTAINER });

		const vrIconContainer = _UDom.CE("div", { className: HEADER_CSS_CLASSNAMES.MODE_ICON_CONTAINER });
		const vrIcon = _UIcon.getIcon(DcIcons.DcIconVirtualRealityGlasses);
		vrIconContainer.appendChild(vrIcon);

		const settingsIconContainer = _UDom.CE("div", { className: HEADER_CSS_CLASSNAMES.SETTINGS_ICON_CONTAINER });
		const settingsIconName = DcIcons.DcIconSettings;
		const settingsTitle = dcTranslator.T(dcTranslation.SETTINGS);
		const settingsIcon = _UIcon.getIcon(settingsIconName);
		settingsIconContainer.appendChild(settingsIcon);

		const settingsModal = this.buildSettingsModal(settingsIconContainer, settingsIconName, settingsTitle);
		settingsIconContainer.addEventListener("click", () => settingsModal.toggle());

		const modeIconContainer = _UDom.CE("div", { className: HEADER_CSS_CLASSNAMES.MODE_ICON_CONTAINER });
		const modeIcon = _UIcon.getIcon(dcGlobalConfig.isDarkMode ? DcIcons.DcIconLight : DcIcons.DcIconMoonOutline);
		modeIconContainer.addEventListener("click", () => dcUIManager.getInstance().toggleMode());
		modeIconContainer.appendChild(modeIcon);

		const localeIconContainer = _UDom.CE("div", { className: HEADER_CSS_CLASSNAMES.LOCALE_CONTAINER });
		const globeIcon = _UIcon.getIcon(DcIcons.DcIconGlobe);
		const locale = _UDom.CE("span", { innerText: dcGlobalConfig.locale === LOCALE.EN ? LOCALE.FR : LOCALE.EN });
		localeIconContainer.addEventListener("click", () => dcUIManager.getInstance().toggleLocale());
		localeIconContainer.appendChild(globeIcon);
		localeIconContainer.appendChild(locale);

		if (dcGlobalConfig.view === VIEWS.OFFICE) {
			menuContainer.appendChild(vrIconContainer);
			dcCursor.subscribeElementToDetectHover(vrIconContainer);
		}
		menuContainer.appendChild(settingsIconContainer);
		menuContainer.appendChild(modeIconContainer);
		menuContainer.appendChild(localeIconContainer);

		dcCursor.subscribeElementToDetectHover(logoContainer);
		dcCursor.subscribeElementToDetectHover(settingsIconContainer);
		dcCursor.subscribeElementToDetectHover(modeIconContainer);
		dcCursor.subscribeElementToDetectHover(localeIconContainer);

		_UDom.AC(this.getMainElement(), logoContainer, menuContainer);
	}

	private buildSettingsModal(button: HTMLElement, iconName: DcIcons, title: string): dcModal {
		const settingsModalContent = _UDom.CE("div");

		//settingsModalContent.innerText = "lorem".repeat(8000);


		return new dcModal(button, _UIcon.getIcon(iconName), title, settingsModalContent, true, true, true);
	}

}
