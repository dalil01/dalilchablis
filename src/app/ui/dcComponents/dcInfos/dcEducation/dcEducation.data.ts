import { dcEducationType } from "./dcEducation";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";

export class dcEducationData {

	public static getData(): dcEducationType[] {
		return [
			{
				imageSrc: import((`../../../../../assets/images/education/epitech-logo.webp`)),
				imgLink: "https://www.epitech.eu/",
				title: "Epitech - " + dcTranslator.T(dcTranslation.EPITECH_DESCRIPTION) + " (Paris)",
				subTitle: "MSc Pro | 2022 - 2025",
				readMoreLink: "https://www.epitech.eu/fr/formations/msc-pro-epitech-technology"
			},
			{
				imageSrc: import((`../../../../../assets/images/education/sorbonne-logo.webp`)),
				imgLink: "https://www.sorbonne-universite.fr/",
				title: "SORBONNE " + dcTranslator.T(dcTranslation.UNIVERSITY) + " - " + dcTranslator.T(dcTranslation.CFA_SCIENCES) + " (Paris)",
				subTitle: "DANT | 2021 - 2022",
				readMoreLink: "https://www.cfa-sciences.fr/fr/licence-informatique-l3-dant-developpeur-dapplications-nouvelles-technologies"
			},
			{
				imageSrc: import((`../../../../../assets/images/education/ldv-logo.webp`)),
				imgLink: "https://www.vinci-melun.org/",
				title: dcTranslator.T(dcTranslation.LYCEE) + " Léonard de Vinci (Melun)",
				subTitle: "BTS SIO SLAM | 2019 - 2021",
				readMoreLink: "https://www.onisep.fr/ressources/univers-formation/Formations/Post-bac/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers"
			},
			{
				imageSrc: import((`../../../../../assets/images/education/uruguay-logo.webp`)),
				imgLink: "http://www.uruguayfrance.fr/wp/",
				title: dcTranslator.T(dcTranslation.LYCEE) + " Uruguay France (Avon)",
				subTitle: "BAC STMG SIG | 2017 - 2019",
				readMoreLink: "https://www.onisep.fr/ressources/univers-formation/Formations/Lycees/bac-techno-stmg-sciences-et-technologies-du-management-et-de-la-gestion-enseignement-specifique-systemes-d-information-de-gestion"
			}
		];
	}

}