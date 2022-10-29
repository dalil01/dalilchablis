import "./styles.css";

import { dcUIManager } from "./app/ui/dcUIManager";

window.addEventListener("load", () => {
	dcUIManager.getInstance(globalThis.document.body).start();
});
