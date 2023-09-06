// *SHOW MENU*

	const navMenu = document.getElementById("nav-menu");
	/* Where we add and remove the class so that we can see or hide "Menu" */

	const navToggle =
		document.getElementById("nav-toggle"); /* button to show menu */
	const navClose = document.getElementById("nav-close"); /* button to hide menu */

	/* To show menu on clicking the button 'nav-toggle' */
	/* validate id constant exists */
	if (navToggle) {
		navToggle.addEventListener("click", () => {
			navMenu.classList.add("show-menu");
		});
	}

	/* To hide menu on clicking the button 'navclose' */
	/* validate id constant exists */
	if (navClose) {
		navClose.addEventListener("click", () => {
			navMenu.classList.remove("show-menu");
		});
	}

// *REMOVE MENU MOBILE*

	const navLink = document.querySelectorAll(".nav-link");
	// this will take all the elements which have "nav-link" class in them.
	// this iterable object navLink can be used to check each and every element is clicked or not

	const linkAction = () => {
		const navMenu = document.getElementById("nav-menu");
		/* When we click on each nav-link, we remove the show-menu*/
		navMenu.classList.remove("show-menu");
	};
	// function used to hide the MENU

	navLink.forEach((n) => n.addEventListener("click", linkAction));
	/* To hide menu on clicking the button which is one of the navLink Elements */
	/* navLink = foreach = this will traverse every element with a addEventListener of clicking and calling to the hide menu function "linkAction"*/

// *SHADOW HEADER*

	const shadowHeader = () => {
		const header = document.getElementById("header");
		// when the scroll is greater than 50 viewport height, then add the shadow-header to header tag

		// if(this.scrollY>=50){
		//     header.classList.add("shadow-header");
		// }
		// else{
		//     header.classList.remove("shadow-header");
		// }
		// OR //
		this.scrollY >= 50
			? header.classList.add("shadow-header")
			: header.classList.remove("shadow-header");
	};

	window.addEventListener("scroll", shadowHeader);

// *EMAIL JS*

	const contactForm = document.getElementById("contact-form");
	const contactMessage = document.getElementById("contact-message");

	const sendEmail = (e) => {
		e.preventDefault();

		// serviceID - templateID - #fore = - publickey
		emailjs
			.sendForm(
				"service_nhr9r01",
				"template_bwoerfe",
				"#contact-form",
				"zQTf9f62Mv0yQ94FV"
			)
			.then(
				() => {
					// Show sent Message
					contactMessage.textContent = "Message sent Successfully ✅";

					// Remove message after five seconds
					setTimeout(() => {
						contactMessage.textContent = "";
					}, 5000);

					// Clear input Fields
					contactForm.reset();
				},
				() => {
					// Show Error message
					contactMessage.textContent =
						"Message not sent(service error) ❌";
				}
			);
	};

	contactForm.addEventListener("submit", sendEmail);

// *SHOW SCROLL UP*

	const scrollUp = () => {
		const scrollUp = document.getElementById("scroll-up");
		this.scrollY >= 350
			? scrollUp.classList.add("show-scroll")
			: scrollUp.classList.remove("show-scroll");
	};

	window.addEventListener("scroll", scrollUp);

// *SCROLL SECTIONS ACTIVE LINK*

	const sections = document.querySelectorAll("section[id]");

	const scrollActive = () => {
		const scrollDown = window.scrollY;

		sections.forEach((current) => {
			const sectionHeight = current.offsetHeight,
				sectionTop = current.offsetTop - 58,
				sectionId = current.getAttribute("id"),
				sectionsClass = document.querySelector(
					".nav-menu a[href*=" + sectionId + "]"
				);

			if (
				scrollDown > sectionTop &&
				scrollDown <= sectionTop + sectionHeight
			) {
				sectionsClass.classList.add("active-link");
			} else {
				sectionsClass.classList.remove("active-link");
			}
		});
	};

	window.addEventListener("scroll", scrollActive);

// *DARK LIGHT THEME*

	const themeButton = document.getElementById("theme-button");
	const darkTheme = "dark-theme";
	const iconTheme = "ri-sun-fill";

	// Previously selected topic ( if user selected)
	const selectedTheme = localStorage.getItem("selected-theme");
	const selectedIcon = localStorage.getItem("selected-icon");

	// We Obtain the current theme that the interface has by validating the dark-theme class
	// basically we check wheather the current theme is dark or light
	// and icon is moon or sun?
	const getCurrentTheme = () =>
		document.body.classList.contains(darkTheme) ? "dark" : "light";
	const getCurrentIcon = () =>
		themeButton.classList.contains(iconTheme)
			? "ri-sun-fill  "
			: "ri-moon-fill";

	// we Validate if the user previously chose a topic
	// it is like a cookie for theme selected previously
	if (selectedTheme) {
		// if the validate is fulfilled, we ask what the issue was to know if we actiivated or deactivated the dark mode

		document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
			darkTheme
		);
		themeButton.classList[selectedIcon === "ri-sun-fill" ? "add" : "remove"](
			iconTheme
		);
	}

	// Activate/Deactivate the Theme manually with the Button
	themeButton.addEventListener("click", () => {
		// Add or remove the Dark/icon Theme
		document.body.classList.toggle(darkTheme);
		themeButton.classList.toggle(iconTheme);

		// We save the theme and the current icon that the user choose
		localStorage.setItem("selected-theme", getCurrentTheme());
		localStorage.setItem("selectedIcon", getCurrentIcon());
	});

// *SCROLL REVEAL ANIMATION*

	const sr = ScrollReveal({
		origin: "top",
		distance: "60px",
		duration: 2500,
		delay: 400,
		reset: true, // for animations to repeat.
	});

	sr.reveal(".home-perfil, .about-image, .contact-mail ", { origin: "right" });

	sr.reveal(
		".home-name, .home-info, .about-container .section-title-1, .about-info, .contact-social, .contact-data ",
		{
			origin: "left",
		}
	);

	sr.reveal(".services-card , .projects-card", { interval: 100 });
