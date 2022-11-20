import "./dcCV.css";

import { dcView } from "../dcView";
import { _UDom } from "../../dcUtils/_UDom";
import { dcAboutMe } from "../../dcComponents/dcInfos/dcAboutMe/dcAboutMe";
import { _UIcon } from "../../dcUtils/_UIcon";
import { DcIcons } from "../../dcIcons/dcIcons";
import { dcTooltip } from "../../dcComponents/dcTooltip/dcTooltip";
import { dcTranslator } from "../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../dcTranslator/dcTranslation";
import { dcEducation } from "../../dcComponents/dcInfos/dcEducation/dcEducation";
import { dcExperience } from "../../dcComponents/dcInfos/dcExperience/dcExperience";
import { dcSkills } from "../../dcComponents/dcInfos/dcSkills/dcSkills";
import { dcProjects } from "../../dcComponents/dcInfos/dcProjects/dcProjects";
import { dcComponent } from "../../dcComponents/dcComponent";

enum CV_CSS_CLASSNAMES {
	SIDE_BAR = "cv-side-bar",
	SIDE_BAR_CONTENT = "cv-side-bar-content",
	SIDE_BAR_ICON = "cv-side-bar-icon",
	CONTENT = "cv-content",
}

export class dcCV extends dcView {
	
	private container!: HTMLDivElement;
	
	private aboutMe!: dcAboutMe;
	private education!: dcEducation;
	private experience!: dcExperience;
	private skills!: dcSkills;
	private projects!: dcProjects;
	
	private openedComponent!: dcComponent;
	
	public constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("cv"));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		this.buildSideBar();
		this.buildContainer();
	}
	
	private buildSideBar(): void {
		const sideBar = _UDom.div({ className: CV_CSS_CLASSNAMES.SIDE_BAR });
		const sideBarContent = _UDom.div({ className: CV_CSS_CLASSNAMES.SIDE_BAR_CONTENT });
		
		const aboutMeIcon = _UIcon.getIcon(DcIcons.DcIconAboutMe, { className: CV_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, aboutMeIcon, dcTranslator.T(dcTranslation.ABOUT_ME), true);
		aboutMeIcon.addEventListener("click", () => this.openComponent(this.aboutMe));
		
		const educationIcon = _UIcon.getIcon(DcIcons.DcIconGraduationCap, { className: CV_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, educationIcon, dcTranslator.T(dcTranslation.EDUCATION), true);
		educationIcon.addEventListener("click", () => this.openComponent(this.education));
		
		const experienceIcon = _UIcon.getIcon(DcIcons.DcIconWorkExperience, { className: CV_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, experienceIcon, dcTranslator.T(dcTranslation.EXPERIENCE), true);
		experienceIcon.addEventListener("click", () => this.openComponent(this.experience));
		
		const skillsIcon = _UIcon.getIcon(DcIcons.DcIconSkills, { className: CV_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, skillsIcon, dcTranslator.T(dcTranslation.SKILLS), true);
		skillsIcon.addEventListener("click", () => this.openComponent(this.skills));
		
		const projectsIcon = _UIcon.getIcon(DcIcons.DcIconHeart, { className: CV_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, projectsIcon, dcTranslator.T(dcTranslation.PROJECTS), true);
		projectsIcon.addEventListener("click", () => this.openComponent(this.projects));
		
		_UDom.AC(this.getMainElement(), _UDom.AC(sideBar, sideBarContent));
	}
	
	private buildContainer(): void {
		this.container = _UDom.div({ className: CV_CSS_CLASSNAMES.CONTENT });
		
		this.aboutMe = this.openedComponent = new dcAboutMe(this.container, true);
		this.education = new dcEducation(this.container);
		this.experience = new dcExperience(this.container);
		this.skills = new dcSkills(this.container);
		this.projects = new dcProjects(this.container);
		
		_UDom.AC(this.getMainElement(), this.container);
	}
	
	private openComponent(infoComponent: dcComponent): void {
		if (infoComponent != this.openedComponent) {
			this.openedComponent.destroy();
			this.openedComponent = infoComponent;
			this.openedComponent.init();
		}
	}
	
}