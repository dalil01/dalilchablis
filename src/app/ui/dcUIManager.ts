import { dcHeader } from "./dcComponents/dcHeader/dcHeader";
import { dcFooter } from "./dcComponents/dcFooter/dcFooter";
import { dcCursor } from "./dcComponents/dcCursor/dcCursor";
import { _UDom } from "./dcUtils/_UDom";
import { dcGlobalConfig } from "../global/dcGlobalConfig";
import { GLOBAL_CSS_CLASSNAMES, LOCAL_STORAGE_KEY, LOCALE, VIEWS } from "../global/dcGlobalEnums";
import { dcIntro } from "./dcComponents/dcIntro/dcIntro";
import { dcOffice } from "./dcViews/dcOffice/dcOffice";
import { dcView } from "./dcViews/dcView";

export class dcUIManager {
	
	private static INSTANCE: dcUIManager;
	
	private readonly parentElement: HTMLElement;
	private mainElement!: HTMLElement;
	private started: boolean;
	
	private cursor!: dcCursor;
	private currentView!: dcView;
	
	private constructor(parentElement: HTMLElement) {
		this.parentElement = parentElement;
		this.started = false;
	}
	
	public static getInstance(parentElement: HTMLElement | null = null): dcUIManager {
		if (parentElement && !dcUIManager.INSTANCE) {
			dcUIManager.INSTANCE = new dcUIManager(parentElement);
		}
		
		return dcUIManager.INSTANCE;
	}
	
	public toggleMode(): void {
		dcGlobalConfig.isDarkMode = !dcGlobalConfig.isDarkMode;
		localStorage.setItem(LOCAL_STORAGE_KEY.IS_DARK_MODE, dcGlobalConfig.isDarkMode.toString());
		this.refreshUI();
	}
	
	public toggleLocale(): void {
		dcGlobalConfig.locale = (dcGlobalConfig.locale === LOCALE.EN) ? LOCALE.FR : LOCALE.EN;
		localStorage.setItem(LOCAL_STORAGE_KEY.LOCALE, dcGlobalConfig.locale);
		this.refreshUI();
	}
	
	public refreshUI(): void {
		this.stop();
		this.start();
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
		globalThis.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
			dcGlobalConfig.isDarkMode = event.matches;
			this.setMode();
		});
		this.setMode();
		
		this.setLocale();
		
		new dcHeader(this.parentElement, true);
		
		this.mainElement = _UDom.main();
		
		const intro = new dcIntro(this.mainElement, true);
		
		switch (dcGlobalConfig.view) {
			case VIEWS.OFFICE:
			default:
				this.currentView = dcOffice.getInstance(this.mainElement, true);
				intro.displayStopButton();
		}
		
		this.currentView.onReady(() => intro.displayStopButton());
		intro.setOnStoppedCallback(() => this.currentView.init());
		
		this.parentElement.appendChild(this.mainElement);
		
		new dcFooter(this.parentElement, true);
		
		if (!this.cursor) {
			this.cursor = new dcCursor(this.parentElement, true);
		} else {
			this.cursor.updateMode();
			this.parentElement.appendChild(this.cursor.getMainElement());
		}
	}
	
	private setMode(): void {
		const lsDarkMode = localStorage.getItem(LOCAL_STORAGE_KEY.IS_DARK_MODE);
		if (lsDarkMode) {
			dcGlobalConfig.isDarkMode = lsDarkMode == "true";
		}
		
		if (dcGlobalConfig.isDarkMode) {
			this.parentElement.classList.remove(GLOBAL_CSS_CLASSNAMES.BG_LIGHT);
			this.parentElement.classList.add(GLOBAL_CSS_CLASSNAMES.BG_DARK);
		} else {
			this.parentElement.classList.remove(GLOBAL_CSS_CLASSNAMES.BG_DARK);
			this.parentElement.classList.add(GLOBAL_CSS_CLASSNAMES.BG_LIGHT);
		}
	}
	
	private setLocale(): void {
		const userLocale = (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language).toUpperCase();
		dcGlobalConfig.locale = userLocale.startsWith(LOCALE.FR) ? LOCALE.FR : LOCALE.EN;
		
		const lsLocale = localStorage.getItem(LOCAL_STORAGE_KEY.LOCALE);
		if (lsLocale) {
			dcGlobalConfig.locale = lsLocale == LOCALE.FR ? LOCALE.FR : LOCALE.EN;
		}
	}
	
}
