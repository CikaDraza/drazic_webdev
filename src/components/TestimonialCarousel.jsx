import React, { useEffect, useState } from 'react'
import Slider from "react-slick"
import { getTestimonials } from '../utils/api/testimonials'
import TestimonialsIcon from '../assets/icons/TestimonialsIcon';

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    >
      {/* Custom Content */}
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f4f4f4" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    >
      {/* Custom Content */}
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f4f4f4" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
    </div>
  );
};

const ReadOnlyRating = ({ rating }) => {  
  return (
    <div className='rating'>
      <span className='stars' style={{ width: `${(rating / 5) * 100}%` }}>
        {Number(rating).toFixed(1)}
      </span>
    </div>
  );
}

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchAllTestimonials = async () => {
      const response = await getTestimonials();
      setTestimonials(response);
    };

    fetchAllTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    customPaging: i => (
      <div
        className='dot'
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: '#444',
          borderRadius: '50%',
          cursor: 'pointer',
          margin: '0 .25rem'
        }}
      >
        {''}
      </div>
    ),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  
  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {
          testimonials?.map((testimonial, i) => (
            <div className='slider-testimonial-card' key={testimonial._id}>
              <div className="slider-testimonial-card__card-content">
                <div className="testimonials-icon">
                  <TestimonialsIcon />
                </div>
                <ReadOnlyRating rating={testimonial?.rating} />
                <p className='card-text'>{testimonial?.text}</p>
                <h3 className='card-client-name'>{testimonial.client_name}</h3>
                <h4 className="card-client-title">
                  {testimonial.client_title}
                </h4>
              </div>
              <div className="slider-testimonial-card__card-media">
                <div className="testimonial-image" style={{backgroundImage: `url(${testimonial?.image_url})`}}>
                </div>
              </div>
            </div>
          ))
        }
      </Slider>
    </div>
  )
}
