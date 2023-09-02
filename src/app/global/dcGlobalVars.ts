import { VIEWS } from "./dcGlobalEnums";

export class dcGlobalVars {

	public static DEFAULT_VEW: VIEWS = VIEWS.HOME;
	public static DRACO_LOADER_PATH: string = "libs/draco/";

	public static getSoundFilePath(): string {
		return "sounds/dcSound.mp3";
	}

	public static async getLogoDarkPath(): Promise<string> {
		const module = await import((`images/dcLogoBlack.svg`));
		return module.default;
	}

	public static async getLogoWhitePath(): Promise<string> {
		const module = await import((`images/dcLogoWhite.svg`));
		return module.default;
	}

	public static async getVirtualStudioLightTexturePath(): Promise<string> {
		const module = await import((`models/dcOffice-light.jpg`));
		return module.default;
	}

	public static async getVirtualStudioDarkTexturePath(): Promise<string> {
		const module = await import((`models/dcOffice-dark.jpg`));
		return module.default;
	}

	public static async getDCStudioGLBPath(): Promise<string> {
		const module = await import((`models/dcOffice.glb`));
		return module.default;
	}

	public static async getOutsideCityPath(): Promise<string> {
		const module = await import((`images/outside/outside-city.webp`));
		return module.default;
	}

}
