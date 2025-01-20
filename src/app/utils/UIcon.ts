import { UDom } from "./UDom";
import { Icons } from "../icons/Icons";

// https://icones.js.org/

export class UIcon {
	
	public static getIcon(name: Icons, HTMLProperties: any = {}): HTMLElement {
		const className = (HTMLProperties?.className) ? HTMLProperties.className : '';
		delete HTMLProperties?.className;
		return UDom.CE('i', { className: name + ' ' + className, ...HTMLProperties });
	}
	
}