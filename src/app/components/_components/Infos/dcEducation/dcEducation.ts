import "./dcEducation.css";

import { component } from "../../../Component";
import { UDom } from "../../../../dcUtils/UDom";
import { UIcon } from "../../../../dcUtils/UIcon";
import { DcIcons } from "../../../../dcIcons/dcIcons";
import { dcTranslator } from "../../../../translator/translator";
import { translation } from "../../../../translator/Translation";
import { dcCursor } from "../../cursor/cursor";
import { dcEducationData } from "./dcEducation.data";

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

export type dcEducationType = {
	imageSrc: Promise<any>,
	imgLink: string,
	title: string,
	subTitle: string,
	readMoreLink: string
}

export class dcEducation extends component {

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("education", { className: EDUCATION_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public async buildUI(): Promise<void> {
		for (const e of dcEducationData.getData()) {
			await this.addCard(e);
		}
	}

	public async addCard(item: dcEducationType): Promise<void> {
		const cardContainer = UDom.div({ className: EDUCATION_CSS.CARD_CONTAINER });

		const separator = UDom.div({ className: EDUCATION_CSS.CARD_SEPARATOR });
		const icon = UIcon.getIcon(DcIcons.DcIconGraduationCap, { className: EDUCATION_CSS.CARD_SEPARATOR_ICON });
		UDom.AC(separator, icon);

		const card = UDom.div({ className: EDUCATION_CSS.CARD });
		const cardHeader = UDom.div({ className: EDUCATION_CSS.CARD_HEADER });

		const { default: imageSrc } = await item.imageSrc;
		const cardImage = UDom.img({ src: imageSrc, className: EDUCATION_CSS.CARD_IMAGE });
		cardImage.addEventListener("click", () => window.open(item.imgLink, "_blank"))

		const cardTitle = UDom.h1({ innerText: item.title, className: EDUCATION_CSS.CARD_TITLE });
		const cardSubTitle = UDom.h2({ innerText: item.subTitle, className: EDUCATION_CSS.CARD_SUBTITLE });
		const readMore = UDom.a({
			href: item.readMoreLink,
			innerText: dcTranslator.T(translation.READ_MORE) + "...",
			className: EDUCATION_CSS.CARD_LINK,
			target: "_blank"
		});

		dcCursor.subscribeElementToDetectHover(cardImage);
		dcCursor.subscribeElementToDetectHover(readMore);

		UDom.AC(card, UDom.AC(cardHeader, cardImage, cardTitle), cardSubTitle, readMore);

		UDom.AC(cardContainer, separator, card);

		this.mainElement.appendChild(cardContainer);
	}
	
}