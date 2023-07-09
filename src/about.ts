window.Webflow = window.Webflow || [];
window.Webflow.push(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  new SplitType('.about_side-text', {
    types: 'words, chars',
    tagName: 'span',
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.about_side-text-wrapper',
      scrub: true,
      start: 'top center',
      end: '+=100%',
    },
  });
  tl.from('.about_side-text > .word', {
    duration: 1,
    opacity: 0.1,
    stagger: 0.4,
    ease: 'power2.inOut',
  });
});
