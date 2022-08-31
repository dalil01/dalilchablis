import {DOM_CSS_CLASSNAMES} from "../../dcGlobalEnums";

export class _UDom {

	/**
	 * Create HTMLElement.
	 */
	public static CE<K extends keyof HTMLElementTagNameMap>(tagName: K, properties: any = {}): HTMLElementTagNameMap[K] {
		// @ts-ignore
		return _UDom.createElement(tagName, properties);
	}

	/**
	 * Create custom HTMLElement.
	 */
	public static CCE<K>(tagName: string, properties: any = {}): HTMLElement {
		return _UDom.createElement(tagName, properties);
	}

	private static createElement(tagName: any, properties: any = {}): HTMLElement {
		let element = document.createElement(tagName);

		if (properties.dataTest) {
			element.dataset.test = properties.dataTest;
		}

		return Object.assign(element, properties);
	}

	/**
	 * Append a list of children to parent.
	 */
	public static AC(parent: HTMLElement, ...children: HTMLElement[]): HTMLElement {
		for (let i = 0; i < children.length; i++) {
			parent.appendChild(children[i]);
		}

		return parent;
	}

}