import fullpage from 'fullpage.js';

const mediaQuery = window.matchMedia('(min-width: 769px)');
const sections = document.querySelectorAll('main > section');

const disableInputKeyboardScrolling = () => {
  document.addEventListener('kemet-input-focused', (event) => {
    const focus = event.detail;
    if (focus) {
      fullpage_api.setKeyboardScrolling(false);
    }
  });

  document.addEventListener('kemet-input-focused', (event) => {
    const blur = !event.detail;
    if (blur) {
      fullpage_api.setKeyboardScrolling(true);
    }
  });
};

if (mediaQuery.matches) {
  sections.forEach(section => {
    section.removeAttribute('id');
  });

  new fullpage('main', {
    sectionSelector: 'main > section',
    navigation: false,
    licenseKey: 'gplv3-license',
    sectionsColor:['transparent', 'transparent', 'transparent', 'transparent', 'transparent'],
    afterLoad: (destination) => {
      const body = document.querySelector('body');
      const footerLinks = document.querySelectorAll(`footer a`);
      const anchor = location.hash === '' ? destination.anchor : window.location.hash.replace('#', '');

      body?.setAttribute('data-current-anchor', anchor);

      footerLinks.forEach((link) => {
        if (link.href.includes(anchor)) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}

disableInputKeyboardScrolling();
