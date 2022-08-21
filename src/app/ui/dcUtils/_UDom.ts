export class _UDom {

	/**
	 * Create HTMLElement.
	 */
	static CE<K extends keyof HTMLElementTagNameMap>(tagName: K, properties: any = {}): HTMLElementTagNameMap[K] {
		let element = document.createElement(tagName);

		if (properties.dataTest) {
			element.dataset.test = properties.dataTest;
		}

		return Object.assign(element, properties);
	}

	/**
	 * Create custom HTMLElement.
	 */
	static CCE<K>(tagName: string, properties: any = {}): HTMLElement {
		let element = document.createElement(tagName);

		if (properties.dataTest) {
			element.dataset.test = properties.dataTest;
		}

		return Object.assign(element, properties);
	}

	/**
	 * Append a list of children to parent.
	 */
	static AC(parent: HTMLElement, ...children: HTMLElement[]): HTMLElement {
		for (let i = 0; i < children.length; i++) {
			parent.appendChild(children[i]);
		}

		return parent;
	}

}