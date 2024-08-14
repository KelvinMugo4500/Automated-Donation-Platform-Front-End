// src/components/LandingPage.js
import React from "react";
import "./LandingPage.css";

const LandingPage = () => (
  <div className="landing-page">
    <header className="hero-section">
      <h1>Welcome to the Automated Donation Platform</h1>
    </header>

    <section className="charities-section">
      <h2>Our Charities</h2>
      <div className="charities-list">
        <div className="charity-card">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
            alt="Save the Children"
            className="charity-image"
          />
          <h1>Save the Children</h1>
          <strong>
            Save the Children provides education and emergency aid to children
            in need around the world, including school-going girls in
            Sub-Saharan Africa.
          </strong>
          <br />
          <a href="/donate" className="donate-button">
            Donate
          </a>
        </div>
        <div className="charity-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmB01XeoEwG6S3ekPfHxBoq2n0YsLRKCJslA&s"
            alt="Plan International"
            className="charity-image"
          />
          <h1>Plan International</h1>
          <strong>
            Plan International focuses on advancing children's rights and
            equality for girls, with programs in Sub-Saharan Africa to support
            education and health.
          </strong>
          <br />
          <a href="/donate" className="donate-button">
            Donate
          </a>
        </div>
        <div className="charity-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnNoMNAJXsi-Z1GFofWGkl0OUu_mwdfIdUwQ&s"
            alt="Girls Not Brides"
            className="charity-image"
          />
          <h1>Girls Not Brides</h1>
          <strong>
            Girls Not Brides is dedicated to ending child marriage and
            supporting girls' education in Sub-Saharan Africa through advocacy
            and direct support.
          </strong>
          <br />
          <a href="/donate" className="donate-button">
            Donate
          </a>
        </div>
      </div>
    </section>

    <section className="about-section">
      <h2>About Us</h2>
      <p>
        Our platform is dedicated to supporting school-going girls in
        Sub-Saharan Africa by providing sanitary towels, clean water, and
        sanitation facilities. We partner with trusted charities to ensure that
        your donations make a real difference in the lives of these young girls,
        helping them stay in school and achieve their dreams.
      </p>

      <div className="beneficiary-story">
        <h3>Beneficiary Story</h3>
        <div className="story-content">
          <img
            src="https://th.bing.com/th/id/OIP.OQ3aVAO3isrbg3-WfUo7zQAAAA?w=157&h=218&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            alt="Beneficiary"
            className="story-image"
          />
          <div className="story-text">
            <p>
              <strong>Meet Amina</strong>, a 14-year-old student from Kenya.
              Thanks to the donations from our generous supporters, Amina
              received the sanitary towels she needed to attend school
              regularly. Before the donations, she often missed school due to
              lack of access to these essential supplies. Now, she can focus on
              her studies and dreams of becoming a doctor one day. "I am so
              grateful for the support. It has changed my life," says Amina.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="contact-section">
      <h2>Contact Us</h2>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
      <div className="subscription-section">
        <h3>Subscribe to Our Newsletter</h3>
        <form className="subscription-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  </div>
);

export default LandingPage;