import "./dcSkills.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";

enum PROJECTS_CSS_CLASSNAMES {
	CONTAINER = "skills-container",
}

type dcSkillsType = {
	systemsAndAdministration: {
		imgPath: string,
		url: string,
		name: string
	}[]
}

export class dcSkills extends dcComponent {

	private data!: dcSkillsType;

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("skills", { className: PROJECTS_CSS_CLASSNAMES.CONTAINER }));

		if (autoInit)
			this.init();
	}

	public buildUI(): void {
		(async () => import("./dcSkills.json"))()
			.then((response: any) => {
				this.data = response.default;

				this.buildFilter();

				this.buildSystemsAdministrations();
			});
	}

	private buildFilter(): void {
		const container = _UDom.div();

		const searchBar = _UDom.input({ type: "search", placeholder: dcTranslator.T(dcTranslation.SEARCH) + "..." });

		_UDom.AC(container, searchBar);

		this.mainElement.appendChild(container);
	}

	private buildSystemsAdministrations(): void {
		const title = _UDom.p({ innerText: dcTranslator.T(dcTranslation.SYSTEMS_ADMINISTRATION) });

		const container = _UDom.div();
		for (const item of this.data.systemsAndAdministration) {
			const div = _UDom.div();

			dcSkills.openLink(div, item.url);
			_UDom.AC(div, _UDom.img({ src: item.imgPath }));
			_UDom.AC(div, _UDom.p({ innerText: item.name }));

			container.appendChild(div);
		}

		_UDom.AC(this.mainElement, container, title);
	}

	private static openLink(element: HTMLElement, link: string): void {
		element.addEventListener("click", () => window.open(link, "_blank"));
	}

}