import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";

export class dcDropdown extends dcComponent {

	constructor(parentElement: HTMLElement) {
		super(parentElement, _UDom.CCE("dropdown"));
	}

	protected buildUI(): void {
	}

}
