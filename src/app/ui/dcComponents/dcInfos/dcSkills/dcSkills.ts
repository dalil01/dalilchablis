import "./dcSkills.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";
import { dcCursor } from "../../dcCursor/dcCursor";
import { skills } from "./dcSkills.data";

enum SKILLS_CSS {
	CONTAINER = "skills-container",
	MENU_CONTAINER = "skills-menu-container",
	MENU_BUTTON = "skills-menu-button",
	MENU_BUTTON_ACTIVE = "skills-menu-button-active",
	ITEMS_CONTENT = "skill-items-content",
	ITEMS = "skill-items",
	ITEM = "skill-item",
	ITEM_CONTENT = "skill-item-content",
	SUB_TITLE = "skill-item-sub-title",
	IMAGE = "skill-item-image",
	NAME = "skill-item-name",
}

export type dcSkillsType = {
	$title?: string,
	$subTitle?: string,
	items: {
		imgPath: Promise<any>,
		url: string,
		name: string
	}[]
}

export class dcSkills extends dcComponent {

	private data!: dcSkillsType[];

	private menuParent!: HTMLElement;
	private menuButtonByTitle: Map<string, HTMLElement> = new Map();

	private currentItemsTitle!: string;
	private itemsContainer!: HTMLElement;
	private itemsContainerByTitle: Map<string, HTMLElement> = new Map();

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("skills", { className: SKILLS_CSS.CONTAINER }));

		if (autoInit)
			this.init();
	}

	public setMenuParent(element: HTMLElement): void {
		this.menuParent = element;
	}

	public buildUI(): void {
		this.data = skills;
		this.buildMenu();
	}

	private async buildMenu(): Promise<void> {
		const container = _UDom.div({ className: SKILLS_CSS.MENU_CONTAINER });

		for (let i = 0; i < this.data.length; i++) {
			const skills = this.data[i];
			if (skills?.$title) {
				const titleBtn = _UDom.div({
					className: SKILLS_CSS.MENU_BUTTON,
					innerText: dcTranslator.T(dcTranslation[skills.$title])
				});

				dcCursor.subscribeElementToDetectHover(titleBtn);

				titleBtn.addEventListener("click", async () => {
					this.menuButtonByTitle.get(this.currentItemsTitle)?.classList.remove(SKILLS_CSS.MENU_BUTTON_ACTIVE);
					titleBtn.classList.add(SKILLS_CSS.MENU_BUTTON_ACTIVE);
					await this.buildItems(<string>skills.$title);
				});

				container.appendChild(titleBtn);

				if (i === 0) {
					await this.buildItems(<string>skills.$title);
					titleBtn.classList.add(SKILLS_CSS.MENU_BUTTON_ACTIVE);
				}

				this.menuButtonByTitle.set(skills.$title, titleBtn);
			}
		}

		if (this.menuParent) {
			this.menuParent.appendChild(container);
		} else {
			this.mainElement.appendChild(container);
		}
	}

	private async buildItems(title: string): Promise<void> {
		let titleFound = false;

		for (const skills of this.data) {
			if (titleFound) {
				if (skills.$title) {
					return;
				}
			} else if (title === skills?.$title) {
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

				this.itemsContainer = _UDom.div({ className: SKILLS_CSS.ITEMS_CONTENT });
				this.moveParentScrollToTop();

				this.currentItemsTitle = title;
				this.itemsContainerByTitle.set(title, this.itemsContainer);

				this.mainElement.appendChild(this.itemsContainer);

				titleFound = true;
			}

			if (titleFound) {
				if (skills.$subTitle) {
					const subTitle = _UDom.h5({
						className: SKILLS_CSS.SUB_TITLE,
						innerText: dcTranslator.T(dcTranslation[skills.$subTitle])
					});
					this.itemsContainer.appendChild(subTitle);
				}

				const items = _UDom.div({ className: SKILLS_CSS.ITEMS });
				for (const item of skills.items) {
					const div = _UDom.div({ className: SKILLS_CSS.ITEM });
					const divContent = _UDom.div({ className: SKILLS_CSS.ITEM_CONTENT });

					dcSkills.openLink(divContent, item.url);
					dcCursor.subscribeElementToDetectHover(divContent);

					const { default: imgPath } = await item.imgPath;
					_UDom.AC(divContent, _UDom.img({ src: imgPath, className: SKILLS_CSS.IMAGE }));
					_UDom.AC(divContent, _UDom.p({ innerText: item.name, className: SKILLS_CSS.NAME }));

					div.appendChild(divContent);

					items.appendChild(div);
				}
				this.itemsContainer.appendChild(items);
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

	private static openLink(element: HTMLElement, link: string): void {
		element.addEventListener("click", () => window.open(link, "_blank"));
	}

}