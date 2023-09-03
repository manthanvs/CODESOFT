/* SHOW MENU */
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

/* REMOVE MENU MOBILE */

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


/* SHADOW HEADER */
    const shadowHeader=()=>{
        const header = document.getElementById('header')
        // when the scroll is greater than 50 viewport height, then add the shadow-header to header tag
        
        // if(this.scrollY>=50){
        //     header.classList.add("shadow-header");
        // }
        // else{
        //     header.classList.remove("shadow-header");
        // }
                        // OR // 
        this.scrollY >= 50 ? header.classList.add('shadow-header'):header.classList.remove('shadow-header');
    }

    window.addEventListener('scroll',shadowHeader)




/* EMAIL JS */

/* SHOW SCROLL UP */

/* SCROLL SECTIONS ACTIVE LINK */

/* DARK LIGHT THEME */

/* SCROLL REVEAL ANIMATION */
