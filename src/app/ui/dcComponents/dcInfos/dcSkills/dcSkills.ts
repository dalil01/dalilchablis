import "./dcSkills.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";
import { dcGlobalVars } from "../../../../global/dcGlobalVars";

enum SKILLS_CSS {
	CONTAINER = "skills-container",
	ITEMS = "skill-items",
	ITEM = "skill-item",
	IMAGE = "skill-item-image",
	NAME = "skill-item-name",
}

type dcSkillsType = {
	$title: string,
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
				this.buildFilter();
				this.buildItems();
			});
	}

	private buildFilter(): void {
		const container = _UDom.div();

		const searchBar = _UDom.input({ type: "search", placeholder: dcTranslator.T(dcTranslation.SEARCH) + "..." });

		_UDom.AC(container, searchBar);

		this.mainElement.appendChild(container);
	}

	private buildItems(): void {
		for (const skills of this.data) {

			const title = _UDom.p({ innerText: dcTranslator.T(dcTranslation[skills.$title]) });

			const container = _UDom.div({ className: SKILLS_CSS.ITEMS });

			this.mainElement.appendChild(title);

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