import {dcTranslation} from "./dcTranslation";

export class dcTranslator {

	private translations: Map<string, string>;

	constructor() {
		this.translations = new Map();
	}

	/**
	 * Translate key in current locale.
	 */
	public static T(key: dcTranslation): void {
		// TODO
		// this.translations.set(key)
	}

}
