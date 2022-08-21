import { dcHome } from "./dcViews/dcHome/dcHome";
import { dcVirtualStudio } from "./dcViews/dcVirtualStudio/dcVirtualStudio";

export class dcUIManager {

	private readonly parentElement: HTMLElement;

	private static INSTANCE: dcUIManager;

	private started: boolean;

	private constructor(parentElement: HTMLElement) {
		this.parentElement = parentElement;
		this.started = false;
	}

	public static getInstance(parentElement: HTMLElement): dcUIManager {
		if (!dcUIManager.INSTANCE) {
			dcUIManager.INSTANCE = new dcUIManager(parentElement);
		}

		return dcUIManager.INSTANCE;
	}

	public start(): void {
		if (!this.started) {
			this.buildUI();
			this.started = true;
		}
	}

	private stop(): void {
		if (this.started) {
			this.started = false;
		}
	}

	private buildUI(): void {
		//const homeView = dcHome.getInstance(this.parentElement);
		//homeView.init();
		dcVirtualStudio.getInstance(this.parentElement).init();
	}

}