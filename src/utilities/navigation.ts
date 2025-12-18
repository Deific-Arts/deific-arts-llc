export const deepLink = (event: Event, link: string) => {
  event.preventDefault();
  const { search } = window.location;

  if (link) {
    const newUrl = `${link}/${search}`;
    window.history.replaceState(null, '', newUrl);
    const target = document.querySelector(`deific-${link}`);
    target && target.scrollIntoView({ behavior: 'smooth' });
  }
}
