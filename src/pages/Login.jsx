import React,{useState, useContext} from 'react';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';


const Login = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);
  const [data, setData] = useState({
    email:'',
    password:''
  });
  
 const loginUser = async (e)=>{
  e.preventDefault();

  const {email, password} = data;
  try{
    const {data} = await axios.post('https://mernback-a2n5.onrender.com/api/v1/users/login', {email, password});
    if(data.error){
      toast.error(data.error)
    } else{
      localStorage.setItem('jwt', data.token);
      setUser(data)
      toast.success('Login Successful.. Welcome!')
      navigate('/')
    }
  } catch(error){
    toast.error(error.response.data.message);
  } 
 };
 
 
  return (
    <>
      <main className='main'>
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
          <form className="form form--login" onSubmit={loginUser}>
            <div className="form__group">
              <label className="form__label">Email address</label>
              <input
                className="form__input"
                type="email"
                placeholder="you@example.com"
                required value={data.email} onChange={(e)=> setData({...data, email: e.target.value})}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label">Password</label>
              <input
                className="form__input"
                type="password"
                placeholder="••••••••"
                required
                minLength="8" value={data.password} onChange={(e)=> setData({...data, password: e.target.value})}
              />
            </div>
            <div className="form__group">
              <button className="btn btn--green">Login</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;

