import { UI } from "../UI";

export abstract class Component extends UI {
	
	protected constructor(parentElement: HTMLElement, mainElement: HTMLElement) {
		super(parentElement, mainElement);
	}

}
