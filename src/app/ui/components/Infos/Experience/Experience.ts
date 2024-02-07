import "./Experience.css";

import { Component } from "../../Component";
import { EducationData } from "./ExperienceData";
import { UDom } from "../../../../utils/UDom";
import { UIcon } from "../../../../utils/UIcon";
import { Cursor } from "../../Cursor/Cursor";
import { Icons } from "../../../../icons/Icons";
import { Translator } from "../../../../translator/Translator";
import { Translation } from "../../../../translator/Translation";

enum EXPERIENCE_CSS {
	CONTAINER = "experience-container",
	CARD_CONTAINER = "experience-card-container",
	CARD = "experience-card",
	CARD_HEADER = "experience-card-header",
	CARD_IMAGE = "experience-card-image",
	CARD_TITLE = "experience-card-title",
	CARD_JOB = "experience-card-job",
	CARD_JOB_TITLE = "experience-card-job-title",
	CARD_JOB_MARGIN = "experience-card-job-margin",
	CARD_JOB_SUBTITLE = "experience-card-job-subtitle",
	CARD_SEPARATOR = "experience-card-separator",
	CARD_LINK = "experience-card-link",
	CARD_SEPARATOR_ICON = "experience-separator-icon"
}

export type ExperienceType = {
	imageSrc: string,
	imgLink: string,
	title: string,
	jobs: {
		jobTitle: string,
		jobSubTitles: string | string[],
		link?: undefined | string
	}[],
}

export class Experience extends Component {

	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("experience", { className: EXPERIENCE_CSS.CONTAINER }));

		if (autoInit)
			this.init();
	}

	public async buildUI(): Promise<void> {
		for (const e of EducationData.getData()) {
			await this.addCard(e);
		}
	}

	public async addCard(item: ExperienceType): Promise<void> {
		const cardContainer = UDom.div({ className: EXPERIENCE_CSS.CARD_CONTAINER });

		const separator = UDom.div({ className: EXPERIENCE_CSS.CARD_SEPARATOR });
		const icon = UIcon.getIcon(Icons.DcIconUserGraduate, { className: EXPERIENCE_CSS.CARD_SEPARATOR_ICON });
		UDom.AC(separator, icon);

		const card = UDom.div({ className: EXPERIENCE_CSS.CARD });
		const cardHeader = UDom.div({ className: EXPERIENCE_CSS.CARD_HEADER });

		const cardImage = UDom.img({ src: item.imageSrc, className: EXPERIENCE_CSS.CARD_IMAGE });
		cardImage.addEventListener("click", () => window.open(item.imgLink, "_blank"))
		const cardTitle = UDom.h1({ innerText: item.title, className: EXPERIENCE_CSS.CARD_TITLE });

		Cursor.subscribeElementToDetectHover(cardImage);

		UDom.AC(card, UDom.AC(cardHeader, cardImage, cardTitle));

		const cardJob = UDom.div({ className: EXPERIENCE_CSS.CARD_JOB });

		for (let i = 0; i < item.jobs.length; i++) {
			const job = item.jobs[i];

			const cardJobTitle = UDom.h2({ innerText: job.jobTitle, className: EXPERIENCE_CSS.CARD_JOB_TITLE });

			if (i > 0) {
				cardJobTitle.classList.add(EXPERIENCE_CSS.CARD_JOB_MARGIN);
			}

			UDom.AC(cardJob, cardJobTitle);

			if (typeof job.jobSubTitles === "string") {
				job.jobSubTitles = [job.jobSubTitles];
			}

			for (const jobSubTitle of job.jobSubTitles) {
				const cardJobSubTitle = UDom.h2({innerText: jobSubTitle, className: EXPERIENCE_CSS.CARD_JOB_SUBTITLE});
				cardJob.appendChild(cardJobSubTitle);
			}

			if (job.link) {
				const readMore = UDom.a({
					href: job.link,
					innerText: Translator.T(Translation.READ_MORE) + "...",
					className: EXPERIENCE_CSS.CARD_LINK,
					target: "_blank"
				});
				cardJob.appendChild(readMore);
				Cursor.subscribeElementToDetectHover(readMore);
			}
		}

		card.appendChild(cardJob);

		UDom.AC(cardContainer, separator, card);

		this.mainElement.appendChild(cardContainer);
	}

}