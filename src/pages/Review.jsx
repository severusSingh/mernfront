import React, {useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';


const Review = () => {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  const { id } = useParams();
  const [data, setData] = useState({
   review:'',
   rating:''
  });
  
 const reviewUser = async (e)=>{
  e.preventDefault();

  const {review, rating} = data;
  try{
    const {data} = await axios.post(`https://mernback-a2n5.onrender.com/api/v1/tours/${id}/reviews`, {review, rating}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });
    if(data.error){
      toast.error(data.error)
    } else{
      setData({})
      toast.success('Review Uploaded Successful...')
      navigate('/')
    }
  } catch(error){
    console.log(error);
  }
 }; 

  return (
    <>
      <main className='main'>
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Create your Review</h2>
          <form className="form form--login" onSubmit={reviewUser}>
            <div className="form__group">
                <label className="form__label">Review</label>
                    <input
                        className="form__input"
                        type="text"
                        placeholder="Your Review"
                        required value={data.review} onChange={(e)=> setData({...data, review: e.target.value})}/>
            </div>
            <div className="form__group">
                <label className="form__label">Rating</label>
                    <input
                        className="form__input"
                        type="text"
                        placeholder="1 2 3 4 5"
                        required value={data.rating} onChange={(e)=> setData({...data, rating: e.target.value})}/>
            </div>
            <div className="form__group">
              <button className="btn btn--green">Submit</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};



export default Review;
