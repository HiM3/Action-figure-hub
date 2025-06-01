import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css"; // Remove Bootstrap CSS import
import "../assets/style.css";
import { Link } from "react-router-dom";
// import Navbar from "./Navbar";

const AboutUsPage = () => {
  return (
    <div className="about-page">
      {/* <Navbar /> */}
      <div className="about-container">
        <h1 className="section-heading">About Us</h1>

        {/* Hero Image */}
        <div className="hero-image-container">
          <img
            src="https://www.epicstuff.com/cdn/shop/collections/ANIME-BANNER-3-new-2_1920x450.jpg?v=1653630472"
            alt="Action Figure Collection"
            className="about-image"
          />
        </div>

        <p className="about-paragraph lead-paragraph">
          Welcome to <strong>Action Figure Hub</strong> — your ultimate
          destination for discovering, collecting, and celebrating action
          figures from across the universe!
        </p>
        <p className="about-paragraph lead-paragraph">
          Our mission is to bring fans, collectors, and enthusiasts together by
          offering a platform where you can explore detailed action figure data,
          manage your own collection, and stay updated with the latest
          additions.
        </p>

        {/* Core Values Section with Image */}
        <div className="core-values-section">
          <h2 className="section-heading">Our Core Values</h2>
          <div className="core-values-row">
            <div className="core-values-col">
              <ul className="values-list">
                <li className="value-item">Celebrating Pop Culture Icons</li>
                <li className="value-item">Encouraging Creative Expression</li>
                <li className="value-item">Building a Collector Community</li>
                <li className="value-item">Showcasing High-Quality Figures</li>
              </ul>
            </div>
            <div className="core-values-col text-center">
              <img
                src="https://i.ytimg.com/vi/lEzKo3I_MuU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDB-DTazGiqqwix6omn2R-J38Ynng"
                alt="Collector Community"
                className="about-image shadow-image"
              />
            </div>
          </div>
        </div>

        {/* Connect With Us */}
        <div className="contact-section">
         <h2 className="section-heading">Connect With Us</h2>
          <p className="about-paragraph">
            Have questions, feedback, or a figure suggestion? Reach out to us at:
            <a
              href="mailto:support@actionfigurehub.com"
              className="text-link primary-text"
            >
              support@actionfigurehub.com
            </a>
          </p>
        </div>

        {/* Contact Us Form */}
        <div className="contact-form-card">
          <h3 className="contact-heading">Contact Us</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for reaching out! We'll get back to you soon.");
              e.target.reset();
            }}
            className="contact-form"
          >
            <div className="form-group">
              <label htmlFor="name" className="form-label-custom">Name</label>
              <input
                type="text"
                className="form-input-custom"
                id="name"
                name="name"
                placeholder="Your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label-custom">Email</label>
              <input
                type="email"
                className="form-input-custom"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label-custom">Message</label>
              <textarea
                className="form-textarea-custom"
                id="message"
                name="message"
                rows="4"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <div className="button-group">
              <button type="submit" className="btn-custom btn-primary-custom btn-lg-custom">
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="back-home-section text-center">
          <Link to="/" className="btn-custom btn-primary-custom">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
  