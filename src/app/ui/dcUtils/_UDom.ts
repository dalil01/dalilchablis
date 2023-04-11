import { GLOBAL_CSS } from "../../global/dcGlobalEnums";

type HTMLElementProperties = {
	className?: string,
	innerText?: string,
	src?: string,
	title?: string,
	type?: string,
	placeholder?: string
}

export class _UDom {
	
	public static a(properties: HTMLElementProperties = {}): HTMLAnchorElement {
		return _UDom.CE("a", properties);
	}
	
	public static abbr(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("abbr", properties);
	}
	
	public static address(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("address", properties);
	}
	
	public static area(properties: HTMLElementProperties = {}): HTMLAreaElement {
		return _UDom.CE("area", properties);
	}
	
	public static article(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("article", properties);
	}
	
	public static aside(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("aside", properties);
	}
	
	public static audio(properties: HTMLElementProperties = {}): HTMLAudioElement {
		return _UDom.CE("audio", properties);
	}
	
	public static b(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("b", properties);
	}
	
	public static base(properties: HTMLElementProperties = {}): HTMLBaseElement {
		return _UDom.CE("base", properties);
	}
	
	public static bdi(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("bdi", properties);
	}
	
	public static bdo(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("bdo", properties);
	}
	
	public static blockquote(properties: HTMLElementProperties = {}): HTMLQuoteElement {
		return _UDom.CE("blockquote", properties);
	}
	
	public static body(properties: HTMLElementProperties = {}): HTMLBodyElement {
		return _UDom.CE("body", properties);
	}
	
	public static br(properties: HTMLElementProperties = {}): HTMLBRElement {
		return _UDom.CE("br", properties);
	}
	
	public static button(properties: HTMLElementProperties = {}): HTMLButtonElement {
		return _UDom.CE("button", properties);
	}
	
	public static canvas(properties: HTMLElementProperties = {}): HTMLCanvasElement {
		return _UDom.CE("canvas", properties);
	}
	
	public static caption(properties: HTMLElementProperties = {}): HTMLTableCaptionElement {
		return _UDom.CE("caption", properties);
	}
	
	public static cite(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("cite", properties);
	}
	
	public static code(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("code", properties);
	}
	
	public static col(properties: HTMLElementProperties = {}): HTMLTableColElement {
		return _UDom.CE("col", properties);
	}
	
	public static colgroup(properties: HTMLElementProperties = {}): HTMLTableColElement {
		return _UDom.CE("colgroup", properties);
	}
	
	public static data(properties: HTMLElementProperties = {}): HTMLDataElement {
		return _UDom.CE("data", properties);
	}
	
	public static datalist(properties: HTMLElementProperties = {}): HTMLDataListElement {
		return _UDom.CE("datalist", properties);
	}
	
	public static dd(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("dd", properties);
	}
	
	public static del(properties: HTMLElementProperties = {}): HTMLModElement {
		return _UDom.CE("del", properties);
	}
	
	public static details(properties: HTMLElementProperties = {}): HTMLDetailsElement {
		return _UDom.CE("details", properties);
	}
	
	public static dfn(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("dfn", properties);
	}
	
	public static dialog(properties: HTMLElementProperties = {}): HTMLDialogElement {
		return _UDom.CE("dialog", properties);
	}
	
	public static dir(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("dir", properties);
	}
	
	public static div(properties: HTMLElementProperties = {}): HTMLDivElement {
		return _UDom.CE("div", properties);
	}
	
	public static dl(properties: HTMLElementProperties = {}): HTMLDListElement {
		return _UDom.CE("dl", properties);
	}
	
	public static dt(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("dt", properties);
	}
	
	public static em(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("em", properties);
	}
	
	public static embed(properties: HTMLElementProperties = {}): HTMLEmbedElement {
		return _UDom.CE("embed", properties);
	}
	
	public static fieldset(properties: HTMLElementProperties = {}): HTMLFieldSetElement {
		return _UDom.CE("fieldset", properties);
	}
	
	public static figcaption(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("figcaption", properties);
	}
	
	public static figure(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("figure", properties);
	}
	
	public static font(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("font", properties);
	}
	
	public static footer(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("footer", properties);
	}
	
	public static form(properties: HTMLElementProperties = {}): HTMLFormElement {
		return _UDom.CE("form", properties);
	}
	
	public static frame(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("frame", properties);
	}
	
	public static frameset(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("frameset", properties);
	}
	
	public static h1(properties: HTMLElementProperties = {}): HTMLHeadingElement {
		return _UDom.CE("h1", properties);
	}
	
	public static h2(properties: HTMLElementProperties = {}): HTMLHeadingElement {
		return _UDom.CE("h2", properties);
	}
	
	public static h3(properties: HTMLElementProperties = {}): HTMLHeadingElement {
		return _UDom.CE("h3", properties);
	}
	
	public static h4(properties: HTMLElementProperties = {}): HTMLHeadingElement {
		return _UDom.CE("h4", properties);
	}
	
	public static h5(properties: HTMLElementProperties = {}): HTMLHeadingElement {
		return _UDom.CE("h5", properties);
	}
	
	public static h6(properties: HTMLElementProperties = {}): HTMLHeadingElement {
		return _UDom.CE("h6", properties);
	}
	
	public static head(properties: HTMLElementProperties = {}): HTMLHeadElement {
		return _UDom.CE("head", properties);
	}
	
	public static header(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("header", properties);
	}
	
	public static hgroup(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("hgroup", properties);
	}
	
	public static hr(properties: HTMLElementProperties = {}): HTMLHRElement {
		return _UDom.CE("hr", properties);
	}
	
	public static html(properties: HTMLElementProperties = {}): HTMLHtmlElement {
		return _UDom.CE("html", properties);
	}
	
	public static i(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("i", properties);
	}
	
	public static iframe(properties: HTMLElementProperties = {}): HTMLIFrameElement {
		return _UDom.CE("iframe", properties);
	}
	
	public static img(properties: HTMLElementProperties = {}): HTMLImageElement {
		return _UDom.CE("img", properties);
	}
	
	public static input(properties: HTMLElementProperties = {}): HTMLInputElement {
		return _UDom.CE("input", properties);
	}
	
	public static ins(properties: HTMLElementProperties = {}): HTMLModElement {
		return _UDom.CE("ins", properties);
	}
	
	public static kbd(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("kbd", properties);
	}
	
	public static label(properties: HTMLElementProperties = {}): HTMLLabelElement {
		return _UDom.CE("label", properties);
	}
	
	public static legend(properties: HTMLElementProperties = {}): HTMLLegendElement {
		return _UDom.CE("legend", properties);
	}
	
	public static li(properties: HTMLElementProperties = {}): HTMLLIElement {
		return _UDom.CE("li", properties);
	}
	
	public static link(properties: HTMLElementProperties = {}): HTMLLinkElement {
		return _UDom.CE("link", properties);
	}
	
	public static main(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("main", properties);
	}
	
	public static map(properties: HTMLElementProperties = {}): HTMLMapElement {
		return _UDom.CE("map", properties);
	}
	
	public static mark(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("mark", properties);
	}
	
	public static marquee(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("marquee", properties);
	}
	
	public static menu(properties: HTMLElementProperties = {}): HTMLMenuElement {
		return _UDom.CE("menu", properties);
	}
	
	public static meta(properties: HTMLElementProperties = {}): HTMLMetaElement {
		return _UDom.CE("meta", properties);
	}
	
	public static meter(properties: HTMLElementProperties = {}): HTMLMeterElement {
		return _UDom.CE("meter", properties);
	}
	
	public static nav(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("nav", properties);
	}
	
	public static noscript(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("noscript", properties);
	}
	
	public static object(properties: HTMLElementProperties = {}): HTMLObjectElement {
		return _UDom.CE("object", properties);
	}
	
	public static ol(properties: HTMLElementProperties = {}): HTMLOListElement {
		return _UDom.CE("ol", properties);
	}
	
	public static optgroup(properties: HTMLElementProperties = {}): HTMLOptGroupElement {
		return _UDom.CE("optgroup", properties);
	}
	
	public static option(properties: HTMLElementProperties = {}): HTMLOptionElement {
		return _UDom.CE("option", properties);
	}
	
	public static output(properties: HTMLElementProperties = {}): HTMLOutputElement {
		return _UDom.CE("output", properties);
	}
	
	public static p(properties: HTMLElementProperties = {}): HTMLParagraphElement {
		return _UDom.CE("p", properties);
	}
	
	public static param(properties: HTMLElementProperties = {}): HTMLParamElement {
		return _UDom.CE("param", properties);
	}
	
	public static picture(properties: HTMLElementProperties = {}): HTMLPictureElement {
		return _UDom.CE("picture", properties);
	}
	
	public static pre(properties: HTMLElementProperties = {}): HTMLPreElement {
		return _UDom.CE("pre", properties);
	}
	
	public static progress(properties: HTMLElementProperties = {}): HTMLProgressElement {
		return _UDom.CE("progress", properties);
	}
	
	public static q(properties: HTMLElementProperties = {}): HTMLQuoteElement {
		return _UDom.CE("q", properties);
	}
	
	public static rp(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("rp", properties);
	}
	
	public static rt(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("rt", properties);
	}
	
	public static ruby(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("ruby", properties);
	}
	
	public static s(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("s", properties);
	}
	
	public static samp(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("samp", properties);
	}
	
	public static script(properties: HTMLElementProperties = {}): HTMLScriptElement {
		return _UDom.CE("script", properties);
	}
	
	public static section(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("section", properties);
	}
	
	public static select(properties: HTMLElementProperties = {}): HTMLSelectElement {
		return _UDom.CE("select", properties);
	}
	
	public static slot(properties: HTMLElementProperties = {}): HTMLSlotElement {
		return _UDom.CE("slot", properties);
	}
	
	public static small(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("small", properties);
	}
	
	public static source(properties: HTMLElementProperties = {}): HTMLSourceElement {
		return _UDom.CE("source", properties);
	}
	
	public static span(properties: HTMLElementProperties = {}): HTMLSpanElement {
		return _UDom.CE("span", properties);
	}
	
	public static strong(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("strong", properties);
	}
	
	public static style(properties: HTMLElementProperties = {}): HTMLStyleElement {
		return _UDom.CE("style", properties);
	}
	
	public static sub(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("sub", properties);
	}
	
	public static summary(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("summary", properties);
	}
	
	public static sup(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("sup", properties);
	}
	
	public static table(properties: HTMLElementProperties = {}): HTMLTableElement {
		return _UDom.CE("table", properties);
	}
	
	public static tbody(properties: HTMLElementProperties = {}): HTMLTableSectionElement {
		return _UDom.CE("tbody", properties);
	}
	
	public static td(properties: HTMLElementProperties = {}): HTMLTableCellElement {
		return _UDom.CE("td", properties);
	}
	
	public static template(properties: HTMLElementProperties = {}): HTMLTemplateElement {
		return _UDom.CE("template", properties);
	}
	
	public static textarea(properties: HTMLElementProperties = {}): HTMLTextAreaElement {
		return _UDom.CE("textarea", properties);
	}
	
	public static tfoot(properties: HTMLElementProperties = {}): HTMLTableSectionElement {
		return _UDom.CE("tfoot", properties);
	}
	
	public static th(properties: HTMLElementProperties = {}): HTMLTableCellElement {
		return _UDom.CE("th", properties);
	}
	
	public static thead(properties: HTMLElementProperties = {}): HTMLTableSectionElement {
		return _UDom.CE("thead", properties);
	}
	
	public static time(properties: HTMLElementProperties = {}): HTMLTimeElement {
		return _UDom.CE("time", properties);
	}
	
	public static title(properties: HTMLElementProperties = {}): HTMLTitleElement {
		return _UDom.CE("title", properties);
	}
	
	public static tr(properties: HTMLElementProperties = {}): HTMLTableRowElement {
		return _UDom.CE("tr", properties);
	}
	
	public static track(properties: HTMLElementProperties = {}): HTMLTrackElement {
		return _UDom.CE("track", properties);
	}
	
	public static u(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("u", properties);
	}
	
	public static ul(properties: HTMLElementProperties = {}): HTMLUListElement {
		return _UDom.CE("ul", properties);
	}
	
	public static var(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("var", properties);
	}
	
	public static video(properties: HTMLElementProperties = {}): HTMLVideoElement {
		return _UDom.CE("video", properties);
	}
	
	public static wbr(properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.CE("wbr", properties);
	}
	
	/**
	 * Create HTMLElement.
	 */
	public static CE<K extends keyof HTMLElementTagNameMap>(tagName: K, properties: HTMLElementProperties = {}): HTMLElementTagNameMap[K] {
		// @ts-ignore
		return _UDom.createElement(tagName, properties);
	}
	
	/**
	 * Create custom HTMLElement.
	 */
	public static CCE<K>(tagName: string, properties: HTMLElementProperties = {}): HTMLElement {
		return _UDom.createElement(tagName, properties);
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
	
	// TODO : Refactor (use setInterval)
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
						className: GLOBAL_CSS.BLINK,
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
		
		asyncCall().then(() => null);
	}
	
	private static createElement(tagName: any, properties: any = {}): HTMLElement {
		let element = document.createElement(tagName);
		
		if (properties.dataTest) {
			element.dataset.test = properties.dataTest;
		}
		
		return Object.assign(element, properties);
	}
	
}
