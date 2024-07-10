/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalClose = document.querySelectorAll('.services__modal-close');

let modal = function(modalClick) {
  modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((mb, i) => {
  mb.addEventListener('click', () => {
    modal(i);
  });
});

modalClose.forEach((mc) => {
  mc.addEventListener('click', () => {
    modalViews.forEach((mv) => {
      mv.classList.remove('active-modal');
    });
  });
});
/*Nav Icons Animation Bug Fix */
const navLinks = document.querySelectorAll('.nav__link');
let isScrolling = false;

// Handle scroll event
const onScroll = () => {
  if (isScrolling) return;

  const scrollPosition = window.scrollY;
  const sections = document.querySelectorAll('section');

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      const navLink = document.querySelector(`[href="#${section.id}"]`);
      navLinks.forEach((link) => link.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
};

window.addEventListener('scroll', onScroll);

// Add event listener to each nav link
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    isScrolling = true;

    const targetSection = document.querySelector(link.getAttribute('href'));
    targetSection.scrollIntoView({ behavior: 'smooth' });

    // Add a temporary scroll event listener to ensure the active link is set correctly
    const onScrollComplete = () => {
      isScrolling = false;
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
      window.removeEventListener('scroll', onScrollComplete);
    };

    // Re-enable scroll listener after a delay (duration of the smooth scroll)
    setTimeout(onScrollComplete, 500); // Adjust delay as needed for smooth scroll duration
  });
});


/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container' , {
    selectors: {
      target: '.work__card'
    },
    animation: {
      duration: 300
    }
});
/* Link active work */ 
const linkWork = document.querySelectorAll('.work__item');

linkWork.forEach((l) => {
  l.addEventListener('click', () => {
    linkWork.forEach((item) => item.classList.remove('active-work'));
    l.classList.add('active-work');
  });
});
/*=============== EDUCATION AND CERTIFICATION SECTION ===============*/
/*No need */

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('nav__list[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__link a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)
/*=============== LIGHT DARK THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/

