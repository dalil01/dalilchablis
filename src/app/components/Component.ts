import { UI } from "./UI";

export abstract class component extends UI {
	
	protected constructor(parentElement: HTMLElement, mainElement: HTMLElement) {
		super(parentElement, mainElement);
	}

}
