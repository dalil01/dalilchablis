import "./styles.css";

import { dcUIManager } from "./app/ui/dcUIManager";

window.addEventListener("load", () => {
	if ("serviceWorker" in navigator) {
		(async () => {
			const { default: serviceWorker } = await import("./service-worker.js");
			navigator.serviceWorker.register(serviceWorker).then(function(registration) {
				console.log("Service Worker successfully registered:", registration.scope);
			}).catch(function(error) {
				console.log("Service Worker registration failed:", error);
			});
		})();
	}

	dcUIManager.get(globalThis.document.body).start();
});
