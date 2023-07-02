import { VIEWS } from "./dcGlobalEnums";

export class dcGlobalVars {

	public static DEFAULT_VEW = VIEWS.HOME;
	public static DRACO_LOADER_PATH = "./libs/draco/";

	public static async getSoundFilePath(): Promise<string> {
		const module = await import((`../../assets/sounds/dcSound.mp3`));
		return module.default;
	}

	public static async getLogoDarkPath(): Promise<string> {
		const module = await import((`../../assets/images/dcLogoBlack.svg`));
		return module.default;
	}

	public static async getLogoWhitePath(): Promise<string> {
		const module = await import((`../../assets/images/dcLogoWhite.svg`));
		return module.default;
	}

	public static async getVirtualStudioLightTexturePath(): Promise<string> {
		const module = await import((`../../assets/models/dcOffice-light.jpg`));
		return module.default;
	}

	public static async getVirtualStudioDarkTexturePath(): Promise<string> {
		const module = await import((`../../assets/models/dcOffice-dark.jpg`));
		return module.default;
	}

	public static async getDCStudioGLBPath(): Promise<string> {
		const module = await import((`../../assets/models/dcOffice.glb`));
		return module.default;
	}

	public static async getOutsideCityPath(): Promise<string> {
		const module = await import((`../../assets/images/outside/outside-city.webp`));
		return module.default;
	}

}
