# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<!-- 

I have section projects with carousel and filter like nav. All projects, e-commerce, web app, mobile app.

<div className='slider-container'>
      <Slider {...settings}>
        {
          projects?.map((project, i) => (
            <div className={`slider-card bg-card-${i % 4}`} key={project.id}>
              <div className="slider-card__card-media">
                <div className="logo">
                  <img width={'auto'} height={'50px'} src={`/project_logo-${i % 2}.svg`} alt="alt" />
                </div>
                <div className="project-image">
                  <img width={'auto'} height={'100%'} src={`/project_image-${i % 2}.png`} alt="alt" />
                </div>
              </div>
              <div className="slider-card__card-content">
                <h3>{project.title}</h3>
                <p className="card-description">
                  {project.description}
                </p>
              </div>
              <div className="slider-card__card-actions">
                <a href="#">
                  <button className="btn-preview">Live Preview</button>
                </a>
                <a href="#">
                  <button className="btn-view-code">GitHub Code</button>
                </a>
              </div>
            </div>
          ))
        }
      </Slider>
    </div>

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

 -->