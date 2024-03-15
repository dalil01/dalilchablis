import "./Projects.css";

import { Component } from "../../Component";
import { ProjectsData } from "./ProjectsData";
import { UDom } from "../../../../utils/UDom";
import { Translator } from "../../../../translations/Translator";
import { Translation } from "../../../../translations/Translation";
import { Cursor } from "../../Cursor/Cursor";

enum PROJECTS_CSS {
	CONTAINER = "projects-container",
	MENU_CONTAINER = "projects-menu-container",
	MENU_BUTTON = "projects-menu-button",
	MENU_BUTTON_ACTIVE = "projects-menu-button-active",
	ITEMS = "projects-items",
	ITEM = "projects-item",
	ITEM_CONTENT = "projects-item-content",
	IMAGE = "projects-item-image",
	NAME = "projects-item-name",
	DESCRIPTION = "projects-item-description",
	TECH_STACK = "projects-item-stack",
	READ_MORE = "projects-item-read-more"
}

export type ProjectsType = {
	$title?: string,
	items: {
		imgPath: string,
		url?: string,
		name: string,
		$description: string
		techStack: string
	}[]
}

export class Projects extends Component {

	private data!: ProjectsType[];

	private menuParent!: HTMLElement;
	private menuButtonByTitle: Map<string, HTMLElement> = new Map();

	private currentItemsTitle!: string;
	private itemsContainer!: HTMLElement;
	private itemsContainerByTitle: Map<string, HTMLElement> = new Map();

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("projects", { className: PROJECTS_CSS.CONTAINER }));

		if (autoInit)
			this.init();
	}

	public setMenuParent(element: HTMLElement): void {
		this.menuParent = element;
	}

	public buildUI(): void {
		this.data = ProjectsData.getData();
		this.buildMenu();
	}

	private buildMenu(): void {
		const container = UDom.div({ className: PROJECTS_CSS.MENU_CONTAINER });

		for (let i = 0; i < this.data.length; i++) {
			const projects = this.data[i];
			if (projects?.$title) {
				const titleBtn = UDom.div({
					className: PROJECTS_CSS.MENU_BUTTON,
					innerText: Translator.T(Translation[projects.$title])
				});

				Cursor.subscribeElementToDetectHover(titleBtn);

				titleBtn.addEventListener("click", () => {
					this.menuButtonByTitle.get(this.currentItemsTitle)?.classList.remove(PROJECTS_CSS.MENU_BUTTON_ACTIVE);
					titleBtn.classList.add(PROJECTS_CSS.MENU_BUTTON_ACTIVE);
					this.buildItems(<string>projects.$title);
				});

				container.appendChild(titleBtn);

				if (i === 0) {
					this.buildItems(<string>projects.$title);
					titleBtn.classList.add(PROJECTS_CSS.MENU_BUTTON_ACTIVE);
				}

				this.menuButtonByTitle.set(projects.$title, titleBtn);
			}
		}

		if (this.menuParent) {
			this.menuParent.appendChild(container);
		} else {
			this.mainElement.appendChild(container);
		}
	}

	private buildItems(title: string): void {
		for (const projects of this.data) {
			if (title === projects?.$title) {
				if (this.currentItemsTitle === title) {
					return;
				}

				if (this.currentItemsTitle && this.itemsContainer === this.itemsContainerByTitle.get(this.currentItemsTitle)) {
					this.mainElement.removeChild(this.itemsContainer);
				}

				const existedContainer = this.itemsContainerByTitle.get(title);
				if (existedContainer) {
					this.currentItemsTitle = title;
					this.itemsContainer = existedContainer;
					this.moveParentScrollToTop();
					this.mainElement.appendChild(this.itemsContainer);
					return;
				}

				this.itemsContainer = UDom.div({ className: PROJECTS_CSS.ITEMS });
				this.moveParentScrollToTop();

				for (const item of projects.items) {
					const div = UDom.div({ className: PROJECTS_CSS.ITEM });
					const divContent = UDom.div({ className: PROJECTS_CSS.ITEM_CONTENT });

					UDom.AC(divContent, UDom.img({
						src: item.imgPath,
						className: PROJECTS_CSS.IMAGE
					}));
					UDom.AC(divContent, UDom.h5({ innerText: item.name, className: PROJECTS_CSS.NAME }));
					UDom.AC(divContent, UDom.p({
						innerText: Translator.T(Translation[item.$description]) + '.',
						className: PROJECTS_CSS.DESCRIPTION
					}));

					if (item.techStack) {
						divContent.appendChild(UDom.p({
							innerText: item.techStack + '.',
							className: PROJECTS_CSS.TECH_STACK
						}));
					}

					if (item.url) {
						const readMore = UDom.a({
							href: item.url,
							target: "_blank",
							innerText: Translator.T(Translation.READ_MORE) + "..."
						});
						Cursor.subscribeElementToDetectHover(readMore);

						UDom.AC(divContent, UDom.AC(UDom.p({ className: PROJECTS_CSS.READ_MORE }), readMore));
					}

					div.appendChild(divContent);

					this.itemsContainer.appendChild(div);
				}

				this.currentItemsTitle = title;
				this.itemsContainerByTitle.set(title, this.itemsContainer);

				this.mainElement.appendChild(this.itemsContainer);
			}
		}
	}

	private moveParentScrollToTop(): void {
		if (this.menuParent) {
			this.menuParent.parentElement?.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
	}

}