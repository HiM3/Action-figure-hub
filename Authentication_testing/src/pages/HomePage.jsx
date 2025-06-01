import React from "react";
import { Link } from "react-router-dom";
import "../assets/style.css"; // Use custom style.css

const sliderImages = [
  {
    src: "https://static.vecteezy.com/system/resources/previews/035/013/491/non_2x/ai-generated-beautiful-christmas-balls-and-toys-on-green-background-banner-with-text-space-free-photo.jpg",
    caption: "Discover Rare & Exclusive Figures",
  },
  {
    src: "https://media.istockphoto.com/id/475636376/photo/strong-woman.jpg?s=612x612&w=0&k=20&c=S5OFJml2GlMje1WPP16FOtG_weEMNjk4XsAWOBurbZY=",
    caption: "Join a Passionate Collector Community",
  },
  {
    src: "https://blog-asset.jakartanotebook.com/blog/content/images/2019/09/shutterstock_msrvel.jpg",
    caption: "Showcase Your Unique Collection",
  },
];

const HomePage = () => {
  return (
    <>
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="homepage-section hero-section">
        <div className="homepage-container">
          <div className="hero-row">
            <div className="hero-col text-content">
              <h1 className="section-heading display-4-custom fw-bold-custom mb-3-custom">
                Welcome to{" "}
                <span className="primary-text-color">Action Figure World</span>
              </h1>
              <p className="lead-paragraph mb-4-custom">
                Discover, collect, and showcase your favorite action figures
                from around the globe. Join a passionate community of collectors
                and enthusiasts!
              </p>
              <div className="button-group">
                <Link to="/action-figures" className="btn-custom btn-primary-custom btn-lg-custom me-3-custom mb-2-custom">
                  View Figures
                </Link>
                <Link to="/create-action-figure" className="btn-custom btn-outline-primary-custom btn-lg-custom mb-2-custom">
                  Add New Figure
                </Link>
              </div>
            </div>

            <div className="hero-col carousel-col">
              {/* Basic image display for now, replace with custom carousel later if needed */}
              {sliderImages[0] && (
                <img
                  className="hero-image rounded-custom shadow-custom"
                  src={sliderImages[0].src}
                  alt="Hero Image"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="homepage-section features-section py-5-custom">
        <div className="homepage-container">
          <h2 className="section-heading text-center mb-5-custom fw-bold-custom primary-text-color">
            Why Choose Action Figure World?
          </h2>
          <div className="features-row text-center">
            <div className="feature-col mb-4-custom">
              <div className="card-style h-100-custom shadow-sm-custom">
                <img
                  className="card-image-top-custom"
                  src="https://esquiresg.s3.ap-southeast-2.amazonaws.com/wp-content/uploads/2024/04/obsessed-much-jeffrey-koh-toy-collector-esquire-singapore-esquiresg-001.jpg"
                  alt="Extensive Collection"
                />
                <div className="card-body-custom">
                  <h5 className="card-title-custom text-info-custom">
                    Extensive Collection
                  </h5>
                  <p className="card-text-custom">
                    Browse thousands of action figures from various franchises
                    and eras.
                  </p>
                </div>
              </div>
            </div>

            <div className="feature-col mb-4-custom">
              <div className="card-style h-100-custom shadow-sm-custom">
                <img
                  className="card-image-top-custom"
                  src="https://tamashiiweb.com/img/tn_blog/20241226_cM9LiGdQ/s9EKRyCu_banner01.jpg"
                  alt="Add & Manage Figures"
                />
                <div className="card-body-custom">
                  <h5 className="card-title-custom text-info-custom">
                    Add & Manage Figures
                  </h5>
                  <p className="card-text-custom">
                    Easily add new figures to your collection and edit details
                    anytime.
                  </p>
                </div>
              </div>
            </div>

            <div className="feature-col mb-4-custom">
              <div className="card-style h-100-custom shadow-sm-custom">
                <img
                  className="card-image-top-custom"
                  src="https://cdn.affilorama.com/img/content/posts/1145.4aa4de2a151beb751a0aef1d15899a12_y:736.webp?10061"
                  alt="Community Driven"
                />
                <div className="card-body-custom">
                  <h5 className="card-title-custom text-info-custom">
                    Community Driven
                  </h5>
                  <p className="card-text-custom">
                    Connect with collectors worldwide and share your passion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Figures */}
      <section className="homepage-section trending-section py-5-custom dark-bg-section text-white">
        <div className="homepage-container">
          <h2 className="section-heading text-center mb-5-custom fw-bold-custom warning-text-color">
            Trending Action Figures
          </h2>
          {/* Basic image display for now */}
          {sliderImages[1] && (
            <img
              className="trending-image rounded-custom"
              src={sliderImages[1].src}
              alt="Trending Figure"
            />
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="homepage-section testimonials-section py-5-custom light-bg-section">
        <div className="homepage-container">
          <h2 className="section-heading text-center mb-5-custom fw-bold-custom primary-text-color">
            What Our Collectors Say
          </h2>
          <div className="testimonials-row text-center">
            <div className="testimonial-col mb-4-custom">
              <blockquote className="blockquote-custom">
                <p className="blockquote-text-custom">
                  "Absolutely love the detail on these figures! Fast delivery
                  too."
                </p>
                <footer className="blockquote-footer-custom">Alex, USA</footer>
              </blockquote>
            </div>
            <div className="testimonial-col mb-4-custom">
              <blockquote className="blockquote-custom">
                <p className="blockquote-text-custom">
                  "The best place to manage and grow my collection online!"
                </p>
                <footer className="blockquote-footer-custom">Ravi, India</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Collector Spotlight */}
      <section className="homepage-section spotlight-section bg-light-custom py-5-custom">
        <div className="homepage-container">
          <h2 className="section-heading text-center mb-5-custom fw-bold-custom">
            Collector Spotlight
          </h2>
          <div className="spotlight-row justify-content-center-custom">
            <div className="spotlight-col">
              <img
                src="https://toytales.ca/wp-content/uploads/2021/11/collector-spotlight-Trey-DuBose.png"
                alt="Spotlight"
                className="spotlight-image img-fluid-custom rounded-custom shadow-custom mx-auto-custom d-block-custom mb-4-custom"
              />
              <blockquote className="blockquote-custom text-center">
                <p className="blockquote-text-custom mb-4-custom fst-italic-custom">
                  "Action Figure World helped me organize my entire collection
                  and connect with fellow fans. It's truly the best platform for
                  enthusiasts!"
                </p>
                <footer className="blockquote-footer-custom">
                  Alex M., Collector & Hobbyist
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="homepage-section newsletter-section py-5-custom">
        <div className="homepage-container newsletter-container card-style">
          <h2 className="section-heading text-center mb-4-custom primary-text-color">
            Stay Updated!
          </h2>
          <p className="text-center mb-4-custom secondary-text-color">
            Subscribe to our newsletter for the latest arrivals and collector
            news.
          </p>
          <form className="newsletter-form">
            <div className="form-group-custom">
              <input
                type="email"
                className="form-input-custom form-input-lg-custom"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="button-group-custom text-center">
              <button
                type="submit"
                className="btn-custom btn-success-custom btn-lg-custom"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default HomePage;
