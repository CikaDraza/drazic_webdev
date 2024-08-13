import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const FooterAnimation = () => {
  const containerRef = useRef(null);
  const elm1Ref = useRef(null);
  const elm2Ref = useRef(null);
  const elm3Ref = useRef(null);
  const elm4Ref = useRef(null);
  const elm5Ref = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Function to start the animation
    const startAnimation = () => {
      // Timer for percentage
      gsap.to({}, {
        duration: 1.2,
        ease: "linear",
        onUpdate: () => {
          setPercent(prev => {
            if (prev < 100) return prev + 1;
            return prev;
          });
        }
      });

      const tl = gsap.timeline({
        onComplete: () => setPercent(100)
      });

      tl.to(elm1Ref.current, { opacity: 1, y: '500px', duration: 1 })
        .to(elm2Ref.current, { x: '-500px', duration: 1 }, '-=1')
        .to(elm3Ref.current, { y: '-500px', duration: 1 }, '-=1')
        .to(elm4Ref.current, { x: '500px', duration: 1 }, '-=1')
        .to(elm5Ref.current, { y: '500px', duration: 1 }, '-=1');
    };

    // Create an IntersectionObserver to start the animation when in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect(); // Stop observing after the animation has started
        }
      },
      {
        root: null, // Use the viewport as the container
        rootMargin: '0px',
        threshold: 0.5 // Start the animation when 50% of the element is visible
      }
    );

    const target = document.querySelector('#thank-you-card');
    if (target) {
      observer.observe(target);
    }

    // Cleanup observer on component unmount
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  return (
    <div id="footer_loader_container" ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', top: 0, left: 0, zIndex: 3 }}>
      <svg id="_elm_2" ref={elm2Ref} width="868" height="991" viewBox="0 0 868 991" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '0%', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
        <rect x="-378.417" width="1340" height="1325" transform="rotate(21.638 -378.417 0)" fill="#434343"/>
      </svg>
      <svg id="_elm_3" ref={elm3Ref} width="1615" height="759" viewBox="0 0 1615 759" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '-20%', left: '40%', transform: 'translateX(-50%)', zIndex: 0 }}>
        <rect x="430.383" y="-1040" width="1340" height="1325" transform="rotate(27.9184 430.383 -1040)" fill="#FFB633"/>
      </svg>
      <svg id="_elm_4" ref={elm4Ref} width="1070" height="1072" viewBox="0 0 1070 1072" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '-20%', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
        <rect x="763.857" y="-486" width="1340" height="1325" transform="rotate(35.2045 763.857 -486)" fill="#404040"/>
      </svg>
      <svg id="_elm_5" ref={elm5Ref} width="1318" height="544" viewBox="0 0 1318 544" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', zIndex: 0 }}>
        <rect x="452.811" width="978.051" height="967.103" transform="rotate(27.9184 452.811 0)" fill="#FFB633"/>
      </svg>
    </div>
  );
};

export default FooterAnimation;