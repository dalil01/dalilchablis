import { LOCALE } from "./app/Experience";
import { VIEWS } from "./app/components/View";

export class Vars {

	public static isDarkMode = true;
	public static isVRMode = false;
	public static locale = LOCALE.EN;
	public static soundEnable = false;
	public static currentView = VIEWS.HOME;
	public static modalIsOpen = false;

	public static DEFAULT_VEW: VIEWS = VIEWS.HOME;

	public static PATH = {
		DRACO_LOADER:  "libs/draco/",
		SOUND: "sounds/sound.mp3",
		LOGO: {
			DARK: "images/dcLogoBlack.svg",
			LIGHT: "images/dcLogoWhite.svg"
		},
		STUDIO_LIGHT_TEXTURE: "models/dcOffice-light.jpg",
		STUDIO_DARK_TEXTURE: "models/dcOffice-dark.jpg",
		STUDIO_GLB: "models/dcOffice.glb",
		OUTSIDE_CITY: "images/outside/outside-city.webp"
	};

}
