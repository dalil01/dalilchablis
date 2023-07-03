import "./styles.css";

import { registerSW } from 'virtual:pwa-register';
import { dcUIManager } from "./app/ui/dcUIManager";

window.addEventListener("load", () => {
	if ('serviceWorker' in navigator) {
		registerSW({ immediate: true });
	}

	dcUIManager.get(globalThis.document.body).start();
});
