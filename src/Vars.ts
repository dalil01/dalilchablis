import { VIEWS } from "./app/ui/views/View";

export const IMAGES_DIR = "images/";
export const MODELS_DIR = "models/";

export enum LOCALE {
	EN = "EN",
	FR = "FR"
}

export class Vars {

	public static DEFAULT_VEW: VIEWS = VIEWS.HOME;
	public static CURRENT_VIEW = VIEWS.HOME;

	public static IS_DARK_MODE = true;
	public static IS_VR_MODE = false;
	public static LOCALE: LOCALE = LOCALE.EN;
	public static SOUND_ENABLE = false;
	public static MODAL_IS_OPEN = false;

	public static PATH = {
		IMAGES_DIR,
		MODELS_DIR,
		DRACO_LOADER:  "libs/draco/",
		SOUND: "sounds/dcSound.mp3",
		LOGO: {
			DARK: IMAGES_DIR + "dcLogoBlack.svg",
			LIGHT: IMAGES_DIR + "dcLogoWhite.svg"
		},
		STUDIO_LIGHT_TEXTURE: MODELS_DIR + "dcOffice-light.jpg",
		STUDIO_DARK_TEXTURE: MODELS_DIR + "dcOffice-dark.jpg",
		STUDIO_GLB: MODELS_DIR + "dcOffice.glb",
		OUTSIDE_CITY: IMAGES_DIR + "outside/outside-city.webp"
	};

	public static CODE_LAB_URL = "https://dalil01.dev/";

}
