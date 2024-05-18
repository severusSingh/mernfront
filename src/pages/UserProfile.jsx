import React, { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios'; // Import Axios for making HTTP requests
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';

function UserProfile() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [name, setName] = useState(user.data?.name);
  const [email, setEmail] = useState(user.data?.email);
  const [passwordCurrent, setCurrentPassword] = useState('');
  const [password, setNewPassword] = useState('');
  const [passwordConfirm, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState('');

  const handleUpdateUserData = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = {
        name,
        email,
      };
      
      const response = await axios.patch(
        'https://mernback-a2n5.onrender.com/api/v1/users/updateMe',
        updatedUserData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (response.status === 200) {
        toast.success('User data updated successfully')
        navigate('/logout')
        // Optionally, you can update the user context or display a success message
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const passwordData = {
        passwordCurrent,
        password,
        passwordConfirm,
      };
      
      const response = await axios.patch(
        'https://mernback-a2n5.onrender.com/api/v1/users/updateMyPassword',
        passwordData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (response.status === 200) {
        toast.success('User Password updated successfully')
        navigate('/logout')
        // Optionally, you can display a success message
      }
    } catch (error) {
      console.error('Error updating password:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const handlePhotoUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!photo) {
        toast.error('Please choose a photo');
        return;
      }
  
      const formData = new FormData();
      formData.set('photo', photo);
  
      const response = await axios.patch(
        'https://mernback-a2n5.onrender.com/api/v1/users/updateAvatar',
        formData,
        { 
          headers: { 
            Authorization: `Bearer ${user.token}`, 
            'Content-Type': 'multipart/form-data' 
          } 
        }
      );
  
      setPhoto(response.data.photo);
      toast.success('Photo updated successfully');
      navigate('/logout')
    } catch (error) {
      console.error('Error updating photo:', error);
      toast.error('Failed to update photo');
    }
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  };

  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
        <ul className="side-nav">
            <NavItem href={`/profile/${user.data._id}`} text="Settings" icon="settings" isActive={true} />
            <NavItem href="/my-tours" text="My bookings" icon="briefcase" />
            <NavItem href="/my-review" text="My reviews" icon="star" />
            <NavItem href="#" text="Billing" icon="credit-card" />
          </ul>
          {user.data.role === 'admin' && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <NavItem href="#" text="Manage tours" icon="map" />
                <NavItem href="#" text="Manage users" icon="users" />
                <NavItem href="#" text="Manage reviews" icon="star" />
                <NavItem href="#" text="Manage bookings" icon="briefcase" />
              </ul>
            </div>
          )}
        </nav>
        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
            <form className="form form-user-data" onSubmit={handleUpdateUserData}>
              <FormGroup label="Name">
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required name="name" className="form__input" />
              </FormGroup>
              <FormGroup label="Email address">
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required name="email" className="form__input" />
              </FormGroup>
              <FormGroup label="Photo">
                <img src={`https://mernback-a2n5.onrender.com/uploads/${user.data.photo}`} alt="Userphoto" className="form__user-photo" />
                <input 
                  type="file" 
                  id="photo" 
                  accept="image/*" 
                  onChange={handlePhotoChange} 
                  className="form__input" 
                />
                <button type="button" onClick={handlePhotoUpdate} className="btn btn--small btn--green form__group right">Upload Photo</button>
              </FormGroup>
              <div className="form__group right">
                <button type="submit" className="btn btn--small btn--green">Save settings</button>
              </div>
            </form>
          </div>
          <hr className="line" />
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <form className="form form-user-password" onSubmit={handlePasswordUpdate}>
              <FormGroup label="Current password">
                <input
                  id="password-current"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength="8"
                  className="form__input"
                  value={passwordCurrent}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="New password">
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength="8"
                  className="form__input"
                  value={password}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Confirm password">
                <input
                  id="password-confirm"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength="8"
                  className="form__input"
                  value={passwordConfirm}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormGroup>
              <div className="form__group right">
                <button type="submit" className="btn btn--small btn--green btn--save-password">Save password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

function NavItem({ href, text, icon, isActive }) {
  return (
    <li className={`side-nav__item ${isActive ? 'side-nav__item--active' : ''}`}>
      <a href={href} className="side-nav__link">
        <svg className="side-nav__icon">
          <use xlinkHref={`../../public/img/icons.svg#icon-${icon}`}></use>
        </svg>
        <span>{text}</span>
      </a>
    </li>
  );
}

function FormGroup({ label, children }) {
  return (
    <div className="form__group">
      <label htmlFor={label} className="form__label">{label}</label>
      {children}
    </div>
  );
}

export default UserProfile;
