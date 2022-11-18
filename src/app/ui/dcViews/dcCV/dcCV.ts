import "./dcCV.css";

import { dcView } from "../dcView";
import { _UDom } from "../../dcUtils/_UDom";
import { dcAboutMe } from "../../dcComponents/dcInfos/dcAboutMe/dcAboutMe";
import { _UIcon } from "../../dcUtils/_UIcon";
import { DcIcons } from "../../dcIcons/dcIcons";
import { dcTooltip } from "../../dcComponents/dcTooltip/dcTooltip";
import { dcTranslator } from "../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../dcTranslator/dcTranslation";

enum CV_CSS_CLASSNAMES {
	SIDE_BAR = "cv-side-bar",
	SIDE_BAR_CONTENT = "cv-side-bar-content",
	SIDE_BAR_ICON = "cv-side-bar-icon",
	CONTENT = "cv-content",
}

export class dcCV extends dcView {
	
	public constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("cv"));

		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		this.buildSideBar();
		
		//new dcSideBar(this.getMainElement(), true);
		
		const container = _UDom.div({  className: CV_CSS_CLASSNAMES.CONTENT });
		
		new dcAboutMe(container, true);
		
		_UDom.AC(this.getMainElement(), container);
	}
	
	public buildSideBar(): void {
		const sideBar = _UDom.div({ className: CV_CSS_CLASSNAMES.SIDE_BAR });
		const sideBarContent = _UDom.div({ className: CV_CSS_CLASSNAMES.SIDE_BAR_CONTENT });
		
		const aboutMeIcon = _UIcon.getIcon(DcIcons.DcIconUser, { className: CV_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, aboutMeIcon, dcTranslator.T(dcTranslation.ABOUT_ME), true);
		
		const educationIcon = _UIcon.getIcon(DcIcons.DcIconGraduationCap, { className: CV_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, educationIcon, dcTranslator.T(dcTranslation.EDUCATION), true);
		
		const skillsIcon = _UIcon.getIcon(DcIcons.DcIconSkills, { className: CV_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, skillsIcon, dcTranslator.T(dcTranslation.SKILLS), true);
		
		const experienceIcon = _UIcon.getIcon(DcIcons.DcIconSkills, { className: CV_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, experienceIcon, dcTranslator.T(dcTranslation.EXPERIENCE), true);
		
		const projectsIcon = _UIcon.getIcon(DcIcons.DcIconHeart, { className: CV_CSS_CLASSNAMES.SIDE_BAR_ICON });
		new dcTooltip(sideBarContent, projectsIcon, dcTranslator.T(dcTranslation.PROJECTS), true);
		
		_UDom.AC(this.getMainElement(), _UDom.AC(sideBar, sideBarContent));
	}
	
}