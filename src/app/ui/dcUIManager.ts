import {dcHeader} from "./dcComponents/dcHeader/dcHeader";
import {dcFooter} from "./dcComponents/dcFooter/dcFooter";
import {dcCursor} from "./dcComponents/dcCursor/dcCursor";
import {_UDom} from "./dcUtils/_UDom";
import {dcGlobalConfig} from "../global/dcGlobalConfig";
import {GLOBAL_CSS_CLASSNAMES, LOCALE} from "../global/dcGlobalEnums";

export class dcUIManager {

	private readonly parentElement: HTMLElement;

	private static INSTANCE: dcUIManager;

	private started: boolean;

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
		this.refreshUI();
	}

	public toggleLocale(): void {
		dcGlobalConfig.locale = (dcGlobalConfig.locale === LOCALE.EN) ? LOCALE.FR : LOCALE.EN;
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
		if (dcGlobalConfig.isDarkMode) {
			this.parentElement.classList.remove(GLOBAL_CSS_CLASSNAMES.BG_LIGHT);
			this.parentElement.classList.add(GLOBAL_CSS_CLASSNAMES.BG_DARK);
		} else {
			this.parentElement.classList.remove(GLOBAL_CSS_CLASSNAMES.BG_DARK);
			this.parentElement.classList.add(GLOBAL_CSS_CLASSNAMES.BG_LIGHT);
		}

		new dcHeader(this.parentElement, true);
		//dcOffice.getInstance(this.parentElement, true);
		new dcFooter(this.parentElement, true);
		new dcCursor(this.parentElement, true);
	}

}
