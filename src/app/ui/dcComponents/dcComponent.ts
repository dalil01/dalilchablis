import { dcUI } from "../dcUI";

export abstract class dcComponent extends dcUI {
	
	protected constructor(parentElement: HTMLElement, mainElement: HTMLElement) {
		super(parentElement, mainElement);
	}
	
}
