import "./dcExperience.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";
import { _UIcon } from "../../../dcUtils/_UIcon";
import { DcIcons } from "../../../dcIcons/dcIcons";
import { dcCursor } from "../../dcCursor/dcCursor";

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
	CARD_SEPARATOR_ICON = "experience-separator-icon"
}

export class dcExperience extends dcComponent {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("experience", { className: EXPERIENCE_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const imgExperiencePath = "../../../../assets/images/experience/";

		this.addCard(
			imgExperiencePath + "dcbrain-logo.png",
			"https://dcbrain.com/",
			"DCbrain (Paris)",
			[
				{
					title: "Full Stack Déveloper - Apprentice",
					subTitle: "2021 - " + dcTranslator.T(dcTranslation.TODAY)
				}
			],
		);

		this.addCard(
			imgExperiencePath + "dcbrain-logo.png",
			"https://dcbrain.com/",
			"DCbrain (Paris)",
			[
				{
					title: "QA tester - Freelance",
					subTitle: "2021 (7 months)"
				},
				{
					title: "Intern",
					subTitle: "2021 (2 months)"
				}
			],
		);

		this.addCard(
			imgExperiencePath + "dcbrain-logo.png",
			"https://dcbrain.com/",
			"DCbrain (Paris)",
			[
				{
					title: "Intern",
					subTitle: "2021 (2 months)"
				}
			],
		);

		this.addCard(
			imgExperiencePath + "carrefour-logo.png",
			"https://www.carrefour.fr/magasin/market-ecuelles",
			"Carrefour Market (Ecuelles)",
			[
				{
					title: "Summer Job",
					subTitle: "2020 (1 months)"
				}
			],
		);
	}

	public addCard(imageSrc: string, imgLink: string, title: string, jobs: { title: string, subTitle: string }[]): void {
		const cardContainer = _UDom.div({ className: EXPERIENCE_CSS.CARD_CONTAINER });

		const separator = _UDom.div({ className: EXPERIENCE_CSS.CARD_SEPARATOR });
		const icon = _UIcon.getIcon(DcIcons.DcIconUserGraduate, { className: EXPERIENCE_CSS.CARD_SEPARATOR_ICON });
		_UDom.AC(separator, icon);

		const card = _UDom.div({ className: EXPERIENCE_CSS.CARD });
		const cardHeader = _UDom.div({ className: EXPERIENCE_CSS.CARD_HEADER });
		const cardImage = _UDom.img({ src: imageSrc, className: EXPERIENCE_CSS.CARD_IMAGE });
		cardImage.addEventListener("click", () => window.open(imgLink, "_blank"))
		const cardTitle = _UDom.h1({ innerText: title, className: EXPERIENCE_CSS.CARD_TITLE });

		dcCursor.subscribeElementToDetectHover(cardImage);

		_UDom.AC(card, _UDom.AC(cardHeader, cardImage, cardTitle));

		for (const job of jobs) {
			const cardJob = _UDom.div({ className: EXPERIENCE_CSS.CARD_JOB });
			const cardJobTitle = _UDom.h2({ innerText: job.title, className: EXPERIENCE_CSS.CARD_JOB_TITLE });
			const cardJobSubTitle = _UDom.h2({ innerText: job.subTitle, className: EXPERIENCE_CSS.CARD_JOB_SUBTITLE });
			card.appendChild(_UDom.AC(cardJob, cardJobTitle, cardJobSubTitle));
		}

		_UDom.AC(cardContainer, separator, card);

		this.mainElement.appendChild(cardContainer);
	}
	
}