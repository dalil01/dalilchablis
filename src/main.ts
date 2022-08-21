import "./styles.css";
import { dcUIManager } from "./app/ui/dcUIManager";

export enum GLOBAL_VARS {
	DRACO_LOADER_PATH = "./libs/draco/",
	VIRTUAL_STUDIO_TEXTURE_PATH = "./assets/models/dcStudio/dcStudio.jpg",
	VIRTUAL_STUDIO_GLB_PATH = "./assets/models/dcStudio/dcStudio.glb"
}

window.addEventListener("load", () => {
	dcUIManager.getInstance(document.body).start();
});