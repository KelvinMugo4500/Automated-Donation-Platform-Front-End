import React, { useState, useEffect } from 'react';
import './DonatePage.css';

const PayPalButton = () => {
  const [donationType, setDonationType] = useState('one-time'); // State to track donation type

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AfV3YhJ3nhm2cbjnYxqHiTjs74G5Vlhl67hze4O7OCVpkYuT07mFFLKB_bNS754c7IOyKAufcLRhTKdr&currency=USD`;
    script.async = true;
    script.onload = () => {
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          const purchaseUnit = {
            amount: {
              value: '1000' // Amount to charge
            }
          };

          // Add the subscription plan if the user selected 'monthly'
          if (donationType === 'monthly') {
            purchaseUnit.amount.breakdown = {
              item_total: { currency_code: 'USD', value: '1000' }
            };
          }

          return actions.order.create({
            purchase_units: [purchaseUnit]
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        },
        onError: function (err) {
          console.error('An error occurred during the transaction:', err);
        }
      }).render('#paypal-button-container');
    };
    document.body.appendChild(script);
  }, [donationType]);

  return (
    <div className="donate-page">
      <h2>PayPal Payment Integration</h2>
      <div className="donation-type-buttons">
        <button
          className={`donation-type-button ${donationType === 'one-time' ? 'active' : ''}`}
          onClick={() => setDonationType('one-time')}
        >
          One-Time Donation
        </button>
        <button
          className={`donation-type-button ${donationType === 'monthly' ? 'active' : ''}`}
          onClick={() => setDonationType('monthly')}
        >
          Monthly Donation
        </button>
      </div>
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default PayPalButton;
