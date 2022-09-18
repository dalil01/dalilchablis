import {T_TRANSLATION} from "./dcTranslation";

export class dcTranslator {

	private translations: Map<string, string>;

	constructor() {
		this.translations = new Map();
	}

	/**
	 * Translate key in current locale.
	 */
	public static T(key: T_TRANSLATION): void {
		// TODO
		// this.translations.set(key)
	}

}
