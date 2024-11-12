import React, { useEffect, useRef, useState } from 'react';
import ProjectCarousel from './components/ProjectCarousel';
import PreLoader from './components/PreLoader';
import gsap from 'gsap';
import BackOffice from './components/BackOfficeComponent';
import LoginDialog from './components/LoginDialog';
import axios from 'axios';
import TestimonialCarousel from './components/TestimonialCarousel';
import BackOfficeClient from './components/BackOfficeClientComponent';
import ContactForm from './components/ContactForm';
import FooterAnimation from './components/FooterAnimation';
import useMediaQuery from './utils/useMediaQuery';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const match = useMediaQuery('(max-width: 1200px)');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  };

  const fetchUser = async () => {
    try {
      const email = localStorage.getItem('user-email');
      
      // Fetch user data
      const { data } = await axios.get(`https://drazic-webdev-server.vercel.app/api/users/${email}`, {
        method: 'GET',
        headers: getAuthHeaders(),
        body: JSON.stringify(email),
      });
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchVKUser = async (token) => {
    try {

      const email = `vk_user_${token}@vk.com`;
      console.log(email);
      
      // if (userData && userData.jwtToken) {
      // // Fetch user data
      //   const { data } = await axios.get(`https://drazic-webdev-server.vercel.app/api/users/${email}`, {
      //     method: 'GET',
      //     headers: { 'Authorization': `Bearer ${token}` },
      //     body: JSON.stringify(email),
      //   });
      //   if (response.status === 200) {
      //     setUser(data);
      //     console.log('User data:', data);
      //   }
      // }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  
  useEffect(() => {
    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const storedData = sessionStorage.getItem('userData');
    if (storedData) {
      const { jwtToken, userId } = JSON.parse(storedData);
      console.log("Retrieved JWT Token:", jwtToken);
      console.log("Retrieved User ID:", userId);
      // Set logged in status or perform additional actions
      // setIsLoggedIn(true);
      // fetchVKUser(userId, jwtToken);
    }
  }, []);
  

  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios.post('https://drazic-webdev-server.vercel.app/api/login', {
        email,
        password
      });
      alert('Login successful');
      setIsLoading(false);
      setShowLogin(false);
      setShowMenu(false);
      localStorage.setItem('user-email', email);
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formOutput = new FormData(event.currentTarget);
    const formData = {
      email: formOutput.get('email'),
      password: formOutput.get('password'),
    };
    const email = formData?.email;
    const password = formData?.password;
    handleLogin(email, password);
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user-email');
    sessionStorage.removeItem('userData');
    alert('Logout successful');
  }

  useEffect(() => {
    const timeline = gsap.timeline({ delay: 2.2 });
    // Animate left column width
    timeline.to('.left', {
      width: match ? '100%' : '40%',
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
      bottom: match ? '20%' : '0%',
      duration: 1.5,
      ease: 'bounce.out'
    }, '-=1');

    // Animate job_description div
    timeline.to('.job_description', {
      right: '0%',
      duration: 1,
      ease: 'power2.out'
    }, '-=1.2');

    timeline.to('.header', {
      top: '1.2rem',
      duration: 1,
      ease: 'power2.out'
    }, '-=1.2');
  }, [match]);

  return (
    <>
      <PreLoader />
      <header className='header'>
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="logo">
                <svg width="82" height="60" viewBox="0 0 82 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.87898 52.0039C5.73517 52.6359 8.89097 53.3343 8.89097 56.0818C8.89097 58.1456 21.8169 59.1599 28.5 59.5L52.5463 52.3488L53.4136 41.2784C53.4476 40.5981 55.1991 39.401 60.3007 38.4215C62.4904 38.0011 64.7583 37.6829 66.9597 37.374C71.1696 36.7834 75.1368 36.2269 77.8502 35.0544C80.7949 33.782 81.5743 29.9358 81.8294 28.5754C81.1492 26.6198 78.1256 21.9842 71.4732 19.0865C63.1576 15.4643 44.2307 7.914 33.0072 6.89368C32.191 6.06043 30.4769 4.31228 30.1504 3.98578C30.0684 3.90378 29.9596 3.75176 29.8232 3.56117C29.2808 2.80315 28.3019 1.43499 26.8343 1.43499C25.8999 1.43499 25.0184 1.21051 24.3106 1.03027C23.6271 0.856234 23.1057 0.723451 22.8551 0.873816C22.3449 1.17991 19.8452 1.33296 19.6411 1.17991C19.5786 1.13306 19.4636 0.995377 19.3252 0.829791C19.0116 0.454455 18.5781 -0.0642527 18.3657 0.00654528C18.2175 0.0559379 18.1411 0.356391 18.0611 0.670619C17.9759 1.0055 17.8867 1.35603 17.7025 1.43499C17.4168 1.55743 16.3251 2.0982 15.8149 2.35328C15.4238 2.82943 14.6109 3.94497 14.4885 4.59798C14.3354 5.41423 14.2334 6.9447 14.4885 7.50588C14.6926 7.95482 14.4035 8.98534 14.2334 9.44448C14.1484 9.69956 14.0294 10.3117 14.2334 10.7199C14.3796 11.0122 14.2578 11.5222 14.1367 12.0292C14.0464 12.4071 13.9566 12.7834 13.9783 13.0666C14.0114 13.4968 14.1089 13.5836 14.243 13.7028C14.3156 13.7674 14.3989 13.8415 14.4885 13.9849C14.6926 14.3114 14.4035 15.3453 14.2334 15.8215C14.1994 16.1956 14.2028 17.0356 14.4885 17.403C14.6294 17.5842 14.7942 17.8528 14.9703 18.1399C15.2404 18.5801 15.537 19.0636 15.8149 19.3415C16.1822 19.7089 15.968 21.2291 15.8149 21.9434C16.4101 23.3718 17.7535 26.4123 18.3657 27.147C18.8611 27.7415 18.7365 28.2718 18.6562 28.6134C18.6124 28.7995 18.5819 28.9296 18.6718 28.9835C18.8759 29.106 19.9132 29.7828 20.4063 30.1059L19.335 30.514C16.189 32.4016 9.24407 36.4319 6.63206 37.4522C4.02005 38.4725 1.25839 44.1012 0.204063 46.7881L0 51.2264C0.800749 51.544 1.81924 51.7694 2.87898 52.0039ZM34.9461 12.1483V13.8318L35.5072 14.1379L35.9664 16.0255V19.5966L35.5072 20.1068C34.861 22.3175 34.4971 26.698 38.2111 26.5348C41.925 26.3715 53.3288 25.9566 58.5664 25.7696L60.2499 25.4635C56.7128 22.9977 49.2815 18.0866 47.8531 18.1682C46.5879 19.3109 43.9589 19.3246 42.8025 19.1885C42.2413 19.0525 41.0068 18.862 40.5578 19.1885C40.429 19.2822 40.3083 19.3732 40.1968 19.4571C39.8227 19.7391 39.5534 19.942 39.4355 19.9027C39.2824 19.8517 38.3131 18.7804 38.9253 17.556C39.6191 17.0662 40.4048 17.0799 40.7109 17.1479C40.9829 17.1819 41.4557 17.0765 41.17 16.3826C40.8843 15.6888 40.3708 14.461 40.1497 13.9339C40.1327 13.8318 39.966 13.5972 39.4355 13.4747C38.9049 13.3523 36.2215 12.5394 34.9461 12.1483Z" fill="black"/>
                  <path d="M19.5 14.9565C19.5 15.7526 19.1312 16.6535 18.5398 17.3596C17.9447 18.07 17.1975 18.5 16.5 18.5C15.7333 18.5 15.2714 18.2402 14.9807 17.8422C14.6695 17.4162 14.5 16.7572 14.5 15.8696C14.5 14.6999 15.4922 13.5 17 13.5C17.4493 13.5 17.8381 13.5055 18.1755 13.5398C18.5141 13.5741 18.7672 13.6347 18.9549 13.7258C19.1309 13.8111 19.2535 13.9248 19.34 14.0913C19.432 14.2681 19.5 14.5376 19.5 14.9565Z" fill="#636363" stroke="#636363"/>
                  <path d="M22.7805 13.4123C22.8399 14.246 23.3508 15.0594 24.1491 15.6613C24.9498 16.2651 25.9909 16.6159 27.0092 16.5505C28.0566 16.4832 28.6804 16.1332 29.0442 15.6493C29.4193 15.1504 29.5864 14.4192 29.5247 13.4604C29.4433 12.1937 28.215 10.8201 26.19 10.9374C25.031 11.1448 24.1646 11.4796 23.5979 11.9077C23.0498 12.3219 22.7852 12.817 22.7805 13.4123Z" fill="#636363" stroke="#636363"/>
                  <path d="M15.9997 13.5L26 11" stroke="#636363" strokeWidth="0.5"/>
                  <path d="M34.57 13.0159L29.8148 12.3207L29.9753 12.8286L34.5745 13.322L34.57 13.0159Z" fill="#636363"/>
                  <path d="M19.5 14L22.3275 13.1965M29.8148 12.3207L34.57 13.0159L34.5745 13.322L29.9753 12.8286L29.8148 12.3207Z" stroke="#636363" strokeWidth="0.5"/>
                  <rect x="13.5859" y="16.368" width="0.204063" height="0.510158" transform="rotate(-9.96887 13.5859 16.368)" fill="#636363" stroke="#636363" strokeWidth="0.204063"/>
                </svg>
                <div className="logo-text">
                  <span className='text-up'>
                    <a href="#">
                      Transforming Ideas into Digital Success
                    </a>
                  </span>
                  <span className='text-down'>
                    <a href="#">
                      drazic webdev
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="menu">
                <svg onClick={() => setShowMenu((prev) => !prev)} width={24} height={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                {
                  showMenu &&
                  <nav className='nav-list'>
                    <ul>
                      <li><a href="#services">Services</a></li>
                      <li><a href="#projects">Projects</a></li>
                      <li><a href="#testimonials">Testimonials</a></li>
                      <li><a href="#contact">Contact</a></li>
                      {
                        !isLoggedIn ?
                        <li>
                          <a href="#" onClick={() => setShowLogin(true)}>Log in</a>
                        </li>
                        :
                        <li>
                          <a href="#" onClick={handleLogout}>Logout</a>
                        </li>
                      }
                    </ul>
                  </nav>
                }
              </div>
            </div>
          </div>
        </div>
      </header>
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
                  <a>contact me</a>
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
                <h2>Services</h2>
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
                  <h2>Projects</h2>
                  <hr />
                  <p>Explore our work to see how we've helped our clients achieve their goals through our expertise in development and design. From cutting-edge web applications and innovative mobile apps to dynamic e-commerce solutions and stunning designs.</p>
                </div>
              </div>
              <div className="column nav-project">
                <nav>
                  <ul>
                  <li onClick={() => handleCategoryChange('all')} className={selectedCategory === 'all' ? 'active' : ''}>All Projects</li>
                    <li onClick={() => handleCategoryChange('Web app')} className={selectedCategory === 'Web app' ? 'active' : ''}>Web App</li>
                    <li onClick={() => handleCategoryChange('Mobile app')} className={selectedCategory === 'Mobile app' ? 'active' : ''}>Mobile App</li>
                    <li onClick={() => handleCategoryChange('E-commerce')} className={selectedCategory === 'E-commerce' ? 'active' : ''}>E-Commerce</li>
                  </ul>
                </nav>
              </div>
            </div>
            <ProjectCarousel selectedCategory={selectedCategory} />
        </div>
      </section>
      <section id='customize-projects'>
      {
        showLogin &&
        <LoginDialog onClose={() => setShowLogin(false)} handleLogin={handleSubmit} email={email} setEmail={setEmail} password={password} setPassword={setPassword} isLoading={isLoading} />
      }
      {
        isLoggedIn && user?.isAdmin &&
        <div className="container">
          <BackOffice />
        </div>
      }
      </section>
      <section id="testimonials">
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="headline">
                <h2>Testimonials</h2>
                <hr />
                <p>No matter the size of the client's business, I always give my best effort. Sometimes it's challenging, sometimes it's easier, but I always strive to find the best solution for both. But don't just take my word for it, see what they say about me.</p>
                <p>
                  <small>If you were my client, contact me to leave testimonials. It would mean a lot to me. Thank you!</small>
                </p>
              </div>
            </div>
          </div>
          <TestimonialCarousel />
        </div>
      </section>
      {
        isLoggedIn && user &&
        <section id="customize-testimonials">
            <div className="container">
              <BackOfficeClient />
            </div>
        </section>
      }
      <section id='contact'>
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="headline">
                <h2>Get in Touch</h2>
                <hr />
                <h3>Ready to Get Started?</h3>
              </div>
            </div>
          </div>
          <div className="form-row row">
            <div className="column">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div id='thank-you-card'>
          <div className="wrapper">
            <FooterAnimation />
            <div className="caption">
              <span>Thank you for caming</span>
            </div>
          </div>
        </div>
        <div className="footer-links">
          <div className="container">
            <div className="wrapper">
              <div className="copyright">
              {'Copyright © '}{new Date().getFullYear()}. <a href="#hero">drazic webdev</a>
              </div>
              <nav className='nav-list'>
                <ul>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#testimonials">Testimonials</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App;
