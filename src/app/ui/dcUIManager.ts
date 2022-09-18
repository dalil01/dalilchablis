import { dcOffice } from "./dcViews/dcOffice/dcOffice";
import {dcHeader} from "./dcComponents/dcHeader/dcHeader";
import {dcFooter} from "./dcComponents/dcFooter/dcFooter";
import {dcCursor} from "./dcComponents/dcCursor/dcCursor";

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
		new dcHeader(this.parentElement, true);
		//dcOffice.getInstance(this.parentElement, true);
		new dcFooter(this.parentElement, true);
		new dcCursor(this.parentElement, true);
	}

}
