import KemetCarousel from "kemet-ui/dist/components/kemet-carousel/kemet-carousel";

const workCarousel = document.querySelector('[data-anchor="work"] kemet-carousel') as KemetCarousel;

if (workCarousel) {
  const options = {
    perView: 1,
    perMove: 1,
    gap: 0,
    slideshow: 0,
    rewind: true,
    center: false,
  };

  const breakpoints = {
    769: {
      gap : 24,
      perView: 2,
    },
  };

  workCarousel.options = options;
  workCarousel.breakpoints = breakpoints;
}
