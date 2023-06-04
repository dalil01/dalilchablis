import "./dcHome.css";

import { _UDom } from "../../dcUtils/_UDom";
import { _UIcon } from "../../dcUtils/_UIcon";
import { DcIcons } from "../../dcIcons/dcIcons";
import { GLOBAL_CSS, VIEWS } from "../../../global/dcGlobalEnums";
import { dcCursor } from "../../dcComponents/dcCursor/dcCursor";
import { dcTranslator } from "../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../dcTranslator/dcTranslation";
import { dcView } from "../dcView";
import { dcUIManager } from "../../dcUIManager";

enum HOME_CSS {
	CONTAINER = "home-container",
	TEXT_CONTAINER = "home-text-container",
	NAME_CONTAINER = "home-name-container",
	LOADING = "home-loading",
	START_BTN = "home-start-button",
}

export class dcHome extends dcView {

	private loadingIcon!: HTMLElement;
	private startBtn!: HTMLElement;

	private writeTextAnimationEnd: boolean = false;
	private startBtnVisible: boolean = false;

	private onClickOnStartButtonCallback: Function = () => {
	};

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("home", { className: HOME_CSS.CONTAINER }));

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
		const containerText = _UDom.p({ className: HOME_CSS.TEXT_CONTAINER });

		const hello = dcTranslator.T(dcTranslation.HELLO) + ", " + dcTranslator.T(dcTranslation.WELCOME_TO_MY_WEBSITE) + ".\n " + dcTranslator.T(dcTranslation.I_AM) + ' ';
		const name = "Dalil" + String.fromCharCode(160) + "CHABLIS";
		const job = ", " + dcTranslator.T(dcTranslation.FULLSTACK_DEVELOPER) + String.fromCharCode(160) + "!" + String.fromCharCode(160);

		_UDom.writeTextInElements([
				{
					startCallback: null,
					endCallback: null,
					element: containerText,
					text: hello
				},
				{
					startCallback: () => {
						const nameContainer = _UDom.span({ className: HOME_CSS.NAME_CONTAINER });
						containerText.appendChild(nameContainer);
						return nameContainer;
					},
					element: null,
					text: name,
					endCallback: null
				},
				{
					startCallback: () => {
						const jobContainer = _UDom.span();
						containerText.appendChild(jobContainer);
						return jobContainer;
					},
					endCallback: () => {
						containerText.appendChild(_UIcon.getIcon(DcIcons.DcIconSmile));
						containerText.appendChild(_UDom.span({
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

		_UDom.AC(this.mainElement, containerText);
	}

	private buildLoading(): void {
		this.loadingIcon = _UIcon.getIcon(DcIcons.DcIconLoading, { className: HOME_CSS.LOADING });
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

		this.startBtn = _UDom.div({ className: HOME_CSS.START_BTN });
		const startIcon = _UIcon.getIcon(DcIcons.DcIconArrowUp);

		dcCursor.subscribeElementToDetectHover(this.startBtn);
		this.startBtn.addEventListener("click", () => {
			dcUIManager.get().setCurrentView(VIEWS.OFFICE);
			this.onClickOnStartButtonCallback();
		});

		_UDom.AC(this.mainElement, _UDom.AC(this.startBtn, startIcon));

		this.startBtnVisible = true;
	}

}