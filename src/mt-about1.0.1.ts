import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
      start: 'top 80%',
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
/*! Run dev run:
makersteam.co:
  (*!
   * MakersTeam 1.0.0
   * https://makersteam.co
   *
   * @license Copyright 2008-2023
   * Subject to the termsstandard-license or for
   * 
   * @author: master splinter
  *)
  */
