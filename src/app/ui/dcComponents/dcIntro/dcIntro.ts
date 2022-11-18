import "./dcIntro.css";

import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";
import { _UIcon } from "../../dcUtils/_UIcon";
import { DcIcons } from "../../dcIcons/dcIcons";
import { GLOBAL_CSS_CLASSNAMES } from "../../../global/dcGlobalEnums";
import { dcGlobalConfig } from "../../../global/dcGlobalConfig";
import { dcCursor } from "../dcCursor/dcCursor";
import { dcTranslator } from "../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../dcTranslator/dcTranslation";

enum INTRO_CSS_CLASSNAMES {
	LIGHT = "intro-light",
	DARK = "intro-dark",
	CONTAINER = "intro-container",
	PROFILE_IMG = "intro-profile-img",
	NAME_CONTAINER = "intro-name-container",
	LOADING = "intro-loading",
	STOP_INTRO_CONTAINER = "intro-stop-container",
}

export class dcIntro extends dcComponent {
	
	private loadingContainer!: HTMLElement;
	private stopIntroContainer!: HTMLElement;
	private stopIntroButtonVisible = false;
	
	private onStoppedCallback: Function = () => {};
	
	constructor(parentElement: HTMLElement, autoInit: boolean) {
		super(parentElement, _UDom.CCE("intro", { className: INTRO_CSS_CLASSNAMES.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public setOnStoppedCallback(callback: Function) {
		this.onStoppedCallback = callback;
	}
	
	public displayStopButton() {
		if (!this.stopIntroButtonVisible) {
			this.stopIntroButtonVisible = true;
			this.loadingContainer.classList.add(GLOBAL_CSS_CLASSNAMES.DISPLAY_NONE);
			this.stopIntroContainer.classList.remove(GLOBAL_CSS_CLASSNAMES.DISPLAY_NONE);
		}
	}
	
	public buildUI(): void {
		const introText = _UDom.p();
		
		const hello = dcTranslator.T(dcTranslation.HELLO) + ", " + dcTranslator.T(dcTranslation.WELCOME_TO_MY_WEBSITE) + ".\n " + dcTranslator.T(dcTranslation.I_AM) + ' ';
		const name = "Dalil CHABLIS";
		const job = ", " + dcTranslator.T(dcTranslation.FULLSTACK_DEVELOPER) + " ! ";
		
		_UDom.writeTextInElements([
				{
					startCallback: null,
					endCallback: null,
					element: introText,
					text: hello
				},
				{
					startCallback: () => {
						const nameContainer = _UDom.span({ className: INTRO_CSS_CLASSNAMES.NAME_CONTAINER });
						introText.appendChild(nameContainer);
						return nameContainer;
					},
					element: null,
					text: name,
					endCallback: null
				},
				{
					startCallback: () => {
						const jobContainer = _UDom.span();
						introText.appendChild(jobContainer);
						return jobContainer;
					},
					endCallback: () => {
						introText.appendChild(_UIcon.getIcon(DcIcons.DcIconSmile));
						introText.appendChild(_UDom.span({
							className: GLOBAL_CSS_CLASSNAMES.BLINK,
							innerText: '_'
						}));
					},
					element: null,
					text: job
				}
			],
			62,
			true,
			false);
		
		this.getMainElement().classList.add((dcGlobalConfig.isDarkMode) ? INTRO_CSS_CLASSNAMES.DARK : INTRO_CSS_CLASSNAMES.LIGHT);
		this.getMainElement().appendChild(introText);
		
		this.loadingContainer = _UIcon.getIcon(DcIcons.DcIconLoading, { className: INTRO_CSS_CLASSNAMES.LOADING + ' ' + GLOBAL_CSS_CLASSNAMES.DISPLAY_NONE });
		setTimeout(() => {
			if (!this.stopIntroButtonVisible)
				this.loadingContainer.classList.remove(GLOBAL_CSS_CLASSNAMES.DISPLAY_NONE);
		}, 600);
		this.getMainElement().appendChild(this.loadingContainer);
		
		this.stopIntroContainer = _UDom.div({ className: INTRO_CSS_CLASSNAMES.STOP_INTRO_CONTAINER + ' ' + GLOBAL_CSS_CLASSNAMES.DISPLAY_NONE });
		const stopIntroIcon = _UIcon.getIcon(DcIcons.DcIconArrowUp);
		this.stopIntroContainer.appendChild(stopIntroIcon);
		this.stopIntroContainer.addEventListener("click", () => {
			this.destroy();
			this.onStoppedCallback()
		});
		
		dcCursor.subscribeElementToDetectHover(this.stopIntroContainer);
		
		this.getMainElement().appendChild(this.stopIntroContainer);
	}
	
}