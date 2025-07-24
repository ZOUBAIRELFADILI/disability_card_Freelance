import React from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import CardShowcase from '../components/CardShowcase';
import ServicesOverview from '../components/ServicesOverview';
import ApplicationProcess from '../components/ApplicationProcess';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const Home = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const paymentStatus = urlParams.get('payment');
  const sessionId = urlParams.get('session_id');

  // Show success message if payment was successful
  React.useEffect(() => {
    if (paymentStatus === 'success' && sessionId) {
      // You could fetch session details here if needed
      alert('Payment successful! Your application has been submitted and will be processed within 48 hours.');
    }
  }, [paymentStatus, sessionId]);

  return (
    <div>
      <Hero />
      <CardShowcase />
      <ServicesOverview />
      <ApplicationProcess />
      <Stats />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;