import React, { useEffect, useState } from 'react'
import Slider from "react-slick"
import { getProjects } from '../utils/api/projects'

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

export default function ProjectCarousel({ selectedCategory }) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      const response = await getProjects();
      setProjects(response);
      setFilteredProjects(response);
    };

    fetchAllProjects();
  }, []);

  useEffect(() => {
    filterProjects(selectedCategory);
  }, [selectedCategory]);

  const filterProjects = (category) => {
    if (category === 'all') {
      setFilteredProjects(projects); // Show all projects
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
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
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };
console.log(filteredProjects);

  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {
          filteredProjects?.length === 0 ?
          <div className={`slider-card grey no-image`}>
            <div className="slider-card__card-media">
              <div className="project-image">
                <img src='https://drazic-webdev.vercel.app/no-category.jpg' alt='no image' />
              </div>
            </div>
            <div className="slider-card__card-content">
              <h3></h3>
              <h4><small></small></h4>
              <p className="card-description">
                
              </p>
            </div>
            <div className="slider-card__card-actions">
              <a className="link-preview" href="#" target="_blank">
                <button className="btn-preview">Live Preview</button>
              </a>
              <a className='link-view-code' href="#" target="_blank">
                <button className="btn-view-code">GitHub Code</button>
              </a>
            </div>
          </div>
            :
          filteredProjects?.map((project, i) => (
            <div className={`slider-card ${project?.color}`} key={project._id}>
              <div className="slider-card__card-media">
                <div className="logo">
                  <img src={project?.logo_url} alt="Project Logo" />
                </div>
                <div className="project-image">
                  <img src={project?.image_url} alt={project?.title} />
                </div>
              </div>
              <div className="slider-card__card-content">
                <h3>{project.title}</h3>
                <h4><small>{project.category}</small></h4>
                <p className="card-description">
                  {project.description}
                </p>
              </div>
              <div className="slider-card__card-actions">
                <a className="link-preview" href={project?.live_preview_url} target="_blank">
                  <button className="btn-preview">Live Preview</button>
                </a>
                <a className='link-view-code' href={project?.github_url} target="_blank">
                  <button className="btn-view-code">GitHub Code</button>
                </a>
              </div>
            </div>
          ))
        }
      </Slider>
    </div>
  )
}
