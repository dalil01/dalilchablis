import { dcProjectsType } from "./dcProjects";

const placeholderPath: Promise<string> = import((`../../../../../assets/images/projects/placeholder.webp`));

export const projects: dcProjectsType[] = [
	{
		$title: "PERSONALS",
		items: [
			{
				imgPath: import((`../../../../../assets/images/projects/personals/dalilchablis-v2.webp`)),
				url: "https://github.com/dalil01/dalilchablis/",
				name: "dalilchablis (2023)",
				$description: "PORTFOLIO_V2",
				techStack: "HTML, CSS, Typescript, Three.js, Blender, Vite.js, GitHub Actions"
			},
			{
				imgPath: placeholderPath,
				url: "https://github.com/dalil01/translatordc/",
				name: "translatordc (2023)",
				$description: "TRANSLATORDC",
				techStack: "Typescript, Jest"
			},
			{
				imgPath: placeholderPath,
				name: "MEiDLY (2023)",
				$description: "IN_DEV",
				techStack: "HTML, CSS, Typescript, Node.js, Socket.io"
			},
			{
				imgPath: placeholderPath,
				name: "DevProjects (2021)",
				$description: "IN_DEV",
				techStack: "Typescript, Node.js, Socket.io"
			},
			{
				imgPath: placeholderPath,
				name: "dalilchablis (2020)",
				$description: "PORTFOLIO_V1",
				techStack: "HTML, CSS, PHP"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/personals/brain.webp`)),
				name: "BrAiN (2020)",
				$description: "BRAIN",
				techStack: "HTML, CSS"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/personals/plancadeau.webp`)),
				name: "Plancadeau (2019)",
				$description: "IN_DEV",
				techStack: "HTML, CSS, Typescript, Python"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/personals/mysport.webp`)),
				name: "MySport (2018)",
				$description: "MYSPORT",
				techStack: "HTML, CSS, Javascript, PHP"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/personals/athletec.webp`)),
				name: "Athletec (2017)",
				$description: "ATHLETEC",
				techStack: "HTML, CSS, Javascript, PHP"
			}
		]
	},
	{
		$title: "PROFESSIONALS",
		items: [
			{
				imgPath: placeholderPath,
				name: "dcTests (2023)",
				$description: "DCTESTS",
				techStack: "Java, Maven, Playwright, Apache velocity"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/professionals/canvas-grid.webp`)),
				name: "Canvas grid (2022)",
				$description: "CANVAS_GRID",
				techStack: "Typescript, HTML Canvas"
			},
			{
				imgPath: placeholderPath,
				url: "https://gitlab.com/dalil01/automatisation-test-e2e/",
				name: "Automatisation test e2e (2021)",
				$description: "E2E_TEST_AUTOMATION",
				techStack: "Typescript, Jira, Xray, Cypress, Cucumber, Percy, Applitools, Gitlab CI"
			}
		]
	},
	{
		$title: "ACADEMICS",
		items: [
			{
				imgPath: placeholderPath,
				name: "e-commerce (2023)",
				$description: "ECOMMERCE",
				techStack: "Symfony 6, Docker, Ansible"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/redditech.webp`)),
				name: "Redditech (2023)",
				$description: "REDDITECH",
				techStack: "Typescript, React native, Expo, OAuth2, Jest, Docker"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/tempchat.webp`)),
				name: "TempChat - IRC (2022)",
				$description: "TEMP_CHAT",
				techStack: "Typescript, React, React Redux, Node.js, Express, Socket.io, Vite.js, MongoDB Vitest"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/you_shall_not_pass.webp`)),
				name: "You shall not pass (2022)",
				$description: "YOU_SHALL_NOT_PASS",
				techStack: "OpenBSD 7.2, FreeBSD 12/13, DHCP, Paquet filter"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/epivibes.webp`)),
				name: "EPIVIBES (2022)",
				$description: "EPIVIBES",
				techStack: "Vue.js, Spring boot, Gradle, OAuth2"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/jobboard.webp`)),
				name: "JobBoard (2022)",
				$description: "JOB_BOARD",
				techStack: "Symfony 6, Angular"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/data-analyzer.webp`)),
				url: "https://github.com/noreddinelam/DataAnalyzer/",
				name: "DataAnalyzer (2022)",
				$description: "DATA_ANALYZER",
				techStack: "Python, Kivy, Fast Api, Tensorflow, Keras, Matplotlib, Numpy, Seaborn, Sklearn, Selenium"
			},
			{
				imgPath: placeholderPath,
				url: "https://gitlab.com/dalil01/killeddb/",
				name: "KilledDB (2022)",
				$description: "KILLEDDB",
				techStack: "Java, Jax-RS, FastUtil, JUnit"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/blindtest.webp`)),
				url: "https://gitlab.com/dalil01/blindtest/",
				name: "BlindTest (2022)",
				$description: "BLINDTEST",
				techStack: "Angular, Java, Websocket"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/slacklike.webp`)),
				url: "https://gitlab.com/dalil01/SlackLike/",
				name: "SlackLike (2022)",
				$description: "SLACKLIKE",
				techStack: "Angular, Java, Websocket, Glassfish"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/ibuysu.webp`)),
				url: "https://gitlab.com/dalil01/ibuysu/",
				name: "iBuySU (2022)",
				$description: "IBUYSU",
				techStack: "Angular, Spring boot, Modelio, UML"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/citycar.webp`)),
				url: "https://gitlab.com/dalil01/citycar/",
				name: "CityCar (2021)",
				$description: "CITYCAR",
				techStack: "Angular, Node.js, Express, MongoDB"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/multiplication.webp`)),
				url: "https://gitlab.com/dalil01/multiplication/",
				name: "Multiplication (2020)",
				$description: "MULTIPLICATION",
				techStack: "Angular"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/sparkline.webp`)),
				url: "https://gitlab.com/dalil01/sparkline/",
				name: "SparkLine (2020)",
				$description: "SPARKLINE",
				techStack: "Symfony 5"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/guesswhat.webp`)),
				url: "https://gitlab.com/dalil01/guesswhat/",
				name: "GuessWhat (2020)",
				$description: "GUESSWHAT",
				techStack: "Symfony 5, PhpUnit"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/virtual-landscape.webp`)),
				url: "https://gitlab.com/dalil01/Virtual-landscape/",
				name: "Virtual Landscape (2020)",
				$description: "VIRTUAL_LANDSCAPE",
				techStack: "HTML, CSS, JavaScript"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/geoworld.webp`)),
				url: "https://gitlab.com/dalil01/GeoWorld/",
				name: "GeoWorld (2020)",
				$description: "GEOWORLD",
				techStack: "HTML, CSS, BOOSTRAP, JavaScript, JQUERY, PHP"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/aeroclub-frotey-les-lure.webp`)),
				url: "https://gitlab.com/dalil01/aeroclub-frotey-les-lure/",
				name: "Aeroclub Frotey-les-Lure (2019)",
				$description: "AEROCLUB_FROTEY_LES_LURE",
				techStack: "HTML, CSS, BOOSTRAP, JavaScript, PHP"
			},
			{
				imgPath: import((`../../../../../assets/images/projects/academics/boucherie-meme.webp`)),
				url: "https://gitlab.com/dalil01/boucherie-meme/",
				name: "Boucherie MEME (2019)",
				$description: "BOUCHERIE_MEME",
				techStack: "HTML, CSS, PHP"
			}
		]
	}
]