import "./Form.css";

import { component } from "../../Component";
import { UDom } from "../../../dcUtils/UDom";
import { DcIcons } from "../../../dcIcons/dcIcons";
import { UIcon } from "../../../dcUtils/UIcon";
import { dcCursor } from "../cursor/cursor";

enum FORM_CSS {
	CONTAINER = "form-container",
	FIELD_CONTAINER = "form-field-container",
	INPUT = "form-input",
	TEXTAREA = "form-textarea",
	BUTTON_CONTAINER = "form-button-container",
	BUTTON = "form-button",
	BUTTON_ROUNDED = "form-button-rounded",
}

export type dcFormInputType = {
	icon?: DcIcons,
	inputType: INPUT_TYPE,
	placeholder?: string;
}

export enum INPUT_TYPE {
	TEXT = "text",
	EMAIL = "email",
	TEXTAREA = "textarea"
}

export type dcFormButton = {
	icon?: DcIcons;
	text?: string;
	rounded: boolean;
}

export class form extends component {
	
	private inputs: dcFormInputType[];
	private button: dcFormButton;
	
	private onSubmitCallback!: Function;
	
	constructor(parentElement: HTMLElement, inputs: dcFormInputType[], button: dcFormButton, autoInit: boolean = false) {
		super(parentElement, UDom.CE("form", { className: FORM_CSS.CONTAINER }));
		
		this.inputs = inputs;
		this.button = button;
		
		if (autoInit)
			this.init();
	}
	
	public setInputs(inputs: dcFormInputType[]): void {
		this.inputs = inputs;
	}
	
	public setButton(button: dcFormButton): void {
		this.button = button;
	}
	
	public onSubmit(callback: Function) {
		this.onSubmitCallback = callback;
	}
	
	public buildUI(): void {
		for (let i = 0; i < this.inputs.length; i++) {
			const input = this.inputs[i];
			const inputContainer = UDom.div({ className: FORM_CSS.FIELD_CONTAINER });

			let inputElement: HTMLInputElement | HTMLTextAreaElement = UDom.input({ className: FORM_CSS.INPUT });
			switch (input.inputType) {
				case INPUT_TYPE.EMAIL:
					inputElement.type = "email";
					break
				case INPUT_TYPE.TEXTAREA:
					// @ts-ignore
					inputElement = UDom.CE("textarea", { className: FORM_CSS.TEXTAREA, placeholder:  input?.placeholder || '' });
					break
				case INPUT_TYPE.TEXT:
				default:
					(<HTMLInputElement>inputElement).type = "text";
			}

			inputElement.placeholder = input?.placeholder || '';

			inputContainer.appendChild(inputElement);

			this.mainElement.appendChild(inputContainer);
		}
		
		if (this.button) {
			const buttonContainer = UDom.div({ className: FORM_CSS.BUTTON_CONTAINER });

			let button = UDom.button({ className: FORM_CSS.BUTTON });

			if (this.button?.icon) {
				button.appendChild(UIcon.getIcon(this.button.icon));
			}

			if (this.button?.text) {
				button.appendChild(UDom.span({ innerText: this.button.text }));
			}

			if (this.button.rounded) {
				button.classList.add(FORM_CSS.BUTTON_ROUNDED);
			}

			dcCursor.subscribeElementToDetectHover(button);

			UDom.AC(this.mainElement, UDom.AC(buttonContainer, button));
		}
	}
	
}