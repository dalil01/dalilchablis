import "./Skills.css";

import { Component } from "../../Component";
import { SkillsData } from "./SkillsData";
import { UDom } from "../../../../utils/UDom";
import { Translator } from "../../../../translations/Translator";
import { Translation } from "../../../../translations/Translation";
import { Cursor } from "../../Cursor/Cursor";

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

export type SkillsType = {
	$title?: string,
	$subTitle?: string,
	items: {
		imgPath: string,
		url: string,
		name: string
	}[]
}

export class Skills extends Component {

	private data!: SkillsType[];

	private menuParent!: HTMLElement;
	private menuButtonByTitle: Map<string, HTMLElement> = new Map();

	private currentItemsTitle!: string;
	private itemsContainer!: HTMLElement;
	private itemsContainerByTitle: Map<string, HTMLElement> = new Map();

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("skills", { className: SKILLS_CSS.CONTAINER }));

		if (autoInit)
			this.init();
	}

	public setMenuParent(element: HTMLElement): void {
		this.menuParent = element;
	}

	public buildUI(): void {
		this.data = SkillsData.getData();
		this.buildMenu();
	}

	private buildMenu(): void {
		const container = UDom.div({ className: SKILLS_CSS.MENU_CONTAINER });

		for (let i = 0; i < this.data.length; i++) {
			const skills = this.data[i];
			if (skills?.$title) {
				const titleBtn = UDom.div({
					className: SKILLS_CSS.MENU_BUTTON,
					innerText: Translator.T(Translation[skills.$title])
				});

				Cursor.subscribeElementToDetectHover(titleBtn);

				titleBtn.addEventListener("click",() => {
					this.menuButtonByTitle.get(this.currentItemsTitle)?.classList.remove(SKILLS_CSS.MENU_BUTTON_ACTIVE);
					titleBtn.classList.add(SKILLS_CSS.MENU_BUTTON_ACTIVE);
					this.buildItems(<string>skills.$title);
				});

				container.appendChild(titleBtn);

				if (i === 0) {
					this.buildItems(<string>skills.$title);
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

	private buildItems(title: string): void {
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

				this.itemsContainer = UDom.div({ className: SKILLS_CSS.ITEMS_CONTENT });
				this.moveParentScrollToTop();

				this.currentItemsTitle = title;
				this.itemsContainerByTitle.set(title, this.itemsContainer);

				this.mainElement.appendChild(this.itemsContainer);

				titleFound = true;
			}

			if (titleFound) {
				if (skills.$subTitle) {
					const subTitle = UDom.h5({
						className: SKILLS_CSS.SUB_TITLE,
						innerText: Translator.T(Translation[skills.$subTitle])
					});
					this.itemsContainer.appendChild(subTitle);
				}

				const items = UDom.div({ className: SKILLS_CSS.ITEMS });
				for (const item of skills.items) {
					const div = UDom.div({ className: SKILLS_CSS.ITEM });
					const divContent = UDom.div({ className: SKILLS_CSS.ITEM_CONTENT });

					Skills.openLink(divContent, item.url);
					Cursor.subscribeElementToDetectHover(divContent);

					UDom.AC(divContent, UDom.img({ src: item.imgPath, className: SKILLS_CSS.IMAGE }));
					UDom.AC(divContent, UDom.p({ innerText: item.name, className: SKILLS_CSS.NAME }));

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