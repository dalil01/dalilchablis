import "./Tooltip.css";

import { component } from "../../Component";
import { UDom } from "../../../utils/UDom";
import { Cursor } from "../cursor/cursor";

enum TOOLTIP_CSS_CLASSNAMES {
	TOOLTIP = "tooltip",
	TEXT = "tooltip-text",
}

export class Tooltip extends component {
	
	private readonly content: HTMLElement;
	private readonly text: string;
	
	constructor(parentElement: HTMLElement, content: HTMLElement, tooltipText: string, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("tooltip", { className: TOOLTIP_CSS_CLASSNAMES.TOOLTIP }));
		
		this.content = content;
		this.text = tooltipText;
		
		if (autoInit)
			this.init();
	}
	
	
	public buildUI() {
		const tooltipText = UDom.span({
			className: TOOLTIP_CSS_CLASSNAMES.TEXT,
			innerText: this.text
		});
		
		Cursor.subscribeElementToDetectHover(this.content);
		
		UDom.AC(this.getMainElement(), this.content, tooltipText);
	}
	
}