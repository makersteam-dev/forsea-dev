import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

window.Webflow = window.Webflow || [];
window.Webflow.push(() => {
  document.addEventListener('DOMContentLoaded', function () {
    new SplitText('.about_side-text', {
      type: 'words, chars',
      tagName: 'span',
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about_side-text-wrapper',
        scrub: true,
        pin: true,
        start: 'top 20rem',
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
});
