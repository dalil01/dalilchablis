import "./dcDashboard.css";

import { dcView } from "../../../../../../src/app/ui/dcViews/dcView";
import { _UDom } from "../../../../../../src/app/ui/dcUtils/_UDom";
import { dcAboutMe } from "../../../../../../src/app/ui/dcComponents/dcInfos/dcAboutMe/dcAboutMe";
import { _UIcon } from "../../../../../../src/app/ui/dcUtils/_UIcon";
import { DcIcons } from "../../../../../../src/app/ui/dcIcons/dcIcons";
import { dcTooltip } from "../../../../../../src/app/ui/dcComponents/dcTooltip/dcTooltip";
import { dcTranslator } from "../../../../../../src/app/ui/dcTranslator/dcTranslator";
import { dcTranslation } from "../../../../../../src/app/ui/dcTranslator/dcTranslation";
import { dcEducation } from "../../../../../../src/app/ui/dcComponents/dcInfos/dcEducation/dcEducation";
import { dcExperience } from "../../../../../../src/app/ui/dcComponents/dcInfos/dcExperience/dcExperience";
import { dcSkills } from "../../../../../../src/app/ui/dcComponents/dcInfos/dcSkills/dcSkills";
import { dcProjects } from "../../../../../../src/app/ui/dcComponents/dcInfos/dcProjects/dcProjects";
import { dcComponent } from "../../../../../../src/app/ui/dcComponents/dcComponent";

enum DASHBOARD_CSS_CLASSNAMES {
	SIDE_BAR = "dashboard-side-bar",
	SIDE_BAR_CONTENT = "dashboard-side-bar-content",
	SIDE_BAR_ICON = "dashboard-side-bar-icon",
	CONTENT = "dashboard-content",
	FIRST_LINE = "dashboard-first-line",
	SECOND_LINE = "dashboard-second-line",
}

export class dcDashboard extends dcView {
	
	private container!: HTMLDivElement;
	
	private aboutMe!: dcAboutMe;
	private education!: dcEducation;
	private experience!: dcExperience;
	private skills!: dcSkills;
	private projects!: dcProjects;
	
	private openedComponent!: dcComponent;
	
	public constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("dashboard"));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		this.buildSideBar();
		this.buildContainer();
	}
	
	private buildSideBar(): void {
		const sideBar = _UDom.div({ className: DASHBOARD_CSS_CLASSNAMES.SIDE_BAR });
		const sideBarContent = _UDom.div({ className: DASHBOARD_CSS_CLASSNAMES.SIDE_BAR_CONTENT });
		
		const aboutMeIcon = _UIcon.getIcon(DcIcons.DcIconAboutMe, { className: DASHBOARD_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, aboutMeIcon, dcTranslator.T(dcTranslation.ABOUT_ME), true);
		aboutMeIcon.addEventListener("click", () => this.openComponent(this.aboutMe));
		
		const educationIcon = _UIcon.getIcon(DcIcons.DcIconGraduationCap, { className: DASHBOARD_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, educationIcon, dcTranslator.T(dcTranslation.EDUCATION), true);
		educationIcon.addEventListener("click", () => this.openComponent(this.education));
		
		const experienceIcon = _UIcon.getIcon(DcIcons.DcIconWorkExperience, { className: DASHBOARD_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, experienceIcon, dcTranslator.T(dcTranslation.EXPERIENCE), true);
		experienceIcon.addEventListener("click", () => this.openComponent(this.experience));
		
		const skillsIcon = _UIcon.getIcon(DcIcons.DcIconSkills, { className: DASHBOARD_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, skillsIcon, dcTranslator.T(dcTranslation.SKILLS), true);
		skillsIcon.addEventListener("click", () => this.openComponent(this.skills));
		
		const projectsIcon = _UIcon.getIcon(DcIcons.DcIconHeart, { className: DASHBOARD_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, projectsIcon, dcTranslator.T(dcTranslation.PROJECTS), true);
		projectsIcon.addEventListener("click", () => this.openComponent(this.projects));
		
		_UDom.AC(this.getMainElement(), _UDom.AC(sideBar, sideBarContent));
	}
	
	private buildContainer(): void {
		this.container = _UDom.div({ className: DASHBOARD_CSS_CLASSNAMES.CONTENT });
		
		const firstLine = _UDom.div({ className: DASHBOARD_CSS_CLASSNAMES.FIRST_LINE });
		this.aboutMe = this.openedComponent = new dcAboutMe(firstLine, true);
		this.education = new dcEducation(firstLine, true);
		this.experience = new dcExperience(firstLine, true);
		this.container.appendChild(firstLine);
		
		const secondLine = _UDom.div({ className: DASHBOARD_CSS_CLASSNAMES.SECOND_LINE });
		this.skills = new dcSkills(secondLine, true);
		this.projects = new dcProjects(secondLine, true);
		this.container.appendChild(secondLine);
		
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