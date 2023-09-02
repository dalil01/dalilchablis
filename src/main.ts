import "./styles.css";

import { registerSW } from "virtual:pwa-register";
import { Experience } from "./app/Experience";

window.addEventListener("load", () => {
	if ("serviceWorker" in navigator) {
		registerSW({ immediate: true });
	}

	Experience.get(globalThis.document.body).start();
});
