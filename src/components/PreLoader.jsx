import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import useMediaQuery from '../utils/useMediaQuery';

const PreLoader = () => {
  const loaderContainerRef = useRef(null);
  const loaderElm1Ref = useRef(null);
  const loaderElm2Ref = useRef(null);
  const loaderElm3Ref = useRef(null);
  const loaderElm4Ref = useRef(null);
  const loaderElm5Ref = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const percentRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const match = useMediaQuery('(max-width: 1200px)');

  useEffect(() => {
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
      onComplete: () => setIsVisible(false)
    });

    tl.to([textRef.current, subTextRef.current, percentRef.current], {
      y: '100vh',
      duration: 0.8,
      delay: 1.2
    })
      .to(loaderElm1Ref.current, { opacity: 0, y: '100vh', duration: 1 })
      .to(loaderElm2Ref.current, { x: '-100vw', duration: 1 }, '-=1')
      .to(loaderElm3Ref.current, { y: '-100vh', duration: 1 }, '-=1')
      .to(loaderElm4Ref.current, { x: '100vw', duration: 1 }, '-=1')
      .to(loaderElm5Ref.current, { y: '100vh', duration: 1 }, '-=1');
  }, []);

  if (!isVisible) return null;

  return (
    <div id="loader_container" ref={loaderContainerRef} style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'fixed', top: 0, left: 0, zIndex: 20 }}>
      {
        match ?
        null
        :
        <svg id="loader_elm_1" ref={loaderElm1Ref} width="1530" height="950" viewBox="0 0 1530 950" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}>
          <path d="M226.333 255.608L1142.83 0.607822L1529.83 535.109L755.333 1059.11L167.334 1000.61L0.8335 873.109L226.333 255.608Z" fill="#2C2C2C"/>
        </svg>
      }
      <div ref={textRef} id="loader-caption" style={{ backgroundColor: !match ? 'transparent' : '#242424', position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 20 }}>
        <div ref={textRef} style={{ fontSize: '1.5rem', fontWeight: 'normal', marginBottom: '5px', letterSpacing: 1.5 }}>
          <a href="#">drazic webdev</a>
        </div>
        <div ref={percentRef} style={{ fontSize: '128px', fontWeight: 'bolder', marginBottom: '5px' }}>
          {percent}%
        </div>
        <div ref={subTextRef} style={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Transforming Ideas into Digital Success
        </div>
      </div>
      {
        match ?
        null
        :
        <>
          <svg id="loader_elm_2" ref={loaderElm2Ref} width="868" height="991" viewBox="0 0 868 991" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '0%', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
            <rect x="-378.417" width="1340" height="1325" transform="rotate(21.638 -378.417 0)" fill="#434343"/>
          </svg>
          <svg id="loader_elm_3" ref={loaderElm3Ref} width="1615" height="759" viewBox="0 0 1615 759" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '0', left: '40%', transform: 'translateX(-50%)', zIndex: 0 }}>
            <rect x="430.383" y="-1040" width="1340" height="1325" transform="rotate(27.9184 430.383 -1040)" fill="#FFB633"/>
          </svg>
          <svg id="loader_elm_4" ref={loaderElm4Ref} width="1070" height="1072" viewBox="0 0 1070 1072" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '0%', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
            <rect x="763.857" y="-486" width="1340" height="1325" transform="rotate(35.2045 763.857 -486)" fill="#404040"/>
          </svg>
          <svg id="loader_elm_5" ref={loaderElm5Ref} width="1318" height="544" viewBox="0 0 1318 544" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', zIndex: 0 }}>
            <rect x="452.811" width="978.051" height="967.103" transform="rotate(27.9184 452.811 0)" fill="#FFB633"/>
          </svg>
        </>
      }
    </div>
  );
};

export default PreLoader;
