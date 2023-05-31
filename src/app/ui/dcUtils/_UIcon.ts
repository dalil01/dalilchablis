import "../dcIcons/css/dcIcons.css";

import { DcIcons } from "../dcIcons/dcIcons";
import { _UDom } from "./_UDom";

// https://icones.js.org/

export class _UIcon {
	
	public static getIcon(name: DcIcons, HTMLProperties: any = {}): HTMLElement {
		const className = (HTMLProperties?.className) ? HTMLProperties.className : '';
		delete HTMLProperties?.className;
		return _UDom.CE('i', { className: name + ' ' + className, ...HTMLProperties });
	}
	
}