// src/components/DonatePage.js
import React, { useState } from 'react';
import './DonatePage.css';

const DonatePage = ({ charity }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleDonate = (e) => {
    e.preventDefault();
    // Add logic for processing the donation based on the selected payment method
    if (paymentMethod === 'paypal') {
      // Redirect to PayPal with necessary details
      window.location.href = `https://www.paypal.com/donate?business=YOUR_PAYPAL_EMAIL&amount=${amount}`;
    } else if (paymentMethod === 'stripe') {
      // Integrate Stripe payment processing here
      console.log('Stripe payment processing...');
    }
  };

  return (
    <div className='donate-page'>
      <h2>Donate to {charity}</h2>
      <form onSubmit={handleDonate}>
        <div className='form-group'>
          <label htmlFor='amount'>Donation Amount</label>
          <input
            type='number'
            id='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='paymentMethod'>Payment Method</label>
          <select
            id='paymentMethod'
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value=''>Select a payment method</option>
            <option value='paypal'>PayPal</option>
            <option value='stripe'>Stripe</option>
          </select>
        </div>
        <button type='submit'>Donate</button>
      </form>
    </div>
  );
};

export default DonatePage;
