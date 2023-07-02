import "./dcEducation.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { _UIcon } from "../../../dcUtils/_UIcon";
import { DcIcons } from "../../../dcIcons/dcIcons";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";
import { dcCursor } from "../../dcCursor/dcCursor";
import { education } from "./dcEducation.data";

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

export class dcEducation extends dcComponent {

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("education", { className: EDUCATION_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public async buildUI(): Promise<void> {
		for (const e of education) {
			await this.addCard(e);
		}
	}

	public async addCard(item: dcEducationType): Promise<void> {
		const cardContainer = _UDom.div({ className: EDUCATION_CSS.CARD_CONTAINER });

		const separator = _UDom.div({ className: EDUCATION_CSS.CARD_SEPARATOR });
		const icon = _UIcon.getIcon(DcIcons.DcIconGraduationCap, { className: EDUCATION_CSS.CARD_SEPARATOR_ICON });
		_UDom.AC(separator, icon);

		const card = _UDom.div({ className: EDUCATION_CSS.CARD });
		const cardHeader = _UDom.div({ className: EDUCATION_CSS.CARD_HEADER });

		const { default: imageSrc } = await item.imageSrc;
		const cardImage = _UDom.img({ src: imageSrc, className: EDUCATION_CSS.CARD_IMAGE });
		cardImage.addEventListener("click", () => window.open(item.imgLink, "_blank"))

		const cardTitle = _UDom.h1({ innerText: item.title, className: EDUCATION_CSS.CARD_TITLE });
		const cardSubTitle = _UDom.h2({ innerText: item.subTitle, className: EDUCATION_CSS.CARD_SUBTITLE });
		const readMore = _UDom.a({
			href: item.readMoreLink,
			innerText: dcTranslator.T(dcTranslation.READ_MORE) + "...",
			className: EDUCATION_CSS.CARD_LINK,
			target: "_blank"
		});

		dcCursor.subscribeElementToDetectHover(cardImage);
		dcCursor.subscribeElementToDetectHover(readMore);

		_UDom.AC(card, _UDom.AC(cardHeader, cardImage, cardTitle), cardSubTitle, readMore);

		_UDom.AC(cardContainer, separator, card);

		this.mainElement.appendChild(cardContainer);
	}
	
}