import "./Home.css";

import { view, VIEWS } from "../../View";
import { Experience, GLOBAL_CSS } from "../../../Experience";
import { UDom } from "../../../utils/UDom";
import { Translator } from "../../../translator/Translator";
import { Translation } from "../../../translator/Translation";
import { UIcon } from "../../../utils/UIcon";
import { Icons } from "../../../icons/Icons";
import { Cursor } from "../../_components/Cursor/Cursor";

enum HOME_CSS {
	CONTAINER = "home-container",
	TEXT_CONTAINER = "home-text-container",
	NAME_CONTAINER = "home-name-container",
	LOADING = "home-loading",
	START_BTN = "home-start-button",
}

export class home extends view {

	private loadingIcon!: HTMLElement;
	private startBtn!: HTMLElement;

	private writeTextAnimationEnd: boolean = false;
	private startBtnVisible: boolean = false;

	private onClickOnStartButtonCallback: Function = () => {
	};

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("home", { className: HOME_CSS.CONTAINER }));

		if (autoInit)
			this.init();
	}

	public onClickOnStartButton(callback: Function): void {
		this.onClickOnStartButtonCallback = callback;
	}

	public override update(): void {
		this.destroy();
		this.init();
	}

	public buildUI(): void {
		this.buildText();
		if (this.startBtnVisible) {
			this.buildStartButton();
		} else {
			this.buildLoading();
		}
	}

	private buildText(): void {
		const containerText = UDom.p({ className: HOME_CSS.TEXT_CONTAINER });

		const hello = Translator.T(Translation.HELLO) + ", " + Translator.T(Translation.WELCOME_TO_MY_WEBSITE) + ".\n " + Translator.T(Translation.I_AM) + ' ';
		const name = "Dalil" + String.fromCharCode(160) + "CHABLIS";
		const job = ", " + Translator.T(Translation.FULLSTACK_DEVELOPER) + String.fromCharCode(160) + "!" + String.fromCharCode(160);

		UDom.writeTextInElements([
				{
					startCallback: null,
					endCallback: null,
					element: containerText,
					text: hello
				},
				{
					startCallback: () => {
						const nameContainer = UDom.span({ className: HOME_CSS.NAME_CONTAINER });
						containerText.appendChild(nameContainer);
						return nameContainer;
					},
					element: null,
					text: name,
					endCallback: null
				},
				{
					startCallback: () => {
						const jobContainer = UDom.span();
						containerText.appendChild(jobContainer);
						return jobContainer;
					},
					endCallback: () => {
						containerText.appendChild(UIcon.getIcon(Icons.DcIconSmile));
						containerText.appendChild(UDom.span({
							className: GLOBAL_CSS.BLINK,
							innerText: '_'
						}));
						this.writeTextAnimationEnd = true;
					},
					element: null,
					text: job
				}
			],
			62,
			true,
			false);

		UDom.AC(this.mainElement, containerText);
	}

	private buildLoading(): void {
		this.loadingIcon = UIcon.getIcon(Icons.DcIconLoading, { className: HOME_CSS.LOADING });
		this.mainElement.appendChild(this.loadingIcon);
	}

	private removeLoading(): void {
		this.mainElement.removeChild(this.loadingIcon);
	}

	public buildStartButton(): void {
		if (this.startBtn) {
			this.mainElement.appendChild(this.startBtn);
			return;
		}

		if (!this.startBtnVisible) {
			this.removeLoading();
		}

		this.startBtn = UDom.div({ className: HOME_CSS.START_BTN });
		const startIcon = UIcon.getIcon(Icons.DcIconArrowUp);

		Cursor.subscribeElementToDetectHover(this.startBtn);
		this.startBtn.addEventListener("click", () => {
			Experience.get().setCurrentView(VIEWS.OFFICE);
			this.onClickOnStartButtonCallback();
		});

		UDom.AC(this.mainElement, UDom.AC(this.startBtn, startIcon));

		this.startBtnVisible = true;
	}

}