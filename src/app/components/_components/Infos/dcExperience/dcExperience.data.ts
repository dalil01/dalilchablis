import { dcExperienceType } from "./dcExperience";
import { dcTranslator } from "../../../../translator/translator";
import { translation } from "../../../../translator/Translation";

export class dcEducationData {

	public static getData(): dcExperienceType[] {
		return [
			{
				imageSrc: import((`images/experience/dcbrain-logo.webp`)),
				imgLink: "https://dcbrain.com/",
				title: "DCbrain (Paris)",
				jobTitle: dcTranslator.T(translation.FULLSTACK_DEVELOPER) + " - " + dcTranslator.T(translation.APPRENTICE) + " | " + "2021 - " + dcTranslator.T(translation.TODAY),
				jobSubTitles: [
					"• " + dcTranslator.T(translation.DCBRAIN_APPRENTICE_2),
					"• " + dcTranslator.T(translation.DCBRAIN_APPRENTICE_3),
					"• " + dcTranslator.T(translation.DCBRAIN_APPRENTICE_1)
				]
			},
			{
				imageSrc: import((`images/experience/dcbrain-logo.webp`)),
				imgLink: "https://dcbrain.com/",
				title: "DCbrain (Paris)",
				jobTitle: "QA " + dcTranslator.T(translation.TESTER) + " - Freelance | 2021 (7 " + dcTranslator.T(translation.MONTHS) + ')',
				jobSubTitles: dcTranslator.T(translation.DCBRAIN_FREELANCE_WORK)
			},
			{
				imageSrc: import((`images/experience/dcbrain-logo.webp`)),
				imgLink: "https://dcbrain.com/",
				title: "DCbrain (Paris)",
				jobTitle: dcTranslator.T(translation.INTERN) + " | 2021 (2 " + dcTranslator.T(translation.MONTHS) + ')',
				jobSubTitles: dcTranslator.T(translation.DCBRAIN_INTERN_WORK),
				link: "https://gitlab.com/dalil01/automatisation-test-e2e"
			},
			{
				imageSrc: import((`images/experience/carrefour-logo.webp`)),
				imgLink: "https://www.carrefour.fr/magasin/market-ecuelles",
				title: "Carrefour Market (Ecuelles)",
				jobTitle: dcTranslator.T(translation.SUMMER_JOB) + " | 2020 (1 " + dcTranslator.T(translation.MONTHS) + ')',
				jobSubTitles: dcTranslator.T(translation.CASHIER_SHELF_WORKER) + '.'
			}
		];
	}

}