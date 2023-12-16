const serviceSection = document.querySelector('[data-anchor="services"]');
const liveText = serviceSection?.querySelector('[aria-live="assertive"]');
const services = serviceSection?.querySelectorAll('kemet-card');

services?.forEach((service) => {
  service.addEventListener('mouseenter', () => {
    const serviceText = service.querySelector('p')?.innerHTML;
    if (liveText) liveText.innerHTML = serviceText || '';
  });
});
