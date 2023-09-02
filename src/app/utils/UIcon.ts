import "../dcIcons/css/dcIcons.css";

import { DcIcons } from "../dcIcons/dcIcons";
import { UDom } from "./UDom";

// https://icones.js.org/

export class UIcon {
	
	public static getIcon(name: DcIcons, HTMLProperties: any = {}): HTMLElement {
		const className = (HTMLProperties?.className) ? HTMLProperties.className : '';
		delete HTMLProperties?.className;
		return UDom.CE('i', { className: name + ' ' + className, ...HTMLProperties });
	}
	
}