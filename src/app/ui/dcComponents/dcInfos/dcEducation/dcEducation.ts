import "./dcEducation.css";

import { dcComponent } from "../../dcComponent";
import { _UDom } from "../../../dcUtils/_UDom";
import { _UIcon } from "../../../dcUtils/_UIcon";
import { DcIcons } from "../../../dcIcons/dcIcons";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";
import { dcCursor } from "../../dcCursor/dcCursor";

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

export class dcEducation extends dcComponent {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("education", { className: EDUCATION_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const imgEducationPath = "../../../../assets/images/education/";

		this.addCard(
			imgEducationPath + "epitech-logo.webp",
			"https://www.epitech.eu/",
			"Epitech - " + dcTranslator.T(dcTranslation.EPITECH_DESCRIPTION) + " (Paris)",
			"MSc Pro | 2022 - 2025",
			"https://www.epitech.eu/fr/formations/msc-pro-epitech-technology"
		);

		this.addCard(
			imgEducationPath + "sorbonne-logo.png",
			"https://www.sorbonne-universite.fr/",
			"SORBONNE " + dcTranslator.T(dcTranslation.UNIVERSITY) + " - " + dcTranslator.T(dcTranslation.CFA_SCIENCES) + " (Paris)",
			"DANT | 2021 - 2022",
			"https://www.cfa-sciences.fr/fr/licence-informatique-l3-dant-developpeur-dapplications-nouvelles-technologies"
		);

		this.addCard(
			imgEducationPath + "ldv-logo.jpg",
			"https://www.vinci-melun.org/",
			dcTranslator.T(dcTranslation.LYCEE) + " Léonard de Vinci (Melun)",
			"BTS SIO SLAM | 2019 - 2021",
			"https://www.onisep.fr/ressources/univers-formation/Formations/Post-bac/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers"
		);

		this.addCard(
			imgEducationPath + "uruguay-logo.jpg",
			"http://www.uruguayfrance.fr/wp/",
			dcTranslator.T(dcTranslation.LYCEE) + " Uruguay France (Avon)",
			"BAC STMG SIG | 2017 - 2019",
			"https://www.onisep.fr/ressources/univers-formation/Formations/Lycees/bac-techno-stmg-sciences-et-technologies-du-management-et-de-la-gestion-enseignement-specifique-systemes-d-information-de-gestion"
		);
	}

	public addCard(imageSrc: string, imgLink: string, title: string, subTitle: string, readMoreLink: string): void {
		const cardContainer = _UDom.div({ className: EDUCATION_CSS.CARD_CONTAINER });

		const separator = _UDom.div({ className: EDUCATION_CSS.CARD_SEPARATOR });
		const icon = _UIcon.getIcon(DcIcons.DcIconGraduationCap, { className: EDUCATION_CSS.CARD_SEPARATOR_ICON });
		_UDom.AC(separator, icon);

		const card = _UDom.div({ className: EDUCATION_CSS.CARD });
		const cardHeader = _UDom.div({ className: EDUCATION_CSS.CARD_HEADER });
		const cardImage = _UDom.img({ src: imageSrc, className: EDUCATION_CSS.CARD_IMAGE });
		cardImage.addEventListener("click", () => window.open(imgLink, "_blank"))
		const cardTitle = _UDom.h1({ innerText: title, className: EDUCATION_CSS.CARD_TITLE });
		const cardSubTitle = _UDom.h2({ innerText: subTitle, className: EDUCATION_CSS.CARD_SUBTITLE });
		const readMore = _UDom.a({ href: readMoreLink, innerText: dcTranslator.T(dcTranslation.READ_MORE) + "...", className: EDUCATION_CSS.CARD_LINK, target: "_blank" });

		dcCursor.subscribeElementToDetectHover(cardImage);
		dcCursor.subscribeElementToDetectHover(readMore);

		_UDom.AC(card, _UDom.AC(cardHeader, cardImage, cardTitle), cardSubTitle, readMore);

		_UDom.AC(cardContainer, separator, card);

		this.mainElement.appendChild(cardContainer);
	}
	
}