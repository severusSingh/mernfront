import React, { useEffect, useState, useContext } from 'react';
import ToursItems from '../components/ToursItems';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const Booking = () => {
  const [tours, setTours] = useState([]);
  const [bookingFound, setBookingFound] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('https://mernback-a2n5.onrender.com/api/v1/bookings/my-tours', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });
        setTours(response.data.data);
        setBookingFound(response.data.data.length > 0);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTours();
  }, [user]);

  return (
    <main className='main'>
      {tours && tours.length > 0 ? (
        <div className="card-container">
          {tours.map(tour => <ToursItems key={tour.id} tour={tour} bookingFound={bookingFound} />)}
        </div>
      ) : (
        <h2>No Booking Found</h2>
      )}
    </main>
  );
}

export default Booking;
