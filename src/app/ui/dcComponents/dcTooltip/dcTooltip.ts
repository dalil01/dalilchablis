import "./dcTooltip.css";

import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";
import { dcCursor } from "../dcCursor/dcCursor";

enum TOOLTIP_CSS_CLASSNAMES {
	TOOLTIP = "tooltip",
	TEXT = "tooltip-text",
}

export class dcTooltip extends dcComponent {
	
	private readonly content: HTMLElement;
	private readonly text: string;
	
	constructor(parentElement: HTMLElement, content: HTMLElement, tooltipText: string, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("tooltip", { className: TOOLTIP_CSS_CLASSNAMES.TOOLTIP }));
		
		this.content = content;
		this.text = tooltipText;
		
		if (autoInit)
			this.init();
	}
	
	
	public buildUI() {
		const tooltipText = _UDom.span({
			className: TOOLTIP_CSS_CLASSNAMES.TEXT,
			innerText: this.text
		});
		
		dcCursor.subscribeElementToDetectHover(this.content);
		
		_UDom.AC(this.getMainElement(), this.content, tooltipText);
	}
	
}