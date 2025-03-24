import React from 'react';
import '../../src/index.css';
import PropTypes from 'prop-types';

const HeroSection = () => {
  return (
    <div>

      <section className="pt-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 d-flex flex-column justify-content-center">
              <h1 className="display-4 font-weight-bold text-dark">Hey 👋 I am Vivek Chand Kumar</h1>
              <p className="mt-3 text-muted">We are a team of six dedicated professionals providing cutting-edge tech solutions tailored to your needs. Our expertise spans a range of technical services designed to streamline operations, solve complex challenges, and drive innovation.</p>
              <div className="mt-4">
                <a
                  href="#"
                  title=""
                  className="btn"
                  role="button"
                  style={{ backgroundColor: 'teal', color: 'white' }}
                >
                  Read Exclusive Blog
                </a>
              </div>
            </div>


            <div className="col-lg-5 d-flex justify-content-center">
              <img className="img-fluid" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/1/author.png" alt="" />
            </div>


            <div className="col-lg-3 d-flex flex-column justify-content-end">
              <p className="text-uppercase font-weight-bold text-muted">⚡️ Latest Picks</p>

              <div className="mt-3">
                <div className="d-flex align-items-center mb-3">
                  <img className="rounded mr-3" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/1/thumbnail-1.png" alt="" />
                  <p className="mb-0 font-weight-bold text-dark">
                    <a href="#" title="">
                      How a visual
                    </a>
                  </p>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <img className="rounded mr-3" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/1/thumbnail-2.png" alt="" />
                  <p className="mb-0 font-weight-bold text-dark">
                    <a href="#" title="">
                      How a visual artist redefines success in graphic design
                      <span className="sr-only">(current)</span>
                    </a>
                  </p>
                </div>

                <div className="d-flex align-items-center">
                  <img className="rounded mr-3" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/1/thumbnail-3.png" alt="" />
                  <p className="mb-0 font-weight-bold text-dark">
                    <a href="#" title="">
                      How a visual artist redefines success in graphic design
                      <span className="sr-only">(current)</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>

            </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
