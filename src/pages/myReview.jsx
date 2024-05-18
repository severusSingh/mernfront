import React, { useEffect, useState, useContext } from 'react';
import ReviewCard from '../components/ReviewCard';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const MyReview = () => {
  const [tours, setTours] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('https://mernback-a2n5.onrender.com/api/v1/reviews/my-review', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });
        setTours(response.data.data);
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
          {tours.map(tour =>  <ReviewCard key={tour.id} review={tour}/>)}
        </div>
      ) : (
        <h2>No Review Found</h2>
      )}
    </main>
  );
}

export default MyReview;
