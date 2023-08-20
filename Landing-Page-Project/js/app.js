/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const nav = document.querySelector('.navbar__menu');
const sections = document.querySelectorAll('section');
let prevPosition = window.pageYOffset;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// Populate the navbar dynamically
for (let i = 1; i <= sections.length; i++) {
    const section = sections[i - 1];
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add('menu__link');
    a.textContent = 'Section ' + i;
    a.href = '#section' + i;
    a.dataset.nav = 'section' + i;
    li.appendChild(a);
    nav.appendChild(li);
  }

// Add class 'active' to section when near top of viewport
// Add scroll event listener to set active section based on viewport
window.addEventListener('scroll', () => {
    setActiveSectionByViewport();
  });


// Scroll to anchor ID using scrollTO event
// Function to scroll to a specific section
function scrollToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    sections.forEach((section) => {
      section.classList.remove('your-active-class');
      document.querySelector(`a[data-nav="${section.getAttribute('id')}"]`).classList.remove('active');
    });
    targetSection.classList.add('your-active-class');
    targetSection.scrollIntoView({ behavior: 'smooth' });
    document.querySelector(`a[data-nav="${sectionId}"]`).classList.add('active');
  }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
// Add event listeners to the navbar links
nav.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    const link = e.target;
    if (link.nodeName === 'A') {
      const sectionId = link.dataset.nav;
      scrollToSection(sectionId);
    }
  });

// Set sections as active
// Function to set the active section based on the viewport

function setActiveSectionByViewport() {
  const currentPosition = window.pageYOffset;

  if (currentPosition > prevPosition) {
    // Scrolling down
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (currentPosition >= sectionTop && currentPosition < sectionTop + sectionHeight) {
        sections.forEach((section) => {
          section.classList.remove('your-active-class');
          document.querySelector(`a[data-nav="${section.getAttribute('id')}"]`).classList.remove('active');
        });
        document.querySelector(`a[data-nav="${sectionId}"]`).classList.add('active');
        section.classList.add('your-active-class');
      }
    });
  } else {
    // Scrolling up
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionTop = section.offsetTop - 500;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (currentPosition >= sectionTop && currentPosition < sectionTop + sectionHeight) {
        sections.forEach((section) => {
          section.classList.remove('your-active-class');
          document.querySelector(`a[data-nav="${section.getAttribute('id')}"]`).classList.remove('active');
        });
        document.querySelector(`a[data-nav="${sectionId}"]`).classList.add('active');
        section.classList.add('your-active-class');
        break;
      }
    }
  }

  prevPosition = currentPosition;
}















