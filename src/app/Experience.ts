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

		this.buildAwwwardsRibbon();
	}

	private buildAwwwardsRibbon(): void {
		const ribbon = UDom.div({ id: "awwwards", style: "position: fixed; z-index: 10; transform: translateY(-50%); top: 50%;  right: 0" });

		const bgColor = (Vars.IS_DARK_MODE) ? "white" : "black";
		const textColor = (Vars.IS_DARK_MODE) ? "black" : "white";

		ribbon.innerHTML = `<a href=\"https://www.awwwards.com/sites/dalil-chablis-portfolio\" target=\"_blank\"><svg width="53.08" height="171.358"><path class=\"js-color-bg\" fill="${ bgColor }" d=\"M0 0h53.08v171.358H0z\"></path><g class=\"js-color-text\" fill="${ textColor }"><path d=\"M20.047 153.665v-1.9h3.888v-4.093h-3.888v-1.9h10.231v1.9h-4.59v4.093h4.59v1.9zM29.898 142.236c-.331.565-.784.997-1.359 1.294s-1.222.446-1.944.446c-.721 0-1.369-.149-1.943-.446a3.316 3.316 0 0 1-1.36-1.294c-.331-.564-.497-1.232-.497-2.002s.166-1.438.497-2.002a3.316 3.316 0 0 1 1.36-1.294c.574-.297 1.223-.445 1.943-.445.723 0 1.369.148 1.944.445a3.307 3.307 0 0 1 1.359 1.294c.331.564.497 1.232.497 2.002s-.166 1.438-.497 2.002m-1.703-3.347c-.435-.33-.967-.496-1.601-.496-.633 0-1.166.166-1.601.496-.433.332-.649.78-.649 1.346 0 .564.217 1.013.649 1.345.435.331.968.497 1.601.497.634 0 1.166-.166 1.601-.497.435-.332.649-.78.649-1.345.001-.566-.214-1.014-.649-1.346M22.911 134.852v-1.813h1.186a3.335 3.335 0 0 1-.951-1.009 2.423 2.423 0 0 1-.352-1.271c0-.682.19-1.229.57-1.645.381-.413.932-.621 1.652-.621h5.262v1.812h-4.721c-.419 0-.727.096-.921.285-.195.19-.292.447-.292.769 0 .302.115.58.35.833.234.254.577.458 1.03.613.454.156.993.234 1.616.234h2.938v1.813h-7.367zM29.898 125.136a3.314 3.314 0 0 1-1.359 1.294c-.575.297-1.222.445-1.944.445-.721 0-1.369-.148-1.943-.445a3.322 3.322 0 0 1-1.36-1.294c-.331-.565-.497-1.232-.497-2.002 0-.771.166-1.438.497-2.003a3.313 3.313 0 0 1 1.36-1.293c.574-.297 1.223-.446 1.943-.446.723 0 1.369.149 1.944.446s1.028.728 1.359 1.293.497 1.232.497 2.003c.001.769-.166 1.436-.497 2.002m-1.703-3.347c-.435-.331-.967-.497-1.601-.497-.633 0-1.166.166-1.601.497-.433.331-.649.778-.649 1.345 0 .564.217 1.013.649 1.344.435.332.968.498 1.601.498.634 0 1.166-.166 1.601-.498.435-.331.649-.779.649-1.344.001-.567-.214-1.014-.649-1.345M22.911 117.75v-1.812h1.199c-.419-.265-.742-.586-.972-.966s-.345-.784-.345-1.213c0-.272.05-.569.146-.892l1.682.336a1.429 1.429 0 0 0-.205.76c0 .576.261 1.048.783 1.418.521.37 1.342.557 2.461.557h2.617v1.812h-7.366zM29.812 111.252c-.391.511-.857.851-1.403 1.016l-.776-1.446c.381-.138.68-.329.893-.577.215-.249.321-.544.321-.885a1.2 1.2 0 0 0-.168-.658c-.112-.175-.294-.263-.548-.263-.225 0-.406.105-.548.313-.142.21-.291.534-.446.973-.019.068-.058.17-.117.307-.224.565-.506 1.004-.848 1.315-.34.313-.779.467-1.314.467-.381 0-.727-.102-1.039-.306a2.185 2.185 0 0 1-.744-.84 2.554 2.554 0 0 1-.279-1.207c0-.497.105-.949.314-1.359.211-.408.506-.725.886-.949l.993 1.082c-.43.292-.644.686-.644 1.184a.84.84 0 0 0 .154.504.471.471 0 0 0 .401.212c.176 0 .338-.103.49-.307.15-.205.334-.604.547-1.199.205-.564.474-1.001.805-1.308.332-.308.756-.46 1.271-.46.721 0 1.299.229 1.732.687s.65 1.057.65 1.797c.001.759-.194 1.396-.583 1.907M35.481 17.006l-4.782 14.969h-3.266l-2.584-9.682-2.584 9.682h-3.268l-4.782-14.969h3.713l2.673 10.276 2.525-10.276h3.445l2.524 10.276 2.674-10.276zM37.978 27.163c1.426 0 2.496 1.068 2.496 2.495 0 1.425-1.07 2.495-2.496 2.495-1.425 0-2.494-1.07-2.494-2.495-.001-1.427 1.069-2.495 2.494-2.495\"></path></g></svg></a>`;

		Cursor.subscribeElementToDetectHover(ribbon);

		this.mainElement.appendChild(ribbon);
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
