import { _UDom } from "./dcUtils/_UDom";

export abstract class dcUI {
	
	private parentElement: HTMLElement;
	private mainElement: HTMLElement;
	
	private initiated: boolean;
	
	protected constructor(parentElement: HTMLElement, mainElement: HTMLElement, autoInit: boolean = false) {
		this.parentElement = parentElement;
		this.mainElement = mainElement;
		this.initiated = false;
	}
	
	public getParentElement(): HTMLElement {
		return this.parentElement;
	}
	
	public getMainElement(): HTMLElement {
		return this.mainElement;
	}
	
	public isInitiated(): boolean {
		return this.initiated;
	}
	
	public setParentElement(parentElement: HTMLElement): void {
		this.parentElement = parentElement;
	}
	
	public setMainElement(mainElement: HTMLElement): void {
		this.mainElement = mainElement;
	}
	
	public init(): void {
		if (!this.initiated) {
			this.buildUI();
			this.parentElement.appendChild(this.mainElement);
			this.initiated = true;
		}
	}
	
	public destroy(): void {
		if (this.initiated) {
			_UDom.removeAllChildren(this.parentElement);
			_UDom.removeAllChildren(this.mainElement);
			this.initiated = false;
		}
	}
	
	protected buildUI(): void {
		throw new Error("This method must be implemented.");
	}
	
}
