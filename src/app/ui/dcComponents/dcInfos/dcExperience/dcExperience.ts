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
	CARD_LINK = "experience-card-link",
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
			dcTranslator.T(dcTranslation.FULLSTACK_DEVELOPER) + " - " + dcTranslator.T(dcTranslation.APPRENTICE) + " | " + "2021 - " + dcTranslator.T(dcTranslation.TODAY),
			[
				"• " + dcTranslator.T(dcTranslation.DCBRAIN_APPRENTICE_2),
				"• " + dcTranslator.T(dcTranslation.DCBRAIN_APPRENTICE_3),
				"• " + dcTranslator.T(dcTranslation.DCBRAIN_APPRENTICE_1)
			]
		);

		this.addCard(
			imgExperiencePath + "dcbrain-logo.png",
			"https://dcbrain.com/",
			"DCbrain (Paris)",
			"QA " + dcTranslator.T(dcTranslation.TESTER) + " - Freelance | 2021 (7 " + dcTranslator.T(dcTranslation.MONTHS) + ')',
			dcTranslator.T(dcTranslation.DCBRAIN_FREELANCE_WORK)
		);

		this.addCard(
			imgExperiencePath + "dcbrain-logo.png",
			"https://dcbrain.com/",
			"DCbrain (Paris)",
			dcTranslator.T(dcTranslation.INTERN) + " | 2021 (2 " + dcTranslator.T(dcTranslation.MONTHS) + ')',
			dcTranslator.T(dcTranslation.DCBRAIN_INTERN_WORK),
			"https://gitlab.com/dalil01/automatisation-test-e2e"
		);

		this.addCard(
			imgExperiencePath + "carrefour-logo.png",
			"https://www.carrefour.fr/magasin/market-ecuelles",
			"Carrefour Market (Ecuelles)",
			dcTranslator.T(dcTranslation.SUMMER_JOB) + " | 2020 (1 " + dcTranslator.T(dcTranslation.MONTHS) + ')',
			dcTranslator.T(dcTranslation.CASHIER_SHELF_WORKER) + '.'
		);
	}

	public addCard(imageSrc: string, imgLink: string, title: string, jobTitle: string, jobSubTitles: string | string[], link: undefined | string = undefined): void {
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

		const cardJob = _UDom.div({ className: EXPERIENCE_CSS.CARD_JOB });
		const cardJobTitle = _UDom.h2({ innerText: jobTitle, className: EXPERIENCE_CSS.CARD_JOB_TITLE });
		_UDom.AC(cardJob, cardJobTitle);

		if (typeof jobSubTitles === "string") {
			jobSubTitles = [jobSubTitles];
		}

		for (const jobSubTitle of jobSubTitles) {
			const cardJobSubTitle = _UDom.h2({ innerText: jobSubTitle, className: EXPERIENCE_CSS.CARD_JOB_SUBTITLE });
			cardJob.appendChild(cardJobSubTitle);
		}

		card.appendChild(cardJob);

		_UDom.AC(cardContainer, separator, card);

		if (link) {
			const readMore = _UDom.a({ href: link, innerText: dcTranslator.T(dcTranslation.READ_MORE) + "...", className: EXPERIENCE_CSS.CARD_LINK, target: "_blank" });
			card.appendChild(readMore);
			dcCursor.subscribeElementToDetectHover(readMore);
		}

		this.mainElement.appendChild(cardContainer);
	}

}