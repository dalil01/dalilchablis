import { dcExperienceType } from "./dcExperience";
import { dcTranslator } from "../../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../../dcTranslator/dcTranslation";

export class dcEducationData {

	public static getData(): dcExperienceType[] {
		return [
			{
				imageSrc: import((`images/experience/dcbrain-logo.webp`)),
				imgLink: "https://dcbrain.com/",
				title: "DCbrain (Paris)",
				jobTitle: dcTranslator.T(dcTranslation.FULLSTACK_DEVELOPER) + " - " + dcTranslator.T(dcTranslation.APPRENTICE) + " | " + "2021 - " + dcTranslator.T(dcTranslation.TODAY),
				jobSubTitles: [
					"• " + dcTranslator.T(dcTranslation.DCBRAIN_APPRENTICE_2),
					"• " + dcTranslator.T(dcTranslation.DCBRAIN_APPRENTICE_3),
					"• " + dcTranslator.T(dcTranslation.DCBRAIN_APPRENTICE_1)
				]
			},
			{
				imageSrc: import((`images/experience/dcbrain-logo.webp`)),
				imgLink: "https://dcbrain.com/",
				title: "DCbrain (Paris)",
				jobTitle: "QA " + dcTranslator.T(dcTranslation.TESTER) + " - Freelance | 2021 (7 " + dcTranslator.T(dcTranslation.MONTHS) + ')',
				jobSubTitles: dcTranslator.T(dcTranslation.DCBRAIN_FREELANCE_WORK)
			},
			{
				imageSrc: import((`images/experience/dcbrain-logo.webp`)),
				imgLink: "https://dcbrain.com/",
				title: "DCbrain (Paris)",
				jobTitle: dcTranslator.T(dcTranslation.INTERN) + " | 2021 (2 " + dcTranslator.T(dcTranslation.MONTHS) + ')',
				jobSubTitles: dcTranslator.T(dcTranslation.DCBRAIN_INTERN_WORK),
				link: "https://gitlab.com/dalil01/automatisation-test-e2e"
			},
			{
				imageSrc: import((`images/experience/carrefour-logo.webp`)),
				imgLink: "https://www.carrefour.fr/magasin/market-ecuelles",
				title: "Carrefour Market (Ecuelles)",
				jobTitle: dcTranslator.T(dcTranslation.SUMMER_JOB) + " | 2020 (1 " + dcTranslator.T(dcTranslation.MONTHS) + ')',
				jobSubTitles: dcTranslator.T(dcTranslation.CASHIER_SHELF_WORKER) + '.'
			}
		];
	}

}