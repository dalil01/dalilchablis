import { dcAbstractUI } from "../dcAbstractUI";

export abstract class dcComponent extends dcAbstractUI {

	protected constructor(parentElement: HTMLElement, mainElement: HTMLElement) {
		super(parentElement, mainElement);
	}

}