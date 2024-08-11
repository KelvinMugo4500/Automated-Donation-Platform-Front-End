import React, { useState, useEffect, useRef } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  const [charities, setCharities] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Fetch charities from your local server
    fetch("/charities")
      .then((response) => response.json())
      .then((data) => setCharities(data))
      .catch((error) => console.error("Error fetching charities:", error));
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300, // Adjust this value based on the width of your cards
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300, // Adjust this value based on the width of your cards
      behavior: "smooth",
    });
  };

  return (
    <div className="landing-page">
      <header className="hero-section">
        <h1>Welcome to the Automated Donation Platform</h1>
      </header>

      <section className="about-section">
        <h2>About Us</h2>
        <p>
          Our platform is dedicated to supporting school-going girls in
          Sub-Saharan Africa by providing sanitary towels, clean water, and
          sanitation facilities. We partner with trusted charities to ensure
          that your donations make a real difference in the lives of these young
          girls, helping them stay in school and achieve their dreams.
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
                lack of access to these essential supplies. Now, she can focus
                on her studies and dreams of becoming a doctor one day. "I am so
                grateful for the support. It has changed my life," says Amina.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="charities-section">
        <h2>Our Charities</h2>
        <div className="scroll-container">
          <button className="arrow left" onClick={scrollLeft}>
            &#9664;
          </button>
          <div className="charities-list" ref={scrollRef}>
            {charities.map((charity) => (
              <div className="charity-card" key={charity.id}>
                <img
                  src={charity.image_url}
                  alt={charity.name}
                  className="charity-image"
                />
                <h3>{charity.name}</h3>
                <p>{charity.description}</p>
                <a href={`/donate/${charity.id}`} className="donate-button">
                  Donate
                </a>
              </div>
            ))}
          </div>
          <button className="arrow right" onClick={scrollRight}>
            &#9654;
          </button>
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
};

export default LandingPage;
