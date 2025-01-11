import "./Contact.css";

import { Component } from "../Component";
import { UDom } from "../../../utils/UDom";
import { UIcon } from "../../../utils/UIcon";
import { Translation } from "../../../translations/Translation";
import { Translator } from "../../../translations/Translator";
import { Icons } from "../../../icons/Icons";
import { Cursor } from "../Cursor/Cursor";

enum CONTACT_CSS {
	CONTAINER = "contact-container",
	SOCIAL_NETWORKS_CONTAINER = "contact-social-networks-container",
	SOCIAL_NETWORKS_TITLE = "contact-social-networks-title",
	SOCIAL_NETWORKS = "contact-social-networks",
	SOCIAL_NETWORK = "contact-social-network",
	FORM_CONTAINER = "contact-form-container",
	FORM_TITLE = "contact-form-title",
}


enum SOCIAL_NETWORKS_LINKS {
	FACEBOOK = "https://www.facebook.com/dalil.chablis",
	INSTAGRAM = "https://www.instagram.com/black_thrower/",
	X = "https://x.com/dalil_chbls",
	GITHUB = "https://github.com/dalil01",
	GITLAB = "https://gitlab.com/dalil01",
	LINKEDIN = "https://www.linkedin.com/in/dalil-chablis/",
	EMAIL = "dalil.chablis@gmail.com"
}

export class Contact extends Component {
	
	constructor(parentElement: HTMLElement, autoInit: boolean = false) {
		super(parentElement, UDom.CCE("contact", { className: CONTACT_CSS.CONTAINER }));
		
		if (autoInit)
			this.init();
	}
	
	public buildUI(): void {
		const socialNetworksContainer = UDom.div({ className: CONTACT_CSS.SOCIAL_NETWORKS_CONTAINER });
		const socialNetworksTitle = UDom.h2({
			innerText: Translator.T(Translation.SOCIAL_NETWORKS),
			className: CONTACT_CSS.SOCIAL_NETWORKS_TITLE
		});
		const socialNetworks = UDom.div({ className: CONTACT_CSS.SOCIAL_NETWORKS });
		
		const instagramIcon = UDom.AC(UDom.div(), UIcon.getIcon(Icons.IconInstagramLogo, { title: "Instagram" }));
		const twitterIcon = UDom.AC(UDom.div(), UIcon.getIcon(Icons.IconX, { title: "X" }));
		const githubIcon = UDom.AC(UDom.div(), UIcon.getIcon(Icons.IconGithubLogo, { title: "Github" }));
		const gitlabIcon = UDom.AC(UDom.div(), UIcon.getIcon(Icons.IconGitlabLogo, { title: "Gitlab" }));
		const linkedinIcon = UDom.AC(UDom.div(), UIcon.getIcon(Icons.IconLinkedinLogo, { title: "Linkedin" }));
		const mailIcon = UDom.AC(UDom.div(), UIcon.getIcon(Icons.IconMail, { title: "Mail" }));

		this.onClickSocialNetworkLink(instagramIcon, SOCIAL_NETWORKS_LINKS.INSTAGRAM);
		this.onClickSocialNetworkLink(twitterIcon, SOCIAL_NETWORKS_LINKS.X);
		this.onClickSocialNetworkLink(githubIcon, SOCIAL_NETWORKS_LINKS.GITHUB);
		this.onClickSocialNetworkLink(gitlabIcon, SOCIAL_NETWORKS_LINKS.GITLAB);
		this.onClickSocialNetworkLink(linkedinIcon, SOCIAL_NETWORKS_LINKS.LINKEDIN);
		this.onClickSocialNetworkLink(mailIcon, "mailto: " + SOCIAL_NETWORKS_LINKS.EMAIL, false);

		const icons = [twitterIcon, githubIcon, gitlabIcon, mailIcon, linkedinIcon, instagramIcon];
		icons.forEach((icon) => icon.classList.add(CONTACT_CSS.SOCIAL_NETWORK));
		Cursor.subscribeElementsToDetectHover(icons);

		UDom.AC(socialNetworks, githubIcon, gitlabIcon, mailIcon, linkedinIcon, twitterIcon, instagramIcon);
		UDom.AC(socialNetworksContainer/*, socialNetworksTitle*/, socialNetworks);

		/*
		const mailFormContainer = UDom.div({ className: CONTACT_CSS.FORM_CONTAINER });
		const mailTitle = UDom.h2({
			innerText: translator.T(translation.EMAIL),
			className: CONTACT_CSS.FORM_TITLE
		});
		mailFormContainer.appendChild(mailTitle);
		
		const mailFormInputs: dcFormInputType[] = [
			{
				inputType: INPUT_TYPE.TEXT,
				placeholder: translator.T(translation.FIRSTNAME_LASTNAME)
			},
			{
				inputType: INPUT_TYPE.EMAIL,
				placeholder: translator.T(translation.EMAIL)
			},
			{
				inputType: INPUT_TYPE.TEXT,
				placeholder: translator.T(translation.SUBJECT)
			},
			{
				inputType: INPUT_TYPE.TEXTAREA,
				placeholder: translator.T(translation.MESSAGE)
			}
		];
		
		new form(mailFormContainer, mailFormInputs, { icon: Icons.IconSendRegular, rounded: true }, true);
		 */

		UDom.AC(this.getMainElement(), socialNetworksContainer/*, mailFormContainer*/);
	}
	
	private onClickSocialNetworkLink(element: HTMLElement, link: string, targetBlank: boolean = true): void {
		element.addEventListener("click", () => (targetBlank) ? window.open(link, "_blank") : window.open(link));
	}
	
}