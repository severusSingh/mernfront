import React, { useEffect, useState } from 'react';
import ToursItems from './ToursItems';
import axios from 'axios';

const Tours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('https://mernback-a2n5.onrender.com/api/v1/tours');
        setTours(response.data.data.tours); // Accessing the 'tours' array directly
      } catch (err) {
        console.log(err);
      }
    };
    fetchTours();
  }, []);

  return (
    <main className='main'>
      {tours && tours.length > 0 ? (
        <div className="card-container">
          {tours.map(tour => <ToursItems key={tour.id} tour={tour} />)}
        </div>
      ) : (
        <h2>Loading...</h2> // Or any other loading indicator
      )}
    </main>
  );
  
}

export default Tours;
