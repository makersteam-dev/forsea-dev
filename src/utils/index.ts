import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  /* Set main color on page load to the proper color */
  gsap.set('main', {
    backgroundColor: '#EDF1F7',
  });

  /* H1 split text animation */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  new SplitType('[mt-el=split]', {
    types: 'words, chars',
    tagName: 'span',
  });
  const tl = gsap.timeline();
  tl.from('[mt-el=split] > .word > .char', {
    duration: 1,
    opacity: 0,
    yPercent: 100,
    stagger: 0.05,
    ease: 'back.out(2)',
  });

  /* Main Wrapper: Background Change Animation */
  gsap.utils.toArray('[mt-el=background]').forEach((elem) => {
    const color = (elem as HTMLElement).getAttribute('data-color');
    if (color !== null) {
      ScrollTrigger.create({
        trigger: elem as Element,
        start: 'top 80%',
        end: 'bottom 80%',
        onEnter: function () {
          gsap.to('main', {
            backgroundColor: color,
            duration: 1,
            ease: 'power2.inOut',
          });
        },
        onLeave: function () {
          gsap.to('main', {
            backgroundColor: color,
            duration: 1,
            ease: 'power2.inOut',
          });
        },
        onLeaveBack: function () {
          gsap.to('main', {
            backgroundColor: color,
            duration: 1,
            ease: 'power2.inOut',
          });
        },
        onEnterBack: function () {
          gsap.to('main', {
            backgroundColor: color,
            duration: 1,
            ease: 'power2.inOut',
          });
        },
        markers: false,
      });
    }
  });

  /* Section: Who We Are Hover Animation */
  const whoWeAreWrappers = document.querySelectorAll<HTMLElement>('.who-we-are-wrapper');

  whoWeAreWrappers.forEach((wrapper) => {
    const sectionHeading = wrapper.querySelector('.who-we-are-p') as HTMLElement;
    const sectionSpans = wrapper.querySelectorAll<HTMLElement>('.wave-link');
    const sectionItems = wrapper.querySelectorAll<HTMLElement>('.about_item');

    sectionSpans.forEach((span, index) => {
      const relatedImages = sectionItems[index].querySelectorAll<HTMLElement>('.about_image');

      const tl = gsap.timeline({ paused: true, defaults: { duration: 0.2 } });
      tl.set(span, { zIndex: 3 });
      tl.to(relatedImages, { opacity: 1, ease: 'power4.out' });
      tl.fromTo(sectionHeading, { color: '#000000' }, { color: 'rgba(0, 0, 0, 0.2)' }, '<');

      span.addEventListener('mouseenter', () => {
        tl.timeScale(1).play();
      });
      span.addEventListener('mouseleave', () => {
        tl.timeScale(2).reverse();
      });
    });
  });

  /* Section: Play Button */
  const video = document.getElementById('myVideo') as HTMLVideoElement;
  const btnSvg = document.querySelector<HTMLElement>('.video-btn-svg');
  const dummyBtnSvg = document.querySelector<HTMLElement>('.video-btn-svg-dummy');

  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      if (btnSvg !== null) {
        btnSvg.style.display = 'none'; // Hide the .video-btn-svg element
      }
      if (dummyBtnSvg !== null) {
        dummyBtnSvg.style.display = 'none'; // Hide the .video-btn-svg-dummy element
      }
    } else {
      video.pause();
      if (btnSvg !== null) {
        btnSvg.style.display = 'block'; // Show the .video-btn-svg element
      }
      if (dummyBtnSvg !== null) {
        dummyBtnSvg.style.display = 'block'; // Show the .video-btn-svg-dummy element
      }
    }
  });

  gsap.matchMedia().add('(min-width: 992px)', function () {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.the-content',
        scrub: true,
        pin: true,
        start: 'top top',
        end: '+=500%',
        markers: false,
      },
    });

    const frames = gsap.utils.toArray<HTMLElement>('.a-block');
    frames.forEach(function (frame, index) {
      gsap.set(frame, {
        translateZ: '-100rem',
        filter: 'blur(20px)',
        opacity: 0,
      });
      tl.to(
        frame,
        {
          duration: 8,
          ease: 'power2.inOut',
          translateZ: index === 5 ? '30rem' : '100rem',
        },
        '<+=' + index * 0.6
      );
      tl.to(
        frame,
        {
          duration: 1, // Adjust the duration of the blur animation here
          opacity: 1,
        },
        '<' // Play the blur animation immediately after the previous animation
      );
      tl.to(
        frame,
        {
          duration: 2.5, // Adjust the duration of the blur animation here
          filter: 'blur(0px)',
        },
        '<+=2' // Play the blur animation immediately after the previous animation
      );
    });
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
