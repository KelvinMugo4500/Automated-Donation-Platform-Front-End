import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
    <div className="landingPage">
      <header className="landingPage__hero">
        <img 
          src='https://th.bing.com/th/id/OIP.e9xjV68wpSJXcQKRzsEXNgHaE0?w=285&h=185&c=7&r=0&o=5&dpr=1.5&pid=1.7' 
          alt='Hero' 
          className='landingPage__heroImage' 
        />
        <div className="landingPage__heroOverlay">
          <h1 className="landingPage__heroTitle">
            Help us provide sanitary towels, clean water, and sanitation facilities to school-going girls
          </h1>
          <div className="landingPage__donationForm">
            <div className="landingPage__formGroup">
              <label htmlFor="donation-type" className="landingPage__formLabel">Donation Type</label>
              <div className="landingPage__donationTypeButtons">
                <button className="landingPage__donationTypeButton">Once</button>
                <button className="landingPage__donationTypeButton">Monthly</button>
              </div>
            </div>
            <div className="landingPage__formGroup">
              <label htmlFor="donation-amount" className="landingPage__formLabel">Amount</label>
              <input 
                type="number" 
                id="donation-amount" 
                placeholder="Enter amount" 
                className="landingPage__formInput" 
              />
            </div>
            <Link to="/donate" className="landingPage__formButton">Donate</Link>
          </div>
        </div>
      </header>

      <section className="landingPage__charities">
        <h2 className="landingPage__sectionTitle">Our Charities</h2>
        <div className="landingPage__scrollContainer">
          <button className="landingPage__arrow landingPage__arrow--left" onClick={scrollLeft}>
            &#9664;
          </button>
          <div className="landingPage__charitiesList" ref={scrollRef}>
            {charities.map((charity) => (
              <div className="landingPage__charityCard" key={charity.id}>
                <img
                  src={charity.image}
                  alt={charity.name}
                  className="landingPage__charityImage"
                />
                <h3 className="landingPage__charityName">{charity.name}</h3>
                <p className="landingPage__charityDescription">{charity.description}</p>
                <Link to={`/donate/${charity.id}`} className="landingPage__donateButton">
                  Donate
                </Link>
              </div>
            ))}
          </div>
          <button className="landingPage__arrow landingPage__arrow--right" onClick={scrollRight}>
            &#9654;
          </button>
        </div>
      </section>

      <section className="landingPage__about">
        <h2 className="landingPage__sectionTitle">About Us</h2>
        <div className="landingPage__aboutContent">
          <div className="landingPage__aboutText">
            <p>
              In many Sub-Saharan countries, school-going girls miss out on education due to lack of sanitary towels and proper sanitary facilities. 
              Our platform aims to address this issue by enabling easy and regular donations to charities working on this cause.
            </p>
          </div>
          <div className="landingPage__aboutImage">
            <img 
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_KZrd0akrx3gxDbL2Xcc9bEsJAO5Kb-btDQ&s' 
              alt='About Us' 
            />
          </div>
        </div>
        
        <div className="landingPage__beneficiaryStory">
          <h3 className="landingPage__storyTitle">Beneficiary Story</h3>
          <div className="landingPage__storyContent">
            <img 
              src="https://th.bing.com/th/id/OIP.OQ3aVAO3isrbg3-WfUo7zQAAAA?w=157&h=218&c=7&r=0&o=5&dpr=1.5&pid=1.7"
              alt="Beneficiary"
              className="landingPage__storyImage"
            />
            <div className="landingPage__storyText">
              <p>
                <strong>Meet Amina</strong>, a 14-year-old student from Kenya. Thanks to the donations from our generous supporters, Amina received the 
                sanitary towels she needed to attend school regularly. Before the donations, she often missed school due to lack of access to these 
                essential supplies. Now, she can focus on her studies and dreams of becoming a doctor one day. "I am so grateful for the support. 
                It has changed my life," says Amina.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="landingPage__contact">
        <h2 className="landingPage__sectionTitle">Contact Us</h2>
        <form className="landingPage__contactForm">
          <div className="landingPage__formGroup">
            <label htmlFor="name" className="landingPage__formLabel">Name</label>
            <input type="text" id="name" name="name" required className="landingPage__formInput" />
          </div>
          <div className="landingPage__formGroup">
            <label htmlFor="email" className="landingPage__formLabel">Email</label>
            <input type="email" id="email" name="email" required className="landingPage__formInput" />
          </div>
          <div className="landingPage__formGroup">
            <label htmlFor="message" className="landingPage__formLabel">Message</label>
            <textarea id="message" name="message" rows="4" required className="landingPage__formTextarea"></textarea>
          </div>
          <button type="submit" className="landingPage__formButton">Send Message</button>
        </form>
        <div className="landingPage__subscription">
          <h3 className="landingPage__subscriptionTitle">Subscribe to Our Newsletter</h3>
          <form className="landingPage__subscriptionForm">
            <input type="email" placeholder="Enter your email" required className="landingPage__subscriptionInput" />
            <button type="submit" className="landingPage__subscriptionButton">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
