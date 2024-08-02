// src/components/LandingPage.js
import React from 'react';
import WorldMap from './WorldMap';
import './LandingPage.css';

const LandingPage = () => (
  <div className='landing-page'>
    <header className='hero-section'>
      <img 
        src='https://th.bing.com/th/id/OIP.e9xjV68wpSJXcQKRzsEXNgHaE0?w=285&h=185&c=7&r=0&o=5&dpr=1.5&pid=1.7' 
        alt='Hero' 
        className='hero-image' 
      />
      <div className='hero-overlay'>
        <h1>Help us provide sanitary towels, clean water, and sanitation facilities to school-going girls</h1>
        <div className='donation-form'>
          <div className='form-group'>
            <label htmlFor='donation-type'>Donation Type</label>
            <select id='donation-type'>
              <option value='once'>Once</option>
              <option value='monthly'>Monthly</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='donation-amount'>Amount</label>
            <input type='number' id='donation-amount' placeholder='Enter amount' />
          </div>
          <button type='submit'>Donate</button>
        </div>
      </div>
    </header>
    
    <section className='charities-section'>
      <h2>Our Charities</h2>
      <div className='charities-list'>
        <div className='charity-card'>
          <img 
            src='https://images.unsplash.com/photo-1504384308090-c894fdcc538d' 
            alt='Save the Children' 
            className='charity-image' 
          />
          <h3>Save the Children</h3>
          <p>Save the Children provides education and emergency aid to children in need around the world, including school-going girls in Sub-Saharan Africa.</p>
          <a href='/donate' className='donate-button'>Donate</a>
        </div>
        <div className='charity-card'>
          <img 
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmB01XeoEwG6S3ekPfHxBoq2n0YsLRKCJslA&s' 
            alt='Plan International' 
            className='charity-image' 
          />
          <h3>Plan International</h3>
          <p>Plan International focuses on advancing children's rights and equality for girls, with programs in Sub-Saharan Africa to support education and health.</p>
          <a href='/donate' className='donate-button'>Donate</a>
        </div>
        <div className='charity-card'>
          <img 
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnNoMNAJXsi-Z1GFofWGkl0OUu_mwdfIdUwQ&s' 
            alt='Girls Not Brides' 
            className='charity-image' 
          />
          <h3>Girls Not Brides</h3>
          <p>Girls Not Brides is dedicated to ending child marriage and supporting girls' education in Sub-Saharan Africa through advocacy and direct support.</p>
          <a href='/donate' className='donate-button'>Donate</a>
        </div>
      </div>
    </section>
    
    <section className='about-section'>
      <h2>About Us</h2>
      <div className='about-content'>
        <div className='about-text'>
          <p>In many Sub-Saharan countries, school-going girls miss out on education due to lack of sanitary towels and lack of proper sanitary facilities. Our platform aims to address this issue by enabling easy and regular donations to charities working on this cause.</p>
        </div>
        <div className='about-image'>
          <img 
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_KZrd0akrx3gxDbL2Xcc9bEsJAO5Kb-btDQ&s' 
            alt='About Us' 
          />
        </div>
      </div>
      
      <div className='beneficiary-story'>
        <h3>Beneficiary Story</h3>
        <div className='story-content'>
          <img 
            src='https://th.bing.com/th/id/OIP.OQ3aVAO3isrbg3-WfUo7zQAAAA?w=157&h=218&c=7&r=0&o=5&dpr=1.5&pid=1.7' 
            alt='Beneficiary' 
            className='story-image' 
          />
          <div className='story-text'>
            <p><strong>Meet Amina</strong>, a 14-year-old student from Kenya. Thanks to the donations from our generous supporters, Amina received the sanitary towels she needed to attend school regularly. Before the donations, she often missed school due to lack of access to these essential supplies. Now, she can focus on her studies and dreams of becoming a doctor one day. "I am so grateful for the support. It has changed my life," says Amina.</p>
          </div>
        </div>
      </div>
    </section>

    <section className='world-map-section'>
      <h2>Donation Impact</h2>
      <WorldMap />
    </section>
    
    <section className='contact-section'>
      <h2>Contact Us</h2>
      <div className='contact-info'>
        <h3>Get in Touch</h3>
        <ul>
          <li><strong>Phone:</strong> +123 456 7890</li>
          <li><strong>Email:</strong> <a href='mailto:automateddonation@gmail.com'>automateddonation@gmail.com</a></li>
        </ul>
        <div className='social-links'>
          <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
            <img src='https://cdn-icons-png.flaticon.com/128/733/733547.png' alt='Facebook' className='social-icon' />
          </a>
          <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
            <img src='https://cdn-icons-png.flaticon.com/128/733/733579.png' alt='Twitter' className='social-icon' />
          </a>
          <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
            <img src='https://cdn-icons-png.flaticon.com/128/733/733558.png' alt='Instagram' className='social-icon' />
          </a>
          <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
            <img src='https://cdn-icons-png.flaticon.com/128/733/733561.png' alt='LinkedIn' className='social-icon' />
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default LandingPage;
