import { Cursor } from "./ui/components/Cursor/Cursor";
import { Header } from "./ui/components/Header/Header";
import { Home } from "./ui/views/Home/Home";
import { Office } from "./ui/views/Office/Office";
import { View, VIEWS } from "./ui/views/View";
import { Footer } from "./ui/components/Footer/Footer";
import { UDom } from "./utils/UDom";
import { LOCALE, Vars } from "../Vars";

export enum GLOBAL_CSS {
	LIGHT_MODE = "light-mode",
	DARK_MODE = "dark-mode",
	DISPLAY_NONE = "display-none",
	BLINK = "blink"
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
	private header!: Header;

	private homeView!: Home;
	private officeView!: Office;

	private currentView!: View;

	private footer!: Footer;

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
		Vars.IS_VR_MODE = !Vars.IS_VR_MODE;
		localStorage.setItem(LOCAL_STORAGE_KEY.VR_ENABLE, Vars.IS_VR_MODE.toString());

		if (!Vars.IS_VR_MODE) {
			this.officeView?.autoSetVRMode();
		}

		if (!updateUI) {
			return;
		}

		if (Vars.IS_VR_MODE && Vars.CURRENT_VIEW != VIEWS.OFFICE) {
			this.setCurrentView(VIEWS.OFFICE);
			this.officeView.setVisitStarted(true);
		} else {
			this.updateUI();
		}
	}

	public toggleMode(): void {
		Vars.IS_DARK_MODE = !Vars.IS_DARK_MODE;
		this.updateUI();
	}

	public toggleLocale(): void {
		Vars.LOCALE = (Vars.LOCALE === LOCALE.EN) ? LOCALE.FR : LOCALE.EN;
		localStorage.setItem(LOCAL_STORAGE_KEY.LOCALE, Vars.LOCALE);
		this.updateUI();
	}

	public setCurrentView(view: VIEWS): void {
		Vars.CURRENT_VIEW = view;
		this.updateUI();
	}

	private updateUI(): void {
		this.stop();
		this.start();
	}

	public refreshUI(): void {
		this.officeView?.setVisitStarted(false);
		Vars.CURRENT_VIEW = Vars.DEFAULT_VEW;

		if (Vars.CURRENT_VIEW != VIEWS.OFFICE && Vars.IS_VR_MODE) {
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
			this.cursor = new Cursor(this.parentElement, true);
		}

		this.autoSetVRMode();
		this.autoSetMode();
		this.autoSetLocale();

		if (this.header) {
			this.header.update();
		} else {
			this.header = new Header(this.parentElement, true);
		}

		if (this.currentView) {
			if (this.currentView !== this.officeView) {
				this.currentView.destroy();
			}

			this.autoSetCurrentView();

			if (this.currentView == this.officeView) {
				document.body.style.cursor = "grab";
				Cursor.mouseOverDetectedElem = false;
				this.officeView.update();
			} else {
				this.currentView.update();
			}
		} else {
			this.homeView = new Home(this.mainElement, Vars.CURRENT_VIEW == VIEWS.HOME);

			this.officeView = new Office(this.mainElement);
			this.officeView.onReady(() => this.homeView.buildStartButton());

			this.officeView.init();

			this.homeView.onClickOnStartButton(() => this.officeView.setVisitStarted(true));

			this.autoSetCurrentView();

			if (Vars.CURRENT_VIEW != VIEWS.OFFICE && Vars.IS_VR_MODE) {
				this.toggleVR(false);
			}
		}

		this.parentElement.appendChild(this.mainElement);

		if (this.footer) {
			this.footer.update();
		} else {
			this.footer = new Footer(this.parentElement, true);
		}
	}

	private autoSetCurrentView(): void {
		switch (Vars.CURRENT_VIEW) {
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
			Vars.IS_VR_MODE = lsVREnable === "true";
		}
		this.officeView?.autoSetVRMode();
	}

	private autoSetMode(): void {
		if (!this.modeAutoSet) {
			const hour = new Date().getHours();
			Vars.IS_DARK_MODE = !(hour >= 6 && hour < 18);
			this.modeAutoSet = true;
		}

		/*
		const lsDarkMode = localStorage.getItem(LOCAL_STORAGE_KEY.IS_DARK_MODE)?.trim();
		if (lsDarkMode) {
			Vars.isDarkMode = lsDarkMode === "true";
		}
		 */

		if (Vars.IS_DARK_MODE) {
			this.parentElement.classList.remove(GLOBAL_CSS.LIGHT_MODE);
			this.parentElement.classList.add(GLOBAL_CSS.DARK_MODE);
		} else {
			this.parentElement.classList.remove(GLOBAL_CSS.DARK_MODE);
			this.parentElement.classList.add(GLOBAL_CSS.LIGHT_MODE);
		}
	}

	private autoSetLocale(): void {
		const userLocale = (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language).toUpperCase();
		Vars.LOCALE = userLocale.startsWith(LOCALE.FR) ? LOCALE.FR : LOCALE.EN;

		const lsLocale = localStorage.getItem(LOCAL_STORAGE_KEY.LOCALE)?.trim();
		if (lsLocale) {
			Vars.LOCALE = lsLocale == LOCALE.FR ? LOCALE.FR : LOCALE.EN;
		}
	}

}
