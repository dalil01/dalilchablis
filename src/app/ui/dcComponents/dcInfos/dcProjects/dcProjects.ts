import "./dcProjects.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";
import { dcCursor } from "../../dcCursor/dcCursor";
import { projects } from "./dcProjects.data";

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

export type dcProjectsType = {
	$title?: string,
	items: {
		imgPath: Promise<any>,
		url?: string,
		name: string,
		$description: string
		techStack: string
	}[]
}

export class dcProjects extends dcComponent {

	private data!: dcProjectsType[];

	private menuParent!: HTMLElement;
	private menuButtonByTitle: Map<string, HTMLElement> = new Map();

	private currentItemsTitle!: string;
	private itemsContainer!: HTMLElement;
	private itemsContainerByTitle: Map<string, HTMLElement> = new Map();

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("projects", { className: PROJECTS_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}

	public setMenuParent(element: HTMLElement): void {
		this.menuParent = element;
	}
	
	public buildUI(): void {
		this.data = projects;
		this.buildMenu();
	}

	private async buildMenu(): Promise<void> {
		const container = _UDom.div({ className: PROJECTS_CSS.MENU_CONTAINER });

		for (let i = 0; i < this.data.length; i++) {
			const projects = this.data[i];
			if (projects?.$title) {
				const titleBtn = _UDom.div({
					className: PROJECTS_CSS.MENU_BUTTON,
					innerText: dcTranslator.T(dcTranslation[projects.$title])
				});

				dcCursor.subscribeElementToDetectHover(titleBtn);

				titleBtn.addEventListener("click", async () => {
					this.menuButtonByTitle.get(this.currentItemsTitle)?.classList.remove(PROJECTS_CSS.MENU_BUTTON_ACTIVE);
					titleBtn.classList.add(PROJECTS_CSS.MENU_BUTTON_ACTIVE);
					await this.buildItems(<string>projects.$title);
				});

				container.appendChild(titleBtn);

				if (i === 0) {
					await this.buildItems(<string>projects.$title);
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

	private async buildItems(title: string): Promise<void> {
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

				this.itemsContainer = _UDom.div({ className: PROJECTS_CSS.ITEMS });
				this.moveParentScrollToTop();

				for (const item of projects.items) {
					const div = _UDom.div({ className: PROJECTS_CSS.ITEM });
					const divContent = _UDom.div({ className: PROJECTS_CSS.ITEM_CONTENT });

					const { default: imgPath } = await item.imgPath;

					_UDom.AC(divContent, _UDom.img({
						src: imgPath,
						className: PROJECTS_CSS.IMAGE
					}));
					_UDom.AC(divContent, _UDom.h5({ innerText: item.name, className: PROJECTS_CSS.NAME }));
					_UDom.AC(divContent, _UDom.p({
						innerText: dcTranslator.T(dcTranslation[item.$description]) + '.',
						className: PROJECTS_CSS.DESCRIPTION
					}));

					if (item.techStack) {
						divContent.appendChild(_UDom.p({
							innerText: item.techStack + '.',
							className: PROJECTS_CSS.TECH_STACK
						}));
					}

					if (item.url) {
						const readMore = _UDom.a({
							href: item.url,
							target: "_blank",
							innerText: dcTranslator.T(dcTranslation.READ_MORE) + "..."
						});
						dcCursor.subscribeElementToDetectHover(readMore);

						_UDom.AC(divContent, _UDom.AC(_UDom.p({ className: PROJECTS_CSS.READ_MORE }), readMore));
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