import "./dcVirtualStudio.css";
import { dcView } from "../dcView";
import { _UDom } from "../../dcUtils/_UDom";

enum VIRTUAL_STUDIO_CSS_CLASSNAMES {
	CONTAINER = "virtual-studio-container"
}

export class dcVirtualStudio extends dcView {

	private static INSTANCE: dcVirtualStudio;

	private readonly canvas: HTMLCanvasElement;

	private constructor(parentElement: HTMLElement, mainElement: HTMLElement) {
		super(parentElement, mainElement);
		this.canvas = _UDom.CE("canvas");
	}

	public static getInstance(parentElement: HTMLElement): dcVirtualStudio {
		if (!dcVirtualStudio.INSTANCE) {
			dcVirtualStudio.INSTANCE = new dcVirtualStudio(parentElement, _UDom.CCE("virtual-studio"));
		}

		return dcVirtualStudio.INSTANCE;
	}

	protected buildUI(): void {
		console.log("dcVirtualStudio", this.getMainElement());
		this.getMainElement().appendChild(this.canvas);
	}

	private async buildScene(): Promise<void> {

	}

	private async loadRessources(): Promise<void> {

	}

}