import { Translation } from "./Translation";
import { LOCALE, Vars } from "../../Vars";
import { Translated } from "./Translated";

export class Translator {
	
	/**
	 * Translate key in current locale.
	 */
	public static T(key: Translation): string {
		const k = Translation[key];
		return (Vars.LOCALE === LOCALE.EN) ? Translated[k].EN : Translated[k].FR;
	}
	
}
