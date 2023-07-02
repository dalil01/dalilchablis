import { dcSkillsType } from "./dcSkills";

export class dcSkillsData {

	public static getData(): dcSkillsType[] {
		return [
			{
				$title: "SYSTEMS",
				$subTitle: "OS",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/systems/os/unix.webp`)),
						url: "https://wikipedia.org/wiki/Unix",
						name: "Unix"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/systems/os/linux.webp`)),
						url: "https://www.linux.org/",
						name: "GNU/Linux"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/systems/os/windows.webp`)),
						url: "https://www.microsoft.com/windows",
						name: "Windows"
					}
				]
			},
			{
				$subTitle: "DISTRIBUTIONS_VERSIONS",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/systems/distributions/debian.webp`)),
						url: "https://www.debian.org/",
						name: "Debian"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/systems/distributions/ubuntu.webp`)),
						url: "https://ubuntu.com/",
						name: "Ubuntu"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/systems/distributions/kubuntu.webp`)),
						url: "https://kubuntu.org/",
						name: "Kubuntu"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/systems/distributions/pop-os.webp`)),
						url: "https://pop.system76.com/",
						name: "Pop! OS"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/systems/distributions/kali.webp`)),
						url: "https://www.kali.org/",
						name: "Kali Linux"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/systems/distributions/opensuse.webp`)),
						url: "https://www.opensuse.org/",
						name: "OpenSUSE"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/systems/distributions/deepin.webp`)),
						url: "https://www.deepin.org/",
						name: "Deepin"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/systems/distributions/openbsd.webp`)),
						url: "https://www.openbsd.org/",
						name: "OpenBSD"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/systems/distributions/freebsd.webp`)),
						url: "https://www.freebsd.org/",
						name: "FreeBSD"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/systems/distributions/windows10.webp`)),
						url: "https://www.microsoft.com/fr-fr/software-download/windows10",
						name: "Windows 10"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/systems/distributions/windows11.webp`)),
						url: "https://www.microsoft.com/fr-fr/software-download/windows11",
						name: "Windows 11"
					}
				]
			},
			{
				$title: "TOOLS_SOFTWARE",
				$subTitle: "MODELING_PROTOTYPING",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/prototyping_modeling/blender.webp`)),
						url: "https://www.blender.org/",
						name: "Blender"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/prototyping_modeling/figma.webp`)),
						url: "https://www.figma.com/",
						name: "Figma"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/prototyping_modeling/dia.webp`)),
						url: "http://dia-installer.de/",
						name: "Dia"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/prototyping_modeling/modelio.webp`)),
						url: "https://www.modelio.org/index.htm",
						name: "Modelio"
					}
				]
			},
			{
				$subTitle: "TEXT_EDITOR_IDE",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/text_editor_ide/intellij.webp`)),
						url: "https://www.jetbrains.com/idea/",
						name: "Intellij"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/text_editor_ide/vscode.webp`)),
						url: "https://code.visualstudio.com/",
						name: "VS Code"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/text_editor_ide/phpstorm.webp`)),
						url: "https://www.jetbrains.com/phpstorm/",
						name: "PhpStorm"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/text_editor_ide/webstorm.webp`)),
						url: "https://www.jetbrains.com/webstorm/",
						name: "WebStorm"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/text_editor_ide/pycharm.webp`)),
						url: "https://www.jetbrains.com/pycharm/",
						name: "PyCharm"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/text_editor_ide/android-studio.webp`)),
						url: "https://developer.android.com/studio/",
						name: "Android Studio"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/text_editor_ide/notepad.webp`)),
						url: "https://notepad-plus-plus.org/",
						name: "Notepad++"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/text_editor_ide/sublimetext.webp`)),
						url: "https://www.sublimetext.com/",
						name: "Sublime Text"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/text_editor_ide/komodoedit.webp`)),
						url: "https://www.activestate.com/products/komodo-edit/",
						name: "Komodo Edit"
					}
				]
			},
			{
				$subTitle: "VERSIONNING",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/versionning/git.webp`)),
						url: "https://git-scm.com/",
						name: "Git"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/versionning/github.webp`)),
						url: "https://github.com/",
						name: "GitHub"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/versionning/gitlab.webp`)),
						url: "https://gitlab.com/",
						name: "GitLab"
					}
				]
			},
			{
				$subTitle: "BUNDLER",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/bundler/webpack.webp`)),
						url: "https://webpack.js.org/",
						name: "Webpack"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/bundler/vitejs.webp`)),
						url: "https://vitejs.dev/",
						name: "Vite.js"
					}
				]
			},
			{
				$subTitle: "DEPENDENCY_MANAGER",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/dependency_manager/maven.webp`)),
						url: "https://wikipedia.org/wiki/Apache_Maven",
						name: "Maven"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/dependency_manager/gradle.webp`)),
						url: "https://gradle.org/",
						name: "Gradle"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/dependency_manager/npm.webp`)),
						url: "https://www.npmjs.com/",
						name: "npm"
					}
				]
			},
			{
				$subTitle: "SGBD",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/sgbd/mysql.webp`)),
						url: "https://www.mysql.com/",
						name: "MySQL"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/sgbd/mariadb.webp`)),
						url: "https://mariadb.org/",
						name: "MariaDB"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/sgbd/mongodb.webp`)),
						url: "https://www.mongodb.com/",
						name: "MongoDB"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/sgbd/redis.webp`)),
						url: "https://redis.io/",
						name: "Redis"
					}
				]
			},
			{
				$subTitle: "TESTING",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/testing/postman.webp`)),
						url: "https://www.postman.com/",
						name: "Postman"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/testing/insomnia.webp`)),
						url: "https://insomnia.rest/",
						name: "Insomnia"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/testing/xray.webp`)),
						url: "https://www.getxray.app/",
						name: "Xray"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/testing/percy.webp`)),
						url: "https://percy.io/",
						name: "Percy"
					}
				]
			},
			{
				$subTitle: "VIRTUALIZATION",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/virtualization/virtualbox.webp`)),
						url: "https://www.virtualbox.org/",
						name: "VirtualBox"
					}
				]
			},
			{
				$subTitle: "DEVOPS",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/devops/docker.webp`)),
						url: "https://www.docker.com/",
						name: "Docker"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/devops/filezilla.webp`)),
						url: "https://filezilla-project.org/",
						name: "FileZilla"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/devops/gitlab-ci-cd.webp`)),
						url: "https://docs.gitlab.com/ee/ci/",
						name: "GitLab CI/CD"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/devops/github-actions.webp`)),
						url: "https://docs.github.com/en/actions",
						name: "GitHub Actions"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/devops/ansible.webp`)),
						url: "https://www.ansible.com/",
						name: "Ansible"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/devops/jenkins.webp`)),
						url: "https://www.jenkins.io/",
						name: "Jenkins"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/devops/kubernetes.webp`)),
						url: "https://kubernetes.io/",
						name: "Kubernetes"
					}
				]
			},
			{
				$subTitle: "SECURITY",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/security/nmap.webp`)),
						url: "https://nmap.org/",
						name: "Nmap"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/security/wireshark.webp`)),
						url: "https://www.wireshark.org/",
						name: "Wireshark"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/security/gobuster.webp`)),
						url: "https://www.kali.org/tools/gobuster/",
						name: "Gobuster"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/security/metasploit.webp`)),
						url: "https://www.metasploit.com/",
						name: "Metasploit"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/security/hydra.webp`)),
						url: "https://en.kali.tools/?p=220/",
						name: "Hydra"
					}
				]
			},
			{
				$subTitle: "WEB_SERVER",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/server_web/apache.webp`)),
						url: "https://httpd.apache.org/",
						name: "Apache"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/server_web/nginx.webp`)),
						url: "https://www.nginx.com/",
						name: "NGINX"
					}
				]
			},
			{
				$subTitle: "MANAGEMENT",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/management/jira.webp`)),
						url: "https://www.atlassian.com/software/jira/",
						name: "Jira"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/tools_software/management/trello.webp`)),
						url: "https://trello.com/",
						name: "Trello"
					}
				]
			},
			{
				$title: "LANGAGES",
				$subTitle: "MODELING",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/langages/modeling/uml.webp`)),
						url: "https://wikipedia.org/wiki/UML_(informatique)/",
						name: "UML"
					}
				]
			},
			{
				$subTitle: "FRONT",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/langages/front/html.webp`)),
						url: "https://developer.mozilla.org/fr/docs/Web/HTML/",
						name: "HTML"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/langages/front/css.webp`)),
						url: "https://developer.mozilla.org/fr/docs/Web/css/",
						name: "CSS"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/langages/front/javascript.webp`)),
						url: "https://developer.mozilla.org/fr/docs/Web/JavaScript/",
						name: "JavaScript"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/langages/front/typescript.webp`)),
						url: "https://www.typescriptlang.org/",
						name: "TypeScript"
					}
				]
			},
			{
				$subTitle: "BACK",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/langages/back/php.webp`)),
						url: "https://www.php.net/",
						name: "PHP"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/langages/back/java.webp`)),
						url: "https://www.java.com/",
						name: "Java"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/langages/back/nodejs.webp`)),
						url: "https://nodejs.org/",
						name: "Js/Ts - Node.js"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/langages/back/python.webp`)),
						url: "https://www.python.org/",
						name: "Python"
					}
				]
			},
			{
				$subTitle: "SYSTEM",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/langages/system/c.webp`)),
						url: "https://fr.wikipedia.org/wiki/C_(langage)",
						name: "C"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/langages/system/bash.webp`)),
						url: "https://wikipedia.org/wiki/Bash_(Unix_shell)/",
						name: "Bash"
					}
				]
			},
			{
				$subTitle: "DATABASE",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/langages/database/sql.webp`)),
						url: "https://sql.sh/",
						name: "SQL"
					}
				]
			},
			{
				$title: "FRAMEWORKS_LIBRARIES",
				$subTitle: "FRONT",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/front/angular.webp`)),
						url: "https://angular.io/",
						name: "Angular"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/front/vuejs.webp`)),
						url: "https://vuejs.org/",
						name: "Vue.js"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/front/react.webp`)),
						url: "https://legacy.reactjs.org/",
						name: "React"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/front/react.webp`)),
						url: "https://reactnative.dev/",
						name: "React Native"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/front/jquery.webp`)),
						url: "https://jquery.io/",
						name: "JQuery"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/front/kivy.webp`)),
						url: "https://kivy.org/",
						name: "Kivy"
					}
				]
			},
			{
				$subTitle: "CSS",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/css/bootstrap.webp`)),
						url: "https://getbootstrap.com/",
						name: "Bootstrap"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/css/bulma.webp`)),
						url: "https://bulma.io/",
						name: "Bulma"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/css/tailwind.webp`)),
						url: "https://tailwindcss.com/",
						name: "Tailwindcss"
					}
				]
			},
			{
				$subTitle: "BACK",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/back/symfony.webp`)),
						url: "https://symfony.com/",
						name: "Symfony"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/back/spring-boot.webp`)),
						url: "https://spring.io/projects/spring-boot/",
						name: "Spring Boot"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/back/jax-rs.webp`)),
						url: "https://fr.wikipedia.org/wiki/Java_API_for_RESTful_Web_Services",
						name: "JAX-RS"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/back/expressjs.webp`)),
						url: "https://expressjs.com/",
						name: "Express.js"
					}
				]
			},
			{
				$title: "TESTING",
				items: [
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/testing/phpunit.webp`)),
						url: "https://phpunit.de/",
						name: "PhpUnit"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/testing/junit.webp`)),
						url: "https://junit.org/",
						name: "JUnit"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/testing/jest.webp`)),
						url: "https://jestjs.io/",
						name: "Jest"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/testing/vitest.webp`)),
						url: "https://vitest.dev/",
						name: "Vitest"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/testing/jasmine.webp`)),
						url: "https://jasmine.github.io/",
						name: "Jasmine"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/testing/cypress.webp`)),
						url: "https://www.cypress.io/",
						name: "Cypress"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/testing/selenium.webp`)),
						url: "https://www.selenium.dev/",
						name: "Selenium"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/testing/playwright.webp`)),
						url: "https://playwright.dev/",
						name: "Playwright"
					},
					{
						imgPath: import((`../../../../../assets/images/skills/frameworks_libraries/testing/cucumber.webp`)),
						url: "https://cucumber.io/",
						name: "Cucumber"
					}
				]
			}
		];
	}

}