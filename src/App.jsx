import React, { useEffect } from 'react';
import ProjectCarousel from './components/ProjectCarousel';
import PreLoader from './components/PreLoader';
import gsap from 'gsap';
import BackOffice from './components/BackOfficeComponent';

function App() {
  useEffect(() => {
    const timeline = gsap.timeline({ delay: 2.2 });

    // Animate left column width
    timeline.to('.left', {
      width: '100%',
      flex: '0 0 40%',
      maxWidth: '40%',
      duration: 1.5,
      ease: 'power2.out'
    });

    // Animate introduction div
    timeline.to('.introduction', {
      left: '0%',
      duration: 1,
      ease: 'power2.out'
    }, '-=1.2'); // start 1.2 seconds before the previous animation ends

    // Animate me-photo div
    timeline.to('.me-photo', {
      bottom: '0%',
      duration: 1.5,
      ease: 'bounce.out'
    }, '-=1');

    // Animate job_description div
    timeline.to('.job_description', {
      right: '0%',
      duration: 1,
      ease: 'power2.out'
    }, '-=1.2');
  }, []);

  return (
    <>
      <PreLoader />
      <section id='hero' className='hero-section'>
        <div className="container">
          <div className="left">
          </div>
          <div className="right">
          </div>
          <div className="hero-content">
            <div className="introduction">
              <div className="caption">
                <h2>
                  I’m Milan<br /> Drazic
                </h2>
                <p>Full AI web programmer<br /> and Web designer</p>
              </div>
              <div className='action-btn'>
                <button>
                  <a href="#contact">contact me</a>
                </button>
              </div>
            </div>
            <div className="me-photo">
              <svg width="150%" height="716" viewBox="0 0 654 716" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="filter0_d" x="0" y="0" width="654" height="716" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="14" />
                    <feGaussianBlur stdDeviation="25" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                  </filter>
                  <clipPath id="clip0">
                    <path d="M603.74 348.697C603.74 566.894 415.607 712.92 327.148 625.289C238.689 537.658 50.5557 501.454 50.5557 348.697C50.5557 195.939 221.111 17.803 379.056 38.5C537 59.1969 603.74 130.5 603.74 348.697Z" />
                  </clipPath>
                </defs>
                <g filter="url(#filter0_d)">
                  <image
                    xlinkHref="/profilePhoto.jpg"
                    width="580"
                    height="660"
                    clipPath="url(#clip0)"
                    preserveAspectRatio="xMidYMid slice"
                    x="50" // Adjust x to move left or right
                    y="0" // Adjust y to move up or down
                  />
                </g>
              </svg>
            </div>
            <div className="job_description">
              <div className="wrapper">
                <h1>Transforming Ideas into Digital Success</h1>
                <p>Cutting-Edge App Development and Stunning UI/UX Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='services'>
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="headline">
                <h2>Service</h2>
                <hr />
                <p>At Drazic webdev, we specialize in delivering end-to-end digital solutions that help businesses thrive in the modern world. From robust web applications to engaging mobile apps, and from stunning designs to effective digital marketing strategies, we have the expertise to turn your ideas into success.</p>
              </div>
            </div>
            <div className="column design-service">
              <div className="services">
                <div className="icon">
                  <svg width="60" height="60" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_212_47)">
                  <path d="M44 48H4C1.794 48 0 46.206 0 44V14C0 11.794 1.794 10 4 10H24C24.552 10 25 10.448 25 11C25 11.552 24.552 12 24 12H4C2.897 12 2 12.897 2 14V44C2 45.103 2.897 46 4 46H44C45.103 46 46 45.103 46 44V14C46 12.897 45.103 12 44 12C43.448 12 43 11.552 43 11C43 10.448 43.448 10 44 10C46.206 10 48 11.794 48 14V44C48 46.206 46.206 48 44 48Z" fill="white"/>
                  <path d="M44 44H10V14H20C20.552 14 21 14.448 21 15C21 15.552 20.552 16 20 16H12V42H42V16H40C39.448 16 39 15.552 39 15C39 14.448 39.448 14 40 14H44V44Z" fill="white"/>
                  <path d="M8 42H0V16H8V42ZM2 40H6V18H2V40Z" fill="white"/>
                  <path d="M17.4404 27.5599L20.0794 19.2629L38.0714 1.27194C39.5824 -0.240061 42.2174 -0.240061 43.7284 1.27194C45.2884 2.83194 45.2884 5.36894 43.7284 6.92794L25.7374 24.9199L17.4404 27.5599ZM21.8384 20.3329L20.5184 24.4809L24.6664 23.1609L42.3144 5.51494C43.0944 4.73494 43.0944 3.46694 42.3144 2.68694C41.5584 1.93094 40.2414 1.93094 39.4854 2.68694L21.8384 20.3329Z" fill="white"/>
                  <path d="M7 24H1V26H7V24Z" fill="white"/>
                  <path d="M7 32H1V34H7V32Z" fill="white"/>
                  <path d="M41.6056 8.63595C41.3496 8.63595 41.0936 8.53795 40.8986 8.34295L36.6556 4.09995C36.2646 3.70895 36.2646 3.07695 36.6556 2.68595C37.0466 2.29495 37.6786 2.29495 38.0696 2.68595L42.3126 6.92895C42.7036 7.31995 42.7036 7.95195 42.3126 8.34295C42.1176 8.53895 41.8616 8.63595 41.6056 8.63595Z" fill="white"/>
                  <path d="M35.9503 14.2929C35.6943 14.2929 35.4383 14.1949 35.2433 13.9999L31.0003 9.75693C30.6093 9.36593 30.6093 8.73393 31.0003 8.34293C31.3913 7.95193 32.0233 7.95193 32.4143 8.34293L36.6573 12.5859C37.0483 12.9769 37.0483 13.6089 36.6573 13.9999C36.4613 14.1949 36.2063 14.2929 35.9503 14.2929Z" fill="white"/>
                  <path d="M25.2022 25.041C24.9462 25.041 24.6902 24.943 24.4952 24.748L20.2522 20.505C19.8612 20.114 19.8612 19.482 20.2522 19.091C20.6432 18.7 21.2752 18.7 21.6662 19.091L25.9092 23.334C26.3002 23.725 26.3002 24.357 25.9092 24.748C25.7132 24.943 25.4582 25.041 25.2022 25.041Z" fill="white"/>
                  <path d="M17.0003 28.9999C16.7443 28.9999 16.4882 28.9019 16.2932 28.7069C15.9022 28.3159 15.9022 27.6839 16.2932 27.2929L18.2723 25.3139C18.6633 24.9229 19.2953 24.9229 19.6863 25.3139C20.0773 25.7049 20.0773 26.3369 19.6863 26.7279L17.7073 28.7069C17.5123 28.9019 17.2563 28.9999 17.0003 28.9999Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_212_47">
                  <rect width="48" height="48" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </div>
                <div className="title">
                  <h3>UI/UX Design</h3>
                  <div className="subtitle">
                    <span>Captivate Your Audience with Exceptional UI/UX Design</span>
                  </div>
                </div>
                <div className="short-text">
                  <p>Designing user experiences that are not only beautiful but also intuitive and engaging. Creating detailed prototypes and wireframes to visualize your product.</p>
                </div>
              </div>
            </div>
            <div className="column development-service">
              <div className="services">
                <div className="icon">
                  <svg width="80" height="55" viewBox="0 0 80 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.8623 11.2104H73.5854M45.5845 20.7393L35.1656 41.4786M29.9561 41.4786L20.1883 30.8287L29.9561 20.7393M49.4916 20.7393L58.6082 30.8287L49.4916 41.4786" stroke="white" strokeWidth="3"/>
                  <rect x="0.5" y="0.5" width="78.4444" height="53.931" rx="3.5" stroke="white"/>
                  <rect x="5.70898" y="3.8631" width="68.0255" height="47.2048" rx="3.5" stroke="white"/>
                  </svg>
                </div>
                <div className="title">
                  <h3>Web Development</h3>
                  <div className="subtitle">
                    <span>Empower Your Business with Advanced Web Development</span>
                  </div>
                </div>
                <div className="short-text">
                  <p>Utilizing the latest technologies to create scalable, secure, and high-performance web applications. Expertise in JavaScript, React.js, Next.js, Node.js, MongoDB, MySQL, and Laravel.</p>
                </div>
              </div>
            </div>
            <div className="column mobile-service">
              <div className="services">
                <div className="icon">
                  <svg width="44" height="59" viewBox="0 0 44 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.4058 45.6552V53.5H21.7506H4.09537V45.6552M39.4058 45.6552V3.41379H4.09537V45.6552M39.4058 45.6552H4.09537M1.21289 1H43.0089V57.7241H1.21289V1Z" stroke="white" strokeWidth="2"/>
                  <path d="M4.81641 45.6552V47.4655H18.3464V53.5H21.3907H25.1114V47.4655H39.4062V45.6552M4.81641 7.63796H17.7876V3.41382H21.3907H24.9938V7.63796H39.4062V11.2586H4.81641V7.63796Z" stroke="white"/>
                  </svg>
                </div>
                <div className="title">
                  <h3>Mobile Development</h3>
                  <div className="subtitle">
                    <span>Innovate with Cutting-Edge Mobile Apps</span>
                  </div>
                </div>
                <div className="short-text">
                  <p>Creating intuitive and engaging mobile applications that provide a seamless user experience. iOS and Android Development</p>
                </div>
              </div>
            </div>
            <div className="column marketing-service">
              <div className="services">
                <div className="icon">
                <svg width="69" height="61" viewBox="0 0 69 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M55.7422 6.625C55.7422 4.93425 56.4138 3.31274 57.6094 2.11719C58.8049 0.92165 60.4264 0.25 62.1172 0.25C63.8079 0.25 65.4295 0.92165 66.625 2.11719C67.8205 3.31274 68.4922 4.93425 68.4922 6.625V53.375C68.4922 55.0658 67.8205 56.6873 66.625 57.8828C65.4295 59.0784 63.8079 59.75 62.1172 59.75C60.4264 59.75 58.8049 59.0784 57.6094 57.8828C56.4138 56.6873 55.7422 55.0658 55.7422 53.375V52.4655C46.5537 47.1912 36.6597 44.6328 26.3662 43.6128L28.0874 55.1387C28.203 55.7528 28.1818 56.3848 28.0253 56.9897C27.8688 57.5946 27.5808 58.1575 27.1818 58.6384C26.7829 59.1194 26.2829 59.5064 25.7173 59.772C25.1517 60.0376 24.5345 60.1752 23.9097 60.175H21.5807C20.7546 60.1749 19.9464 59.9341 19.255 59.482C18.5636 59.0299 18.019 58.386 17.6877 57.6293L9.82519 42.7967L8.96669 42.784C6.71574 42.7617 4.5642 41.8535 2.97803 40.2562C1.39187 38.6589 0.498783 36.501 0.492188 34.25L0.492188 25.75C0.499773 23.4987 1.39136 21.3405 2.97488 19.7403C4.5584 18.1401 6.70713 17.2259 8.95819 17.1947C12.4773 17.1468 15.9954 17.0405 19.5109 16.876C32.4437 16.2215 45.6399 13.2678 55.7422 7.53025V6.625ZM59.9922 6.625V53.375C59.9922 53.9386 60.2161 54.4791 60.6146 54.8776C61.0131 55.2761 61.5536 55.5 62.1172 55.5C62.6808 55.5 63.2213 55.2761 63.6198 54.8776C64.0183 54.4791 64.2422 53.9386 64.2422 53.375V6.625C64.2422 6.06141 64.0183 5.52091 63.6198 5.1224C63.2213 4.72388 62.6808 4.5 62.1172 4.5C61.5536 4.5 61.0131 4.72388 60.6146 5.1224C60.2161 5.52091 59.9922 6.06141 59.9922 6.625ZM55.7422 12.3625C45.7802 17.4837 33.6039 20.191 21.7422 21.0028V38.993C22.5072 39.0355 23.2679 39.0865 24.0244 39.146C34.9384 39.9493 45.6697 42.308 55.7422 47.6163V12.3625ZM17.4922 38.7762V21.2237C14.671 21.327 11.8489 21.4007 9.02619 21.4447C7.89047 21.4581 6.80535 21.9166 6.00421 22.7217C5.20306 23.5269 4.7499 24.6142 4.74219 25.75V34.25C4.74219 36.5875 6.64619 38.5085 9.01769 38.5382C11.8436 38.5714 14.6688 38.6507 17.4922 38.7762ZM14.6999 42.92L21.5382 55.8272L21.5807 55.9292H23.9097L23.9012 55.8698L22.0184 43.2643C19.5805 43.1172 17.1408 43.001 14.6999 42.9157V42.92Z" fill="white"/>
                </svg>
                </div>
                <div className="title">
                  <h3>Digital Marketing</h3>
                  <div className="subtitle">
                    <span>Boost Your Online Presence with Strategic Digital Marketing</span>
                  </div>
                </div>
                <div className="short-text">
                  <p>Comprehensive digital marketing solutions to increase visibility, engagement, and conversions. SEO, Content Creation and Copywriting, Social Media Marketing...</p>
                </div>
              </div>
            </div>
            <div className="column cloud-service">
              <div className="services">
                <div className="icon">
                <svg width="100" height="62" viewBox="0 0 102 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M93.2819 61.0135C92.6349 61.0135 91.9719 60.8191 91.3917 60.4366C89.8331 59.3751 89.4155 57.2491 90.4451 55.7191C93.5864 51.0505 95.2522 45.5456 95.2263 39.9186C95.2489 34.2902 93.5835 28.7842 90.4451 24.1118C89.9426 23.3649 89.7568 22.4493 89.9283 21.5656C90.0997 20.682 90.6146 19.9023 91.3599 19.3975C92.1068 18.897 93.0211 18.7116 93.9039 18.8817C94.7868 19.0519 95.5668 19.5637 96.0742 20.306C99.9551 26.1188 102.019 32.9548 102.003 39.9441C102.003 46.9535 99.9629 53.7747 96.0742 59.5696C95.4972 60.5991 94.4167 61.0964 93.3361 61.0964L93.2819 61.0135ZM83.5537 55.5215C82.8776 55.5172 82.2186 55.3083 81.6635 54.9222C81.2942 54.6802 80.977 54.3669 80.7305 54.0006C80.4839 53.6344 80.313 53.2226 80.2278 52.7894C80.1426 52.3562 80.1448 51.9103 80.2342 51.478C80.3237 51.0456 80.4986 50.6355 80.7487 50.2716C82.8249 47.2286 83.9307 43.628 83.9202 39.9441C83.9066 36.2649 82.8029 32.6722 80.7487 29.6198C80.4986 29.2546 80.3238 28.8432 80.2344 28.4097C80.1449 27.9762 80.1428 27.5292 80.2279 27.0948C80.3131 26.6604 80.4839 26.2474 80.7303 25.8797C80.9768 25.512 81.294 25.1971 81.6635 24.9533C82.0349 24.7075 82.4512 24.5374 82.8885 24.4529C83.3258 24.3683 83.7755 24.371 84.2117 24.4608C84.648 24.5505 85.0623 24.7255 85.4307 24.9758C85.7991 25.2261 86.1145 25.5467 86.3587 25.9191C89.1807 30.072 90.696 34.9742 90.7096 39.9951C90.7233 45.0272 89.2058 49.9443 86.3587 54.0935C86.0609 54.5667 85.6466 54.9556 85.1554 55.2229C84.6643 55.4903 84.1128 55.6271 83.5537 55.6203V55.5215ZM67.7022 25.1063C66.3731 11.5276 54.8853 0.884521 40.9241 0.884521C35.3125 0.893354 29.8434 2.65239 25.2789 5.91653C20.7143 9.18068 17.2817 13.7874 15.4591 19.0947C6.76043 20.3729 0.00292969 27.8954 0.00292969 36.9415C0.00292969 46.9025 8.12149 55.021 18.1175 55.021H64.4669C72.8182 55.021 79.6235 48.2508 79.6235 39.9155C79.6216 36.4603 78.4388 33.1095 76.2711 30.4189C74.1034 27.7282 71.0811 25.8594 67.7054 25.1223L67.7022 25.1063ZM64.4637 48.2635H18.1143C11.8891 48.2635 6.77637 43.2018 6.77637 36.9575C6.77929 35.4718 7.07493 34.0012 7.64637 32.6298C8.21782 31.2584 9.05389 30.0131 10.1068 28.9649C11.1597 27.9167 12.4088 27.0863 13.7828 26.521C15.1567 25.9558 16.6286 25.6668 18.1143 25.6705C21.1361 25.6705 23.9921 26.8818 26.1309 28.9887C26.4438 29.3044 26.8162 29.555 27.2265 29.7261C27.6368 29.8971 28.077 29.9851 28.5215 29.9851C28.966 29.9851 29.4062 29.8971 29.8165 29.7261C30.2268 29.555 30.5992 29.3044 30.9121 28.9887C32.1903 27.7137 32.1903 25.5366 30.9121 24.2075C28.6036 21.9111 25.7203 20.2774 22.5641 19.4772C24.1595 15.9636 26.7331 12.9839 29.9771 10.8941C33.2211 8.80436 36.9983 7.69304 40.8571 7.69302C51.9496 7.69302 61.0117 16.7423 61.0117 27.8285C61.0117 30.0055 60.6802 32.1125 59.9821 34.1365C59.4179 35.9311 60.3646 37.8372 62.1592 38.4875C62.4838 38.6029 62.8251 38.6643 63.1696 38.6691C64.5817 38.6691 65.9109 37.7735 66.3571 36.3773C66.8029 35.0486 67.1262 33.6818 67.3229 32.2941C69.1394 33.0032 70.6518 34.3235 71.5995 36.0277C72.5472 37.7319 72.8709 39.7133 72.5148 41.6305C72.1588 43.5477 71.1453 45.2807 69.649 46.531C68.1526 47.7813 66.2671 48.4706 64.3171 48.4803L64.4637 48.2635Z" fill="white"/>
                </svg>
                </div>
                <div className="title">
                  <h3>Cloud Services</h3>
                  <div className="subtitle">
                    <span> Enhance Your Infrastructure with AWS and Google Cloud</span>
                  </div>
                </div>
                <div className="short-text">
                  <p>Leveraging the power of cloud services to provide scalable and reliable solutions. AWS Services, Google Cloud Services, Cloud Migration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='projects'>
        <div className="container">
            <div className="row">
              <div className="column">
                <div className="headline">
                  <h2>Our Project</h2>
                  <hr />
                  <p>Explore our work to see how we've helped our clients achieve their goals through our expertise in development and design. From cutting-edge web applications and innovative mobile apps to dynamic e-commerce solutions and stunning designs.</p>
                </div>
              </div>
              <div className="column nav-project">
                <nav>
                  <ul>
                    <li>all projects</li>
                    <li>web app</li>
                    <li>mobile app</li>
                    <li>e-commerce</li>
                  </ul>
                </nav>
              </div>
            </div>
            <ProjectCarousel />
        </div>
      </section>
      <section id='customize-projects'>
        <div className="container">
          <BackOffice />
        </div>
      </section>
    </>
  )
}

export default App;
