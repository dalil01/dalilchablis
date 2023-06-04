import "./styles.css";

import { dcUIManager } from "./app/ui/dcUIManager";

window.addEventListener("load", () => {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
			console.log("Service Worker successfully registered:", registration.scope);
		}, function(error) {
			console.log("Service Worker registration failed:", error);
		});
	}

	dcUIManager.get(globalThis.document.body).start();
});
