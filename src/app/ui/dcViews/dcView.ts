import { dcAbstractUI } from "../dcAbstractUI";

export abstract class dcView extends dcAbstractUI {

	protected constructor(parentElement: HTMLElement, mainElement: HTMLElement) {
		super(parentElement, mainElement);
	}

	/**
	 * Return a singleton of this.
	 */
	public static getInstance(parentElement: HTMLElement): dcView {
		throw new Error("This method must be implemented.");
	}

}