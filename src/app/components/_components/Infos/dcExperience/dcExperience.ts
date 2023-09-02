import "./dcExperience.css";

import { component } from "../../../Component";
import { UDom } from "../../../../dcUtils/UDom";
import { dcTranslator } from "../../../../translator/translator";
import { translation } from "../../../../translator/Translation";
import { UIcon } from "../../../../dcUtils/UIcon";
import { DcIcons } from "../../../../dcIcons/dcIcons";
import { dcCursor } from "../../cursor/cursor";
import { dcEducationData } from "./dcExperience.data";

enum EXPERIENCE_CSS {
	CONTAINER = "experience-container",
	CARD_CONTAINER = "experience-card-container",
	CARD = "experience-card",
	CARD_HEADER = "experience-card-header",
	CARD_IMAGE = "experience-card-image",
	CARD_TITLE = "experience-card-title",
	CARD_JOB = "experience-card-job",
	CARD_JOB_TITLE = "experience-card-job-title",
	CARD_JOB_SUBTITLE = "experience-card-job-subtitle",
	CARD_SEPARATOR = "experience-card-separator",
	CARD_LINK = "experience-card-link",
	CARD_SEPARATOR_ICON = "experience-separator-icon"
}

export type dcExperienceType = {
	imageSrc: Promise<any>,
	imgLink: string,
	title: string,
	jobTitle: string,
	jobSubTitles: string | string[],
	link?: undefined | string
}

export class dcExperience extends component {

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("experience", { className: EXPERIENCE_CSS.CONTAINER }));

		if (autoInit)
			this.init();
	}

	public async buildUI(): Promise<void> {
		for (const e of dcEducationData.getData()) {
			await this.addCard(e);
		}
	}

	public async addCard(item: dcExperienceType): Promise<void> {
		const cardContainer = UDom.div({ className: EXPERIENCE_CSS.CARD_CONTAINER });

		const separator = UDom.div({ className: EXPERIENCE_CSS.CARD_SEPARATOR });
		const icon = UIcon.getIcon(DcIcons.DcIconUserGraduate, { className: EXPERIENCE_CSS.CARD_SEPARATOR_ICON });
		UDom.AC(separator, icon);

		const card = UDom.div({ className: EXPERIENCE_CSS.CARD });
		const cardHeader = UDom.div({ className: EXPERIENCE_CSS.CARD_HEADER });

		const { default: imageSrc } = await item.imageSrc;
		const cardImage = UDom.img({ src: imageSrc, className: EXPERIENCE_CSS.CARD_IMAGE });
		cardImage.addEventListener("click", () => window.open(item.imgLink, "_blank"))
		const cardTitle = UDom.h1({ innerText: item.title, className: EXPERIENCE_CSS.CARD_TITLE });

		dcCursor.subscribeElementToDetectHover(cardImage);

		UDom.AC(card, UDom.AC(cardHeader, cardImage, cardTitle));

		const cardJob = UDom.div({ className: EXPERIENCE_CSS.CARD_JOB });
		const cardJobTitle = UDom.h2({ innerText: item.jobTitle, className: EXPERIENCE_CSS.CARD_JOB_TITLE });
		UDom.AC(cardJob, cardJobTitle);

		if (typeof item.jobSubTitles === "string") {
			item.jobSubTitles = [item.jobSubTitles];
		}

		for (const jobSubTitle of item.jobSubTitles) {
			const cardJobSubTitle = UDom.h2({ innerText: jobSubTitle, className: EXPERIENCE_CSS.CARD_JOB_SUBTITLE });
			cardJob.appendChild(cardJobSubTitle);
		}

		card.appendChild(cardJob);

		UDom.AC(cardContainer, separator, card);

		if (item.link) {
			const readMore = UDom.a({
				href: item.link,
				innerText: dcTranslator.T(translation.READ_MORE) + "...",
				className: EXPERIENCE_CSS.CARD_LINK,
				target: "_blank"
			});
			card.appendChild(readMore);
			dcCursor.subscribeElementToDetectHover(readMore);
		}

		this.mainElement.appendChild(cardContainer);
	}

}