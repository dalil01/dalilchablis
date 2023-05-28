import "./styles.css";

import { dcUIManager } from "./app/ui/dcUIManager";

window.addEventListener("load", () => {
	dcUIManager.get(globalThis.document.body).start();
});
