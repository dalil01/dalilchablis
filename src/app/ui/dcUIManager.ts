import { dcHeader } from "./dcComponents/dcHeader/dcHeader";
import { dcFooter } from "./dcComponents/dcFooter/dcFooter";
import { dcCursor } from "./dcComponents/dcCursor/dcCursor";
import { _UDom } from "./dcUtils/_UDom";
import { dcGlobalConfig } from "../global/dcGlobalConfig";
import { GLOBAL_CSS, LOCAL_STORAGE_KEY, LOCALE, VIEWS } from "../global/dcGlobalEnums";
import { dcHome } from "./dcViews/dcHome/dcHome";
import { dcView } from "./dcViews/dcView";
import { dcOffice } from "./dcViews/dcOffice/dcOffice";
import { dcGlobalVars } from "../global/dcGlobalVars";

export class dcUIManager {

	private static INSTANCE: dcUIManager;

	private readonly parentElement: HTMLElement;
	private readonly mainElement: HTMLElement;

	private started: boolean = false;

	private modeAutoSet: boolean = false;

	private cursor!: dcCursor;
	private header!: dcHeader;

	private homeView!: dcHome;
	private officeView!: dcOffice;

	private currentView!: dcView;

	private footer!: dcFooter;

	private constructor(parentElement: HTMLElement) {
		this.parentElement = parentElement;
		this.mainElement = _UDom.main();
	}

	public static get(parentElement: HTMLElement | null = null): dcUIManager {
		if (parentElement && !dcUIManager.INSTANCE) {
			dcUIManager.INSTANCE = new dcUIManager(parentElement);
		}

		return dcUIManager.INSTANCE;
	}

	public toggleVR(): void {
		dcGlobalConfig.isVRMode = !dcGlobalConfig.isVRMode;
		localStorage.setItem(LOCAL_STORAGE_KEY.VR_ENABLE, dcGlobalConfig.isVRMode.toString());
		this.updateUI();
	}

	public toggleMode(): void {
		dcGlobalConfig.isDarkMode = !dcGlobalConfig.isDarkMode;
		this.updateUI();
	}

	public toggleLocale(): void {
		dcGlobalConfig.locale = (dcGlobalConfig.locale === LOCALE.EN) ? LOCALE.FR : LOCALE.EN;
		localStorage.setItem(LOCAL_STORAGE_KEY.LOCALE, dcGlobalConfig.locale);
		this.updateUI();
	}

	public setCurrentView(view: VIEWS): void {
		dcGlobalConfig.currentView = view;
		this.updateUI();
	}

	private updateUI(): void {
		this.stop();
		this.start();
	}

	public refreshUI(): void {
		this.officeView?.setVisitStarted(false);
		dcGlobalConfig.currentView = dcGlobalVars.DEFAULT_VEW;
		this.updateUI();
	}

	public start(): void {
		if (!this.started) {
			this.buildUI();
			this.started = true;
		}
	}

	private stop(): void {
		if (this.started) {
			_UDom.removeAllChildren(this.parentElement);
			this.started = false;
		}
	}

	private buildUI(): void {
		if (this.cursor) {
			this.cursor.update();
		} else {
			this.cursor = new dcCursor(this.parentElement, true);
		}

		const lastMode = dcGlobalConfig.isDarkMode;

		this.autoSetVRMode();
		this.autoSetMode();
		this.autoSetLocale();

		if (this.header) {
			this.header.update();
		} else {
			this.header = new dcHeader(this.parentElement, true);
		}

		if (this.currentView) {
			if (this.currentView !== this.officeView) {
				this.currentView.destroy();
			}

			this.autoSetCurrentView();

			if (this.currentView == this.officeView) {
				document.body.style.cursor = "grab";
				dcCursor.mouseOverDetectedElem = false;
				this.officeView.update(lastMode === dcGlobalConfig.isDarkMode);
			} else {
				this.currentView.update();
			}
		} else {
			this.homeView = new dcHome(this.mainElement, dcGlobalConfig.currentView == VIEWS.HOME);

			this.officeView = new dcOffice(this.mainElement);
			this.officeView.onReady(() => this.homeView.buildStartButton());

			this.officeView.init();

			this.homeView.onClickOnStartButton(() => this.officeView.setVisitStarted(true));

			this.autoSetCurrentView();
		}

		this.parentElement.appendChild(this.mainElement);

		if (this.footer) {
			this.footer.update();
		} else {
			this.footer = new dcFooter(this.parentElement, true);
		}
	}

	private autoSetCurrentView(): void {
		switch (dcGlobalConfig.currentView) {
			case VIEWS.OFFICE:
				this.currentView = this.officeView;
				break;
			case VIEWS.HOME:
			default:
				this.currentView = this.homeView;
		}
	}

	private autoSetVRMode(): void {
		const lsVREnable = localStorage.getItem(LOCAL_STORAGE_KEY.VR_ENABLE)?.trim();
		if (lsVREnable) {
			dcGlobalConfig.isVRMode = lsVREnable === "true";
		}
		this.officeView?.autoSetVRMode();
	}

	private autoSetMode(): void {
		if (!this.modeAutoSet) {
			const hour = new Date().getHours();
			dcGlobalConfig.isDarkMode = !(hour >= 6 && hour < 18);
			this.modeAutoSet = true;
		}

		/*
		const lsDarkMode = localStorage.getItem(LOCAL_STORAGE_KEY.IS_DARK_MODE)?.trim();
		if (lsDarkMode) {
			dcGlobalConfig.isDarkMode = lsDarkMode === "true";
		}
		 */

		if (dcGlobalConfig.isDarkMode) {
			this.parentElement.classList.remove(GLOBAL_CSS.LIGHT_MODE);
			this.parentElement.classList.add(GLOBAL_CSS.DARK_MODE);
		} else {
			this.parentElement.classList.remove(GLOBAL_CSS.DARK_MODE);
			this.parentElement.classList.add(GLOBAL_CSS.LIGHT_MODE);
		}
	}

	private autoSetLocale(): void {
		const userLocale = (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language).toUpperCase();
		dcGlobalConfig.locale = userLocale.startsWith(LOCALE.FR) ? LOCALE.FR : LOCALE.EN;

		const lsLocale = localStorage.getItem(LOCAL_STORAGE_KEY.LOCALE)?.trim();
		if (lsLocale) {
			dcGlobalConfig.locale = lsLocale == LOCALE.FR ? LOCALE.FR : LOCALE.EN;
		}
	}

}
