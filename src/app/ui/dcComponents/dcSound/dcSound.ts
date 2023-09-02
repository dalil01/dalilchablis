import "./dcSound.css";

import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";
import { dcGlobalConfig } from "../../../global/dcGlobalConfig";
import { dcCursor } from "../dcCursor/dcCursor";
import { dcTranslator } from "../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../dcTranslator/dcTranslation";
import { dcGlobalVars } from "../../../global/dcGlobalVars";

enum SOUND_CSS_CLASSNAMES {
	CONTAINER = "sound-container",
	BOX_CONTAINER = "sound-box-container",
	BOX = "sound-box",
	BOX_ENABLE = "sound-box-enable",
	BOX_1 = "sound-box-1",
	BOX_2 = "sound-box-2",
	BOX_3 = "sound-box-3",
	BOX_4 = "sound-box-4",
	BOX_5 = "sound-box-5"
}

export class dcSound extends dcComponent {

	private mp3!: HTMLAudioElement;

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("sound", {
			className: SOUND_CSS_CLASSNAMES.CONTAINER,
			title: dcTranslator.T(dcTranslation.MUSIC_CREDIT)
		}));

		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const boxes = _UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_CONTAINER });
		const box1 = _UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_1 });
		const box2 = _UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_2 });
		const box3 = _UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_3 });
		const box4 = _UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_4 });
		const box5 = _UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_5 });
		
		_UDom.AC(boxes, box1, box2, box3, box4, box5);
		this.mainElement.appendChild(boxes);
		
		const boxesList = [box1, box2, box3, box4, box5];
		boxesList.forEach((e) => {
			e.classList.add((dcGlobalConfig.soundEnable) ? SOUND_CSS_CLASSNAMES.BOX_ENABLE : SOUND_CSS_CLASSNAMES.BOX);
		});

		boxes.addEventListener("click", async () => {
			if (!this.mp3) {
				this.mp3 = new Audio(dcGlobalVars.getSoundFilePath());
			}

			boxesList.forEach((e) => {
				if (dcGlobalConfig.soundEnable) {
					e.classList.remove(SOUND_CSS_CLASSNAMES.BOX_ENABLE);
					e.classList.add(SOUND_CSS_CLASSNAMES.BOX);
				} else {
					e.classList.add(SOUND_CSS_CLASSNAMES.BOX_ENABLE);
					e.classList.remove(SOUND_CSS_CLASSNAMES.BOX);
				}
			});

			dcGlobalConfig.soundEnable = !dcGlobalConfig.soundEnable;

			if (dcGlobalConfig.soundEnable) {
				this.mp3.play();
			} else {
				this.mp3.pause();
			}

			this.mp3.addEventListener("ended", () => {
				boxesList.forEach((e) => {
					e.classList.remove(SOUND_CSS_CLASSNAMES.BOX_ENABLE);
					e.classList.add(SOUND_CSS_CLASSNAMES.BOX);
				});
			});
		});
		
		dcCursor.subscribeElementToDetectHover(this.mainElement);
		
		this.parentElement.appendChild(this.mainElement);
	}
	
}