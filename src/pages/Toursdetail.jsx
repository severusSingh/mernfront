import React, { useEffect, useState, useContext } from 'react';
import { Link,useParams } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import TourMap from '../components/Map';
import { loadStripe } from '@stripe/stripe-js';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51P8H2sSD82CLNdI7iLJGU9IKASrZANUQp038ZQ54OqgKpr8cR80Qj8uktOEc43kgTgxzuCtKQ6wc6aCXVVp0pzdp00sSxJ9fCJ');

const OverviewBox = ({ label, text, icon }) => (
  <div className="overview-box__detail">
    <svg className="overview-box__icon">
      <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
    </svg>
    <span className="overview-box__label">{label}</span>
    <span className="overview-box__text">{text}</span>
  </div>
);

const Toursdetail = () => {
  const [tour, setTour] = useState(null);
  const navigate = useNavigate()
  const { id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`https://mernback-a2n5.onrender.com/api/v1/tours/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTour(data.data.tour); // Adjust the data extraction logic here
      } catch (err) {
        console.log(err);
        // Handle error
      }
    };
    fetchTour();
  }, [id]);

  const handleBookTour = async () => {
    const stripe = await stripePromise;
  
    try {
      const response = await axios.get(`https://mernback-a2n5.onrender.com/api/v1/bookings/checkout-session/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });
  
      const { session } = response.data;
  
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (!result.error) {
        navigate('/')
        console.log('Booking successful!')// Add this line
      } else {
        console.error(result.error.message);
      }
    } catch (error) {
      if(error.response.data.message === 'Duplicate field value: undefined. Please use another value!'){
        toast.error('You Have Already Book this Tour!');
      }
    }
  };

  
  if (!tour) {
    // Render loading or fallback UI here
    return <div>Loading...</div>;
  }

  return (
    <> 
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img className="header__hero-img" src={`/img/tours/${tour.imageCover}`} alt={tour.name} />
        </div>
        <div className="heading-box">
          <h1 className="heading-primary"><span>{`${tour.name} tour`}</span></h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-clock" />
              </svg>
              <span className="heading-box__text">{`${tour.duration} days`}</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin" />
              </svg>
              <span className="heading-box__text">{tour.startLocation?.description}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description">
        <div className="overview-box">
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
            <OverviewBox label="Next date" text={tour.startDates[0].toLocaleString('en-us', { month: 'long', year: 'numeric' })} icon="calendar" />
            <OverviewBox label="Difficulty" text={tour.difficulty} icon="trending-up" />
            <OverviewBox label="Participants" text={`${tour.maxGroupSize} people`} icon="user" />
            <OverviewBox label="Rating" text={`${tour.ratingsAverage} / 5`} icon="star" />
          </div>
        </div>
        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">{`About ${tour.name} tour`}</h2>
          {tour.description.split('\n').map((p, index) => <p key={index} className="description__text">{p}</p>)}
        </div>
      </section>

      <section className="section-pictures">
        {tour.images.map((img, i) => (
          <div key={i} className="picture-box">
            <img className={`picture-box__img picture-box__img--${i + 1}`} src={`/img/tours/${img}`} alt={`The Park Camper Tour ${i + 1}`} />
          </div>
        ))}
      </section>

      <section className='section-map'>
        <TourMap locationData={tour.locations} mapId={'map'} />
      </section>

      <section className="section-reviews">
        <div className="reviews">
          {tour.reviews.map((review, index) => <ReviewCard key={index} review={review} />)}
        </div>
      </section>

     
      {tour && (
        <section className="section-cta">
          <div className="cta">
            {/* CTA section content */}
            <div className="cta__img cta__img--logo">
              <img src="/img/logo-white.png" alt="Natours logo" />
            </div>
            <img src={`/img/tours/${tour.images[1]}`} alt="Tourpicture" className="cta__img cta__img--1" />
            <img src={`/img/tours/${tour.images[2]}`} alt="Tourpicture" className="cta__img cta__img--2" />
            <div className="cta__content">
              <h2 className="heading-secondary">What are you waiting for?</h2>
              <p className="cta__text">{`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}</p>
              {user ? (
                  <button className="btn btn--green span-all-rows" onClick={handleBookTour}>Book tour now!</button>
                   ) : (
                <Link to='/login' className="btn btn--green span-all-rows">Log in to Book Tour!</Link>
                )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Toursdetail;
