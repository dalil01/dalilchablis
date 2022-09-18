import {GLOBAL_CSS_CLASSNAMES} from "../../global/dcGlobalEnums";

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

	public static elementHasChild(element: HTMLElement, child: HTMLElement): boolean {
		for (let i = 0; i < element.children.length; i++) {
			if (element.children[i] == child)
				return true;
		}

		return false;
	}

	static removeAllChildren(parent: HTMLElement) {
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
	}

	// TODO : Refactor
	public static writeTextInElements(elements: { startCallback: null | Function, endCallback: null | Function, element: HTMLElement | null, text: string }[], ms: number = 100, blink: boolean = true, blinkAlwaysActive: boolean = true, blinkChar: string = '_'): void {
		const wait = () => new Promise((resolve) => setTimeout(resolve, ms));

		let elemIndex = 0;
		let startIndex = 0;

		const asyncCall = async () => {
			await wait();

			let element = elements[elemIndex];

			if (!element) {
				return;
			}

			if (element.startCallback && !element.element) {
				element.element = element.startCallback();
			}

			if (element.element && startIndex < element.text.length) {
				element.element.innerText = element.text.substring(0, startIndex + 1);

				if (blink) {
					element.element.appendChild(_UDom.CE("span", {
						className: GLOBAL_CSS_CLASSNAMES.BLINK,
						innerText: blinkChar
					}));

					if (!blinkAlwaysActive && startIndex + 1 == element.text.length && element.element.lastChild)
						element?.element.removeChild(element.element.lastChild);
				}
			}

			startIndex += 1

			if (startIndex >= element.text.length) {
				if (element.endCallback) {
					element.endCallback();
				}

				if (elemIndex >= elements.length) {
					return;
				}

				elemIndex += 1;
				startIndex = 0;
			}

			await asyncCall();
		}

		asyncCall();
	}

}
