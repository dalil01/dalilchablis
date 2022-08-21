import { dcView } from "../dcView";
import { _UDom } from "../../dcUtils/_UDom";

export class dcHome extends dcView {

	private static INSTANCE: dcHome;

	private constructor(parentElement: HTMLElement, mainElement: HTMLElement) {
		super(parentElement, mainElement);
	}

	public static getInstance(parentElement: HTMLElement): dcHome {
		if (!dcHome.INSTANCE) {
			dcHome.INSTANCE = new dcHome(parentElement, _UDom.CCE("home"));
		}

		return dcHome.INSTANCE;
	}

	protected buildUI(): void {
	}

}