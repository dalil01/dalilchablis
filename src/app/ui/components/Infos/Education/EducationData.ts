import { EducationType } from "./Education";
import { Translator } from "../../../../translator/Translator";
import { Translation } from "../../../../translator/Translation";

export class EducationData {

	public static getData(): EducationType[] {
		return [
			{
				imageSrc: "images/education/epitech-logo.webp",
				imgLink: "https://www.epitech.eu/",
				title: "Epitech - " + Translator.T(Translation.EPITECH_DESCRIPTION) + " (Paris)",
				subTitle: "MSc Pro | 2022 - 2025",
				readMoreLink: "https://www.epitech.eu/fr/formations/msc-pro-epitech-technology"
			},
			{
				imageSrc: "images/education/sorbonne-logo.webp",
				imgLink: "https://www.sorbonne-universite.fr/",
				title: "SORBONNE " + Translator.T(Translation.UNIVERSITY) + " - " + Translator.T(Translation.CFA_SCIENCES) + " (Paris)",
				subTitle: "DANT | 2021 - 2022",
				readMoreLink: "https://www.cfa-sciences.fr/fr/licence-informatique-l3-dant-developpeur-dapplications-nouvelles-technologies"
			},
			{
				imageSrc: "images/education/ldv-logo.webp",
				imgLink: "https://www.vinci-melun.org/",
				title: Translator.T(Translation.LYCEE) + " Léonard de Vinci (Melun)",
				subTitle: "BTS SIO SLAM | 2019 - 2021",
				readMoreLink: "https://www.onisep.fr/ressources/univers-formation/Formations/Post-bac/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers"
			},
			{
				imageSrc: "images/education/uruguay-logo.webp",
				imgLink: "http://www.uruguayfrance.fr/wp/",
				title: Translator.T(Translation.LYCEE) + " Uruguay France (Avon)",
				subTitle: "BAC STMG SIG | 2017 - 2019",
				readMoreLink: "https://www.onisep.fr/ressources/univers-formation/Formations/Lycees/bac-techno-stmg-sciences-et-technologies-du-management-et-de-la-gestion-enseignement-specifique-systemes-d-information-de-gestion"
			}
		];
	}

}