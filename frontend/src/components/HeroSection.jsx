import React from 'react';

const HeroSection = () => {
  return (
    <section className="py-lg-16 py-8">
      {/* container */}
      <div className="container">
        {/* row */}
        <div className="row align-items-center">
          {/* col */}
          <div className="col-lg-6 mb-6 mb-lg-0">
            <div>
              {/* heading */}
              <h5 className="text-dark mb-4">
                <i className="fe fe-check icon-xxs icon-shape bg-light-success text-success rounded-circle me-2"></i>
                Most trusted education platform
              </h5>
              {/* heading */}
              <h1 className="display-3 fw-bold mb-3">Grow your skills and advance career</h1>
              {/* para */}
              <p className="pe-lg-10 mb-5">
                Start, switch, or advance your career with more than 500 Tests, Professional
                Certificates, and degrees from world-class universities and companies.
              </p>
              {/* btn */}
              <a href="/tests" className="btn btn-primary">Start Test</a>
              <a href="" className="glightbox fs-4 text-inherit ms-3">
                <img src="../assets/images/svg/play-btn.svg" alt="" className="me-2" />
                Watch Demo
              </a>
            </div>
          </div>
          {/* col */}
          <div className="col-lg-6 d-flex justify-content-center">
            {/* images */}
            <div className="position-relative">
              <img src="../assets/images/background/acedamy-img/bg-thumb.svg" alt="" />
              <img src="../assets/images/background/acedamy-img/girl-image.png" alt="" className="position-absolute end-0 bottom-0" />
              <img src="../assets/images/background/acedamy-img/frame-1.svg" alt="" className="position-absolute top-0 ms-lg-n10 ms-n19" />
              <img src="../assets/images/background/acedamy-img/frame-2.svg" alt="" className="position-absolute bottom-0 start-0 ms-lg-n14 ms-n6 mb-n7" />
              <img src="../assets/images/background/acedamy-img/target.svg" alt="" className="position-absolute bottom-0 mb-8 ms-n10 ms-lg-n1" />
              <img src="../assets/images/background/acedamy-img/sound.svg" alt="" className="position-absolute top-0 start-0 mt-18 ms-lg-n19 ms-n8" />
              <img src="../assets/images/background/acedamy-img/trophy.svg" alt="" className="position-absolute top-0 start-0 ms-lg-n14 ms-n5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
