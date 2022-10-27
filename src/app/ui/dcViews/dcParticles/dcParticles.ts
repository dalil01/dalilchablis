import {dcView} from "../dcView";
import {_UDom} from "../../dcUtils/_UDom";

enum PARTICLES_CSS_CLASSNAMES {
    CONTAINER = "particles-container",

}

export class dcParticles extends dcView {

    private static INSTANCE: dcParticles;

    private constructor(parentElement: HTMLElement, mainElement: HTMLElement, autoInit: boolean = false) {
        super(parentElement, mainElement);
    }

    public static getInstance(parentElement: HTMLElement, autoInit: boolean = false): dcParticles {
        if (!dcParticles.INSTANCE) {
            dcParticles.INSTANCE = new dcParticles(parentElement, _UDom.CCE("office", {className: PARTICLES_CSS_CLASSNAMES.CONTAINER}), autoInit);
        }

        dcParticles.INSTANCE.executeOnReadyCallback();

        return dcParticles.INSTANCE;
    }



}
