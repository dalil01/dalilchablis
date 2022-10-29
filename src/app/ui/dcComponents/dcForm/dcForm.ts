import {dcComponent} from "../dcComponent";
import {_UDom} from "../../dcUtils/_UDom";
import {DcIcons} from "../../dcIcons/dcIcons";
import {_UIcon} from "../../dcUtils/_UIcon";

enum FORM_CSS_CLASSNAMES {
    CONTAINER = "form-container",
    BUTTON_CONTAINER = "form-button-container",
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

export class dcForm extends dcComponent {

    private inputs: dcFormInputType[];
    private buttonName: string;

    private onSubmitCallback!: Function;

    constructor(parentElement: HTMLElement, inputs: dcFormInputType[], buttonName: string, autoInit: boolean = false) {
        super(parentElement, _UDom.CE("form", {className: FORM_CSS_CLASSNAMES.CONTAINER}));

        this.inputs = inputs;
        this.buttonName = buttonName;

        if (autoInit)
            this.init();
    }

    public setInputs(inputs: dcFormInputType[]): void {
        this.inputs = inputs;
    }

    public setButtonName(buttonName: string): void {
        this.buttonName = buttonName;
    }

    public onSubmit(callback: Function) {
        this.onSubmitCallback = callback;
    }

    public buildUI(): void {
        for (let i = 0; i < this.inputs.length; i++) {
            const input = this.inputs[i];

            const inputContainer = _UDom.CE("div");

            if (input.icon) {
                const iconSpan = _UDom.CE("span");
                iconSpan.appendChild(_UIcon.getIcon(input.icon));
                inputContainer.appendChild(iconSpan);
            }

            let inputElement: HTMLInputElement | HTMLTextAreaElement = _UDom.CE("input");
            switch (input.inputType) {
                case INPUT_TYPE.EMAIL:
                    inputElement.type = "email";
                    break
                case INPUT_TYPE.TEXTAREA:
                    inputElement = _UDom.CE("textarea");
                    break
                case INPUT_TYPE.TEXT:
                default:
                    (<HTMLInputElement>inputElement).type = "text";
            }

            inputElement.placeholder = input?.placeholder || '';

            inputContainer.appendChild(inputElement);

            this.getMainElement().appendChild(inputContainer);
        }

        if (this.buttonName) {
            const buttonContainer = _UDom.CE("div", { className: FORM_CSS_CLASSNAMES.BUTTON_CONTAINER });
            const button = _UDom.CE("button", {innerText: this.buttonName});
            _UDom.AC(buttonContainer, button);
            this.getMainElement().appendChild(buttonContainer);
        }
    }

}