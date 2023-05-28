import "./dcSkills.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";
import { dcGlobalVars } from "../../../../global/dcGlobalVars";
import { _UIcon } from "../../../dcUtils/_UIcon";
import { DcIcons } from "../../../dcIcons/dcIcons";

enum SKILLS_CSS {
	CONTAINER = "skills-container",
	SEARCH_BAR_CONTAINER = "skills-search-bar-container",
	SEARCH_ICON = "skills-search-icon",
	SEARCH_BAR = "skills-search-bar",
	ITEMS = "skill-items",
	ITEM = "skill-item",
	TITLE = "skill-item-title",
	SUB_TITLE = "skill-item-sub-title",
	IMAGE = "skill-item-image",
	NAME = "skill-item-name",
}

type dcSkillsType = {
	$title: string,
	$subTitle?: string,
	items: {
		imgPath: string,
		url: string,
		name: string
	}[]
}

export class dcSkills extends dcComponent {

	private data!: dcSkillsType[];

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("skills", { className: SKILLS_CSS.CONTAINER }));

		if (autoInit)
			this.init();
	}

	public buildUI(): void {
		(async () => import("./dcSkills.json"))()
			.then((response: any) => {
				this.data = response.default;
				//this.buildFilter();
				this.buildItems();
			});
	}

	private buildFilter(): void {
		const container = _UDom.div({ className: SKILLS_CSS.SEARCH_BAR_CONTAINER });

		//const searchIcon = _UIcon.getIcon(DcIcons.Search, { className: SKILLS_CSS.SEARCH_ICON });
		const searchBar = _UDom.input({ className: SKILLS_CSS.SEARCH_BAR, type: "search", placeholder: dcTranslator.T(dcTranslation.SEARCH) + "..." });

		_UDom.AC(container, searchBar);

		this.mainElement.appendChild(container);
	}

	private buildItems(): void {
		for (const skills of this.data) {

			if (skills?.$title) {
				const title = _UDom.h4({
					className: SKILLS_CSS.TITLE,
					innerText: dcTranslator.T(dcTranslation[skills.$title])
				});
				this.mainElement.appendChild(title);
			}

			if (skills.$subTitle) {
				const subTitle = _UDom.h5({
					className: SKILLS_CSS.SUB_TITLE,
					innerText: dcTranslator.T(dcTranslation[skills.$subTitle])
				});
				this.mainElement.appendChild(subTitle);
			}

			const container = _UDom.div({ className: SKILLS_CSS.ITEMS });

			for (const item of skills.items) {
				const div = _UDom.div({ className: SKILLS_CSS.ITEM });

				dcSkills.openLink(div, item.url);
				_UDom.AC(div, _UDom.img({ src: dcGlobalVars.IMAGE_PATH + "skills/" + item.imgPath, className: SKILLS_CSS.IMAGE }));
				_UDom.AC(div, _UDom.p({ innerText: item.name, className: SKILLS_CSS.NAME }));

				container.appendChild(div);
			}

			this.mainElement.appendChild(container);
		}
	}

	private static openLink(element: HTMLElement, link: string): void {
		element.addEventListener("click", () => window.open(link, "_blank"));
	}

}