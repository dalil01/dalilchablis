import { Cursor } from "./components/_components/Cursor/Cursor";


export enum GLOBAL_CSS {
	LIGHT_MODE = "light-mode",
	DARK_MODE = "dark-mode",
	DISPLAY_NONE = "display-none",
	BLINK = "blink"
}

export enum LOCALE {
	EN = "EN",
	FR = "FR"
}

export enum LOCAL_STORAGE_KEY {
	VR_ENABLE = "vr-enable",
	LOCALE = "locale",
	SOUND_ENABLE = "sound-enable"
}

export class Experience {

	private static INSTANCE: Experience;

	private readonly parentElement: HTMLElement;
	private readonly mainElement: HTMLElement;

	private started: boolean = false;

	private modeAutoSet: boolean = false;

	private cursor!: Cursor;
	private header!: dcHeader;

	private homeView!: dcHome;
	private officeView!: dcOffice;

	private currentView!: dcView;

	private footer!: dcFooter;

	private constructor(parentElement: HTMLElement) {
		this.parentElement = parentElement;
		this.mainElement = UDom.main();
	}

	public static get(parentElement: HTMLElement | null = null): Experience {
		if (parentElement && !Experience.INSTANCE) {
			Experience.INSTANCE = new Experience(parentElement);
		}

		return Experience.INSTANCE;
	}

	public toggleVR(updateUI: boolean = true): void {
		dcGlobalConfig.isVRMode = !dcGlobalConfig.isVRMode;
		localStorage.setItem(LOCAL_STORAGE_KEY.VR_ENABLE, dcGlobalConfig.isVRMode.toString());

		if (!dcGlobalConfig.isVRMode) {
			this.officeView?.autoSetVRMode();
		}

		if (!updateUI) {
			return;
		}

		if (dcGlobalConfig.isVRMode && dcGlobalConfig.currentView != VIEWS.OFFICE) {
			this.setCurrentView(VIEWS.OFFICE);
			this.officeView.setVisitStarted(true);
		} else {
			this.updateUI();
		}
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
		dcGlobalConfig.currentView = vars.DEFAULT_VEW;

		if (dcGlobalConfig.currentView != VIEWS.OFFICE && dcGlobalConfig.isVRMode) {
			this.toggleVR();
		} else {
			this.updateUI();
		}
	}

	public start(): void {
		if (!this.started) {
			this.buildUI();
			this.started = true;
		}
	}

	private stop(): void {
		if (this.started) {
			UDom.removeAllChildren(this.parentElement);
			this.started = false;
		}
	}

	private buildUI(): void {
		if (this.cursor) {
			this.cursor.update();
		} else {
			this.cursor = new dcCursor(this.parentElement, true);
		}

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
				this.officeView.update();
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

			if (dcGlobalConfig.currentView != VIEWS.OFFICE && dcGlobalConfig.isVRMode) {
				this.toggleVR(false);
			}
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
