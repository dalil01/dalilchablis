import { Translation } from "./Translation";
import { LOCALE } from "../Experience";
import { Vars } from "../../Vars";

export class Translator {
	
	/**
	 * Translate key in current locale.
	 */
	public static T(key: Translation): string {
		const k = Translation[key];
		return (Vars.locale === LOCALE.EN) ? Translation[k].EN : Translation[k].FR;
	}
	
}
