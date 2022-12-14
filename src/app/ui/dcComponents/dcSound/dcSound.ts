import "./dcSound.css";

import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";
import { dcGlobalConfig } from "../../../global/dcGlobalConfig";
import { dcCursor } from "../dcCursor/dcCursor";
import { LOCAL_STORAGE_KEY } from "../../../global/dcGlobalEnums";

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
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("sound", { className: SOUND_CSS_CLASSNAMES.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const lkSoundEnable = localStorage.getItem(LOCAL_STORAGE_KEY.SOUND_ENABLE);
		if (lkSoundEnable) {
			dcGlobalConfig.soundEnable = lkSoundEnable === "true";
		}
		
		const boxes = _UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_CONTAINER });
		const box1 = _UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_1 });
		const box2 = _UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_2 });
		const box3 = _UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_3 });
		const box4 = _UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_4 });
		const box5 = _UDom.div({ className: SOUND_CSS_CLASSNAMES.BOX_5 });
		
		_UDom.AC(boxes, box1, box2, box3, box4, box5);
		this.getMainElement().appendChild(boxes);
		
		const boxesList = [box1, box2, box3, box4, box5];
		boxesList.forEach((e) => {
			e.classList.add((dcGlobalConfig.soundEnable) ? SOUND_CSS_CLASSNAMES.BOX_ENABLE : SOUND_CSS_CLASSNAMES.BOX);
		});
		
		boxes.addEventListener("click", () => {
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
			localStorage.setItem(LOCAL_STORAGE_KEY.SOUND_ENABLE, dcGlobalConfig.soundEnable.toString());
		});
		
		dcCursor.subscribeElementToDetectHover(this.getMainElement());
		
		this.getParentElement().appendChild(this.getMainElement());
	}
	
}