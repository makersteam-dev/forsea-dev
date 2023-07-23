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
            duration: 0.3,
            ease: 'power2.inOut',
          });
        },
        onLeave: function () {
          gsap.to('main', {
            backgroundColor: color,
            duration: 0.3,
            ease: 'power2.inOut',
          });
        },
        onLeaveBack: function () {
          gsap.to('main', {
            backgroundColor: color,
            duration: 0.3,
            ease: 'power2.inOut',
          });
        },
        onEnterBack: function () {
          gsap.to('main', {
            backgroundColor: color,
            duration: 0.3,
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
  const wrapElement = document.querySelector<HTMLElement>('.theres-something-video-wrap');

  let shouldPlay = false; // Flag to determine if the video should be played

  // Function to handle the visibility change of the video element
  const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Video is in view
        if (shouldPlay) {
          video.play();
          if (wrapElement !== null) {
            wrapElement.style.cursor = 'none'; // Set cursor style to none when video is in view and should play
          }
        }
      } else {
        // Video is out of view
        video.pause();
        if (wrapElement !== null) {
          wrapElement.style.cursor = 'auto'; // Set cursor style to auto when video is out of view
        }
      }
    });
  };

  // Create an Intersection Observer to track the visibility of the video element
  const observer = new IntersectionObserver(handleVisibilityChange);

  // Start observing the video element
  observer.observe(video);

  video.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default behavior of the click event

    if (video.paused) {
      video.play();
      if (btnSvg !== null) {
        btnSvg.style.display = 'none'; // Hide the .video-btn-svg element
      }
      if (wrapElement !== null && video.paused) {
        wrapElement.style.cursor = 'none'; // Set cursor style to none when video is paused
      }
    } else {
      video.pause();
      shouldPlay = false; // Set the flag to false when video is paused
      if (btnSvg !== null) {
        btnSvg.style.display = 'block'; // Show the .video-btn-svg element
      }
      if (wrapElement !== null) {
        wrapElement.style.cursor = 'auto'; // Set cursor style to auto
      }
    }
  });

  video.addEventListener('mouseenter', () => {
    video.setAttribute('controls', 'true'); // Show the video controls
    if (wrapElement !== null && video.paused) {
      wrapElement.style.cursor = 'none'; // Set cursor style to none when video is paused
    }
  });

  video.addEventListener('mouseleave', () => {
    video.removeAttribute('controls'); // Hide the video controls
    if (wrapElement !== null) {
      wrapElement.style.cursor = 'auto'; // Set cursor style to auto
    }
  });

  /* Section: The Content */

  // Match media query with minimum width of 992px
  gsap.matchMedia().add('(min-width: 992px)', function () {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.the-content', // Element that triggers the animation
        scrub: true, // Enables smooth scrubbing effect during scroll
        pin: true, // Pins the trigger element during animation
        start: 'top top', // Start of the trigger element relative to viewport
        end: '+=700%', // End of the trigger element relative to viewport
        markers: false, // Set to true to display markers for debugging
      },
    });

    const frames = gsap.utils.toArray<HTMLElement>('.a-block'); // Get all elements with class "a-block"
    frames.forEach(function (frame, index) {
      // Set initial properties for each "a-block" element
      gsap.set(frame, {
        translateZ: '-100rem', // Move element away from viewer (negative Z-axis) for a 3D effect
        filter: 'blur(20px)', // Apply blur effect
        opacity: 0, // Set initial opacity to 0
      });

      // Animate the "translateZ" property of each element based on the index
      tl.to(
        frame,
        {
          duration: 8, // Animation duration
          ease: 'power2.inOut', // Easing function
          translateZ: '77rem', // Set different Z value for the 6th element
        },
        '<+=' + index * 0.4 // Animation stagger based on index
      );

      // Fade in the element
      tl.to(
        frame,
        {
          duration: 1, // Animation duration
          opacity: 1, // Set opacity to 1 (fully visible)
        },
        '<' // Use relative label for timeline position (right after the previous animation)
      );

      // Remove the blur effect
      tl.to(
        frame,
        {
          duration: 1.5, // Animation duration
          filter: 'blur(0px)', // Set blur to 0 (no blur)
        },
        '<+=1.8' // Animation delay after the previous animation
      );
    });
  });
});
/*! Run dev run:
makersteam.co:
  (*!
   * MakersTeam 1.0.3
   * https://makersteam.co
   *
   * @license Copyright 2008-2023
   * Subject to the termsstandard-license or for
   * 
   * @author: master splinter
  *)
  */
