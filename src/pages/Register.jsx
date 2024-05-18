import React, {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name:'',
    email:'',
    password:'',
    passwordConfirm:''
  });
  
 const registerUser = async (e)=>{
  e.preventDefault();

  const {name, email, password, passwordConfirm} = data;
  try{
    const {data} = await axios.post('https://mernback-a2n5.onrender.com/api/v1/users/signup', {name, email, password, passwordConfirm});
    if(data.error){
      toast.error(data.error)
    } else{
      setData({})
      toast.success('SignUp Successful...')
      navigate('/login')
    }
  } catch(error){
    console.log(error);
  }
 }; 

  return (
    <>
      <main className='main'>
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Create your account</h2>
          <form className="form form--login" onSubmit={registerUser}>
            <div className="form__group">
            <label className="form__label">Name</label>
              <input
                className="form__input"
                type="text"
                placeholder="Ankit Singh"
                required value={data.name} onChange={(e)=> setData({...data, name: e.target.value})}/>
            </div>
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
            <div className="form__group ma-bt-md">
              <label className="form__label">Password Confirm</label>
              <input
                className="form__input"
                type="password"
                placeholder="••••••••"
                required
                minLength="8" value={data.passwordConfirm} onChange={(e)=> setData({...data, passwordConfirm: e.target.value})}
              />
            </div>
            <div className="form__group">
              <button className="btn btn--green">Sign Up</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};



export default Register;
