import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  const showAnim = gsap
    .from('.navbar', {
      yPercent: -100,
      paused: true,
      duration: 0.2,
    })
    .progress(1);

  ScrollTrigger.create({
    start: 'top top',
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse();
    },
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
