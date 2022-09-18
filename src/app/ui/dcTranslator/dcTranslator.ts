import {dcTranslation} from "./dcTranslation";
import {dcTranslated} from "./dcTranslated";
import {dcGlobalConfig} from "../../global/dcGlobalConfig";
import {LOCALE} from "../../global/dcGlobalEnums";

export class dcTranslator {

	/**
	 * Translate key in current locale.
	 */
	public static T(key: dcTranslation): string {
		const k = dcTranslation[key];
		return (dcGlobalConfig.locale === LOCALE.EN) ? dcTranslated[k].EN : dcTranslated[k].FR;
	}

}
