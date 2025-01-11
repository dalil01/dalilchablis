import "./Education.css";

import { Component } from "../../Component";
import { EducationData } from "./EducationData";
import { UDom } from "../../../../utils/UDom";
import { UIcon } from "../../../../utils/UIcon";
import { Icons } from "../../../../icons/Icons";
import { Translator } from "../../../../translations/Translator";
import { Translation } from "../../../../translations/Translation";
import { Cursor } from "../../Cursor/Cursor";

enum EDUCATION_CSS {
	CONTAINER = "education-container",
	CARD_CONTAINER = "education-card-container",
	CARD = "education-card",
	CARD_HEADER = "education-card-header",
	CARD_IMAGE = "education-card-image",
	CARD_TITLE = "education-card-title",
	CARD_SUBTITLE = "education-card-subtitle",
	CARD_LINK = "education-card-link",
	CARD_SEPARATOR = "education-card-separator",
	CARD_SEPARATOR_ICON = "education-separator-icon"
}

export type EducationType = {
	imageSrc: string,
	imgLink: string,
	title: string,
	subTitle: string,
	readMoreLink: string
}

export class Education extends Component {

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("education", { className: EDUCATION_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public async buildUI(): Promise<void> {
		for (const e of EducationData.getData()) {
			await this.addCard(e);
		}
	}

	public addCard(item: EducationType): void {
		const cardContainer = UDom.div({ className: EDUCATION_CSS.CARD_CONTAINER });

		const separator = UDom.div({ className: EDUCATION_CSS.CARD_SEPARATOR });
		const icon = UIcon.getIcon(Icons.IconGraduationCap, { className: EDUCATION_CSS.CARD_SEPARATOR_ICON });
		UDom.AC(separator, icon);

		const card = UDom.div({ className: EDUCATION_CSS.CARD });
		const cardHeader = UDom.div({ className: EDUCATION_CSS.CARD_HEADER });

		const cardImage = UDom.img({ src: item.imageSrc, className: EDUCATION_CSS.CARD_IMAGE });
		cardImage.addEventListener("click", () => window.open(item.imgLink, "_blank"))

		const cardTitle = UDom.h1({ innerText: item.title, className: EDUCATION_CSS.CARD_TITLE });
		const cardSubTitle = UDom.h2({ innerText: item.subTitle, className: EDUCATION_CSS.CARD_SUBTITLE });
		const readMore = UDom.a({
			href: item.readMoreLink,
			innerText: Translator.T(Translation.READ_MORE) + "...",
			className: EDUCATION_CSS.CARD_LINK,
			target: "_blank"
		});

		Cursor.subscribeElementToDetectHover(cardImage);
		Cursor.subscribeElementToDetectHover(readMore);

		UDom.AC(card, UDom.AC(cardHeader, cardImage, cardTitle), cardSubTitle, readMore);

		UDom.AC(cardContainer, separator, card);

		this.mainElement.appendChild(cardContainer);
	}
	
}