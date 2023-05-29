import "./dcProjects.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";
import { dcGlobalVars } from "../../../../global/dcGlobalVars";

enum PROJECTS_CSS {
	CONTAINER = "projects-container",
	TITLE = "projects-title",
	ITEMS = "projects-items",
	ITEM = "projects-item",
	IMAGE = "projects-item-image",
	NAME = "projects-item-name",
	DESCRIPTION = "projects-item-description"
}

type dcProjectsType = {
	$title?: string,
	items: {
		imgPath: string,
		url: string,
		name: string,
		$description: string
		techStack: string
	}[]
}

export class dcProjects extends dcComponent {

	private data!: dcProjectsType[];

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("projects", { className: PROJECTS_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		(async () => import("./dcProjects.json"))()
			.then((response: any) => {
				this.data = response.default;
				this.buildItems();
			});
	}

	public buildItems(): void {
		for (const projects of this.data) {
			if (projects?.$title) {
				const title = _UDom.h3({
					className: PROJECTS_CSS.TITLE,
					innerText: dcTranslator.T(dcTranslation[projects.$title])
				});
				this.mainElement.appendChild(title);
			}

			const container = _UDom.div({ className: PROJECTS_CSS.ITEMS });
			for (const item of projects.items) {
				const div = _UDom.div({ className: PROJECTS_CSS.ITEM });

				_UDom.AC(div, _UDom.img({ src: dcGlobalVars.IMAGE_PATH + "projects/" + item.imgPath, className: PROJECTS_CSS.IMAGE }));
				_UDom.AC(div, _UDom.h5({ innerText: item.name, className: PROJECTS_CSS.NAME }));
				_UDom.AC(div, _UDom.p({ innerText: dcTranslator.T(dcTranslation[item.$description]), className: PROJECTS_CSS.DESCRIPTION }));

				if (item.techStack) {
					const techStackContainer = _UDom.div();
					_UDom.AC(
						techStackContainer,
						_UDom.h6({ innerText: dcTranslator.T(dcTranslation.TECH_STACK) + ": " }),
						_UDom.p({ innerText: item.techStack })
					);
					div.appendChild(techStackContainer);
				}

				if (item.url) {
					_UDom.AC(div, _UDom.a({ href: item.url, target: "_blank", innerText: dcTranslator.T(dcTranslation.READ_MORE) }));
				}

				container.appendChild(div);
			}

			this.mainElement.appendChild(container);
		}
	}

	private static openLink(element: HTMLElement, link: string): void {
		element.addEventListener("click", () => window.open(link, "_blank"));
	}
	
}