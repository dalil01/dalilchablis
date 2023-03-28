import "./dcContact.css";

import { dcComponent } from "../dcComponent";
import { _UDom } from "../../dcUtils/_UDom";
import { _UIcon } from "../../dcUtils/_UIcon";
import { DcIcons } from "../../dcIcons/dcIcons";
import { dcCursor } from "../dcCursor/dcCursor";
import { dcTranslator } from "../../dcTranslator/dcTranslator";
import { dcTranslation } from "../../dcTranslator/dcTranslation";
import { SOCIAL_NETWORKS_LINKS } from "../../../global/dcGlobalEnums";
import { dcForm, dcFormInputType, INPUT_TYPE } from "../dcForm/dcForm";
import { dcTooltip } from "../dcTooltip/dcTooltip";

enum CONTACT_CSS {
	CONTAINER = "contact-container",
	SOCIAL_NETWORKS_CONTAINER = "contact-social-networks-container",
	SOCIAL_NETWORKS_TITLE = "contact-social-networks-title",
	SOCIAL_NETWORKS = "contact-social-networks",
	SOCIAL_NETWORK = "contact-social-network",
	FORM_CONTAINER = "contact-form-container",
	FORM_TITLE = "contact-form-title",
}

export class dcContact extends dcComponent {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, _UDom.CCE("contact", { className: CONTACT_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const socialNetworksContainer = _UDom.div({ className: CONTACT_CSS.SOCIAL_NETWORKS_CONTAINER });
		const socialNetworksTitle = _UDom.h2({
			innerText: dcTranslator.T(dcTranslation.SOCIAL_NETWORKS),
			className: CONTACT_CSS.SOCIAL_NETWORKS_TITLE
		});
		const socialNetworks = _UDom.div({ className: CONTACT_CSS.SOCIAL_NETWORKS });
		
		const instagramIcon = _UDom.AC(_UDom.div(), _UIcon.getIcon(DcIcons.DcIconInstagramLogo, { title: "Instagram" }));
		const snapchatIcon = _UDom.AC(_UDom.div(), _UIcon.getIcon(DcIcons.DcIconSnapchatLogo, { title: "Snapchat" }));
		const twitterIcon = _UDom.AC(_UDom.div(), _UIcon.getIcon(DcIcons.DcIconTwitterLogo, { title: "Twitter" }));
		const githubIcon = _UDom.AC(_UDom.div(), _UIcon.getIcon(DcIcons.DcIconGithubLogo, { title: "Github" }));
		const gitlabIcon = _UDom.AC(_UDom.div(), _UIcon.getIcon(DcIcons.DcIconGitlabLogo, { title: "Gitlab" }));
		const linkedinIcon = _UDom.AC(_UDom.div(), _UIcon.getIcon(DcIcons.DcIconLinkedinLogo, { title: "Linkedin" }));
		const mailIcon = _UDom.AC(_UDom.div(), _UIcon.getIcon(DcIcons.DcIconMail, { title: "Mail" }));

		this.onClickSocialNetworkLink(instagramIcon, SOCIAL_NETWORKS_LINKS.INSTAGRAM);
		this.onClickSocialNetworkLink(snapchatIcon, SOCIAL_NETWORKS_LINKS.SNAPCHAT);
		this.onClickSocialNetworkLink(twitterIcon, SOCIAL_NETWORKS_LINKS.TWITTER);
		this.onClickSocialNetworkLink(githubIcon, SOCIAL_NETWORKS_LINKS.GITHUB);
		this.onClickSocialNetworkLink(gitlabIcon, SOCIAL_NETWORKS_LINKS.GITLAB);
		this.onClickSocialNetworkLink(linkedinIcon, SOCIAL_NETWORKS_LINKS.LINKEDIN);
		this.onClickSocialNetworkLink(mailIcon, "mailto: " + SOCIAL_NETWORKS_LINKS.EMAIL, false);

		const icons = [instagramIcon, snapchatIcon, twitterIcon, githubIcon, gitlabIcon, linkedinIcon, mailIcon];
		icons.forEach((icon) => icon.classList.add(CONTACT_CSS.SOCIAL_NETWORK));
		dcCursor.subscribeElementsToDetectHover(icons);

		_UDom.AC(socialNetworks, instagramIcon, snapchatIcon, twitterIcon, githubIcon, gitlabIcon, linkedinIcon, mailIcon);
		_UDom.AC(socialNetworksContainer/*, socialNetworksTitle*/, socialNetworks);

		/*
		const mailFormContainer = _UDom.div({ className: CONTACT_CSS.FORM_CONTAINER });
		const mailTitle = _UDom.h2({
			innerText: dcTranslator.T(dcTranslation.EMAIL),
			className: CONTACT_CSS.FORM_TITLE
		});
		mailFormContainer.appendChild(mailTitle);
		
		const mailFormInputs: dcFormInputType[] = [
			{
				inputType: INPUT_TYPE.TEXT,
				placeholder: dcTranslator.T(dcTranslation.FIRSTNAME_LASTNAME)
			},
			{
				inputType: INPUT_TYPE.EMAIL,
				placeholder: dcTranslator.T(dcTranslation.EMAIL)
			},
			{
				inputType: INPUT_TYPE.TEXT,
				placeholder: dcTranslator.T(dcTranslation.SUBJECT)
			},
			{
				inputType: INPUT_TYPE.TEXTAREA,
				placeholder: dcTranslator.T(dcTranslation.MESSAGE)
			}
		];
		
		new dcForm(mailFormContainer, mailFormInputs, { icon: DcIcons.DcIconSendRegular, rounded: true }, true);
		 */

		_UDom.AC(this.getMainElement(), socialNetworksContainer/*, mailFormContainer*/);
	}
	
	private onClickSocialNetworkLink(element: HTMLElement, link: string, targetBlank: boolean = true): void {
		element.addEventListener("click", () => (targetBlank) ? window.open(link, "_blank") : window.open(link));
	}
	
}