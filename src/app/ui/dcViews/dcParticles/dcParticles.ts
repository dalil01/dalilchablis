// https://particles.js.org/

import "./dcParticles.css";

import {dcView} from "../dcView";
import {_UDom} from "../../dcUtils/_UDom";
import {InteractivityDetect, MoveDirection, OutMode, tsParticles} from "tsparticles-engine";
import { loadBigCirclesPreset } from "tsparticles-preset-big-circles";
import {dcGlobalConfig} from "../../../global/dcGlobalConfig";

enum PARTICLES_CSS_CLASSNAMES {
    CONTAINER = "particles-container",

}

export class dcParticles extends dcView {

    private static ID = "particles";
    private static INSTANCE: dcParticles;

    private constructor(parentElement: HTMLElement, autoInit: boolean = false) {
        super(parentElement, _UDom.CCE("particles"));
        if (autoInit)
            this.init();
    }

    public init() {
        this.buildUI();
    }

    public static getInstance(parentElement: HTMLElement, autoInit: boolean = false): dcParticles {
        if (!dcParticles.INSTANCE) {
            dcParticles.INSTANCE = new dcParticles(parentElement, autoInit);
        }

        return dcParticles.INSTANCE;
    }

    public buildUI(): void {
        /*
        (async () => {
            await loadBigCirclesPreset(tsParticles);

            await tsParticles.load(dcParticles.ID, {
                fpsLimit: 30,
                smooth: true,
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "bubble",
                            parallax: {
                                enable: false,
                                force: 2,
                                smooth: 10
                            }
                        }
                    },
                    modes: {
                        bubble: {
                            distance: 40,
                            duration: 2,
                            opacity: 8,
                            size: 15
                        }
                    }
                },
                particles: {
                    move: {
                        direction: "none",
                        distance: 5,
                        enable: true,
                        outModes: "none",
                        speed: 1
                    },
                    number: {
                        value: 600
                    },
                    shape: {
                        type: ["circle", "square", "triangle"]
                    },
                    size: {
                        value: {
                            min: 3,
                            max: 5
                        }
                    }
                },
                background: {
                    color: dcGlobalConfig.isDarkMode ? "#000000" : "#FFFFFF"
                },
                preset: "bigCircles",
            });

            this.executeOnReadyCallback();
        })();

         */
       this.executeOnReadyCallback();

    }

}
