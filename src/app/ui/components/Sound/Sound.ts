import "./Sound.css";

import { Component } from "../Component";
import { UDom } from "../../../utils/UDom";
import { Translator } from "../../../translator/Translator";
import { Translation } from "../../../translator/Translation";
import { Vars } from "../../../../Vars";
import { Cursor } from "../Cursor/Cursor";

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

export class Sound extends Component {

	private mp3!: HTMLAudioElement;

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("sound", {
			className: SOUND_CSS_CLASSNAMES.CONTAINER,
			title: Translator.T(Translation.MUSIC_CREDIT)
		}));

		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const boxes = UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_CONTAINER });
		const box1 = UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_1 });
		const box2 = UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_2 });
		const box3 = UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_3 });
		const box4 = UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_4 });
		const box5 = UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_5 });
		
		UDom.AC(boxes, box1, box2, box3, box4, box5);
		this.mainElement.appendChild(boxes);
		
		const boxesList = [box1, box2, box3, box4, box5];
		boxesList.forEach((e) => {
			e.classList.add((Vars.SOUND_ENABLE) ? SOUND_CSS_CLASSNAMES.BOX_ENABLE : SOUND_CSS_CLASSNAMES.BOX);
		});

		boxes.addEventListener("click", () => {
			if (!this.mp3) {
				this.mp3 = new Audio(Vars.PATH.SOUND);
			}

			boxesList.forEach((e) => {
				if (Vars.SOUND_ENABLE) {
					e.classList.remove(SOUND_CSS_CLASSNAMES.BOX_ENABLE);
					e.classList.add(SOUND_CSS_CLASSNAMES.BOX);
				} else {
					e.classList.add(SOUND_CSS_CLASSNAMES.BOX_ENABLE);
					e.classList.remove(SOUND_CSS_CLASSNAMES.BOX);
				}
			});

			Vars.SOUND_ENABLE = !Vars.SOUND_ENABLE;

			if (Vars.SOUND_ENABLE) {
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
		
		Cursor.subscribeElementToDetectHover(this.mainElement);
		
		this.parentElement.appendChild(this.mainElement);
	}
	
}