import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";

export class dcPopup extends dcComponent {

	constructor(parentElement: HTMLElement) {
		super(parentElement, _UDom.CCE("popup"));
	}

	protected buildUI(): void {
	}

}