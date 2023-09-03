import { ExperienceType } from "./Experience";
import { Translator } from "../../../../translator/Translator";
import { Translation } from "../../../../translator/Translation";

export class EducationData {

	public static getData(): ExperienceType[] {
		return [
			{
				imageSrc: "images/experience/dcbrain-logo.webp",
				imgLink: "https://dcbrain.com/",
				title: "DCbrain (Paris)",
				jobTitle: Translator.T(Translation.FULLSTACK_DEVELOPER) + " - " + Translator.T(Translation.APPRENTICE) + " | " + "2021 - " + Translator.T(Translation.TODAY),
				jobSubTitles: [
					"• " + Translator.T(Translation.DCBRAIN_APPRENTICE_2),
					"• " + Translator.T(Translation.DCBRAIN_APPRENTICE_3),
					"• " + Translator.T(Translation.DCBRAIN_APPRENTICE_1)
				]
			},
			{
				imageSrc: "images/experience/dcbrain-logo.webp",
				imgLink: "https://dcbrain.com/",
				title: "DCbrain (Paris)",
				jobTitle: "QA " + Translator.T(Translation.TESTER) + " - Freelance | 2021 (7 " + Translator.T(Translation.MONTHS) + ')',
				jobSubTitles: Translator.T(Translation.DCBRAIN_FREELANCE_WORK)
			},
			{
				imageSrc: "images/experience/dcbrain-logo.webp",
				imgLink: "https://dcbrain.com/",
				title: "DCbrain (Paris)",
				jobTitle: Translator.T(Translation.INTERN) + " | 2021 (2 " + Translator.T(Translation.MONTHS) + ')',
				jobSubTitles: Translator.T(Translation.DCBRAIN_INTERN_WORK),
				link: "https://gitlab.com/dalil01/automatisation-test-e2e"
			},
			{
				imageSrc: "images/experience/carrefour-logo.webp",
				imgLink: "https://www.carrefour.fr/magasin/market-ecuelles",
				title: "Carrefour Market (Ecuelles)",
				jobTitle: Translator.T(Translation.SUMMER_JOB) + " | 2020 (1 " + Translator.T(Translation.MONTHS) + ')',
				jobSubTitles: Translator.T(Translation.CASHIER_SHELF_WORKER) + '.'
			}
		];
	}

}