import { dcUI } from "../dcUI";

export abstract class dcView extends dcUI {

	private onReadyCallback!: Function;

	protected constructor(parentElement: HTMLElement, mainElement: HTMLElement) {
		super(parentElement, mainElement);
	}

	/**
	 * Return a singleton of this.
	 */
	public static getInstance(parentElement: HTMLElement): dcView {
		throw new Error("This method must be implemented.");
	}

	public onReady(callback: Function): void {
		this.onReadyCallback = callback;
	}

	public executeOnReadyCallback(): void {
		if (this.onReadyCallback)
			this.onReadyCallback();
	}

}