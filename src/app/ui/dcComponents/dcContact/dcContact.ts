import "./dcContact.css";

import {dcComponent} from "../dcComponent";
import {_UDom} from "../../dcUtils/_UDom";
import {_UIcon} from "../../dcUtils/_UIcon";
import {DcIcons} from "../../dcIcons/dcIcons";
import {dcCursor} from "../dcCursor/dcCursor";
import {dcTranslator} from "../../dcTranslator/dcTranslator";
import {dcTranslation} from "../../dcTranslator/dcTranslation";
import {SOCIAL_NETWORKS_LINKS} from "../../../global/dcGlobalEnums";
import {dcForm, dcFormInputType, INPUT_TYPE} from "../dcForm/dcForm";

enum CONTACT_CSS_CLASSNAMES {
    CONTAINER = "contact-container",
    SOCIAL_NETWORKS_CONTAINER = "contact-social-networks-container",
    SOCIAL_NETWORKS_TITLE = "contact-social-networks-title",
    SOCIAL_NETWORKS = "contact-social-networks",
    FORM_CONTAINER = "contact-form-container",
    FORM_TITLE = "contact-form-title",
}

export class dcContact extends dcComponent {

    constructor(parentElement: HTMLElement, autoInit: boolean = false) {
        super(parentElement, _UDom.CCE("contact", {className: CONTACT_CSS_CLASSNAMES.CONTAINER}));

        if (autoInit)
            this.init();
    }

    public buildUI(): void {
        const socialNetworksContainer = _UDom.CE("div", { className: CONTACT_CSS_CLASSNAMES.SOCIAL_NETWORKS_CONTAINER });
        const socialNetworksTitle = _UDom.CE("h2", { innerText: dcTranslator.T(dcTranslation.SOCIAL_NETWORKS), className: CONTACT_CSS_CLASSNAMES.SOCIAL_NETWORKS_TITLE });
        const socialNetworks = _UDom.CE("div", { className: CONTACT_CSS_CLASSNAMES.SOCIAL_NETWORKS });

        const facebookIcon = _UIcon.getIcon(DcIcons.DcIconFacebookLogo);
        const instagramIcon = _UIcon.getIcon(DcIcons.DcIconInstagramLogo);
        const snapchatIcon = _UIcon.getIcon(DcIcons.DcIconSnapchatLogo);
        const twitterIcon = _UIcon.getIcon(DcIcons.DcIconTwitterLogo);
        const githubIcon = _UIcon.getIcon(DcIcons.DcIconGithubLogo);
        const gitlabIcon = _UIcon.getIcon(DcIcons.DcIconGitlabLogo);
        const linkedinIcon = _UIcon.getIcon(DcIcons.DcIconLinkedinLogo);

        this.subscribeSocialNetworkLinkElement(facebookIcon, SOCIAL_NETWORKS_LINKS.FACEBOOK);
        this.subscribeSocialNetworkLinkElement(instagramIcon, SOCIAL_NETWORKS_LINKS.INSTAGRAM);
        this.subscribeSocialNetworkLinkElement(snapchatIcon, SOCIAL_NETWORKS_LINKS.SNAPCHAT);
        this.subscribeSocialNetworkLinkElement(twitterIcon, SOCIAL_NETWORKS_LINKS.TWITTER);
        this.subscribeSocialNetworkLinkElement(githubIcon, SOCIAL_NETWORKS_LINKS.GITHUB);
        this.subscribeSocialNetworkLinkElement(gitlabIcon, SOCIAL_NETWORKS_LINKS.GITLAB);
        this.subscribeSocialNetworkLinkElement(linkedinIcon, SOCIAL_NETWORKS_LINKS.LINKEDIN);

        dcCursor.subscribeElementsToDetectHover([facebookIcon, instagramIcon, snapchatIcon, twitterIcon, githubIcon, gitlabIcon, linkedinIcon]);

        _UDom.AC(socialNetworks, facebookIcon, instagramIcon, snapchatIcon, twitterIcon, githubIcon, gitlabIcon, linkedinIcon);
        _UDom.AC(socialNetworksContainer, socialNetworksTitle, socialNetworks);

        const mailFormContainer = _UDom.CE("div", { className: CONTACT_CSS_CLASSNAMES.FORM_CONTAINER });
        const mailTitle = _UDom.CE("h2", { innerText: dcTranslator.T(dcTranslation.EMAIL), className: CONTACT_CSS_CLASSNAMES.FORM_TITLE });
        mailFormContainer.appendChild(mailTitle);

        const mailFormInputs: dcFormInputType[] = [
            { icon: DcIcons.DcIconUser, inputType: INPUT_TYPE.TEXT, placeholder: dcTranslator.T(dcTranslation.FIRSTNAME_LASTNAME) },
            { icon: DcIcons.DcIconAt, inputType: INPUT_TYPE.EMAIL, placeholder: dcTranslator.T(dcTranslation.EMAIL) },
            { icon: DcIcons.DcIconHelp, inputType: INPUT_TYPE.TEXT, placeholder: dcTranslator.T(dcTranslation.SUBJECT) },
            { inputType: INPUT_TYPE.TEXTAREA, placeholder: dcTranslator.T(dcTranslation.MESSAGE) }
        ];

        new dcForm(mailFormContainer, mailFormInputs, dcTranslator.T(dcTranslation.SEND), true);

        _UDom.AC(this.getMainElement(), socialNetworksContainer, mailFormContainer);
    }

    private subscribeSocialNetworkLinkElement(element: HTMLElement, link: string) {
        element.addEventListener("click", () => window.open(link, "_blank"));
    }

}