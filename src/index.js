import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Logout  from './pages/Logout';
import Booking from './pages/Booking';
import Toursdetail from './pages/Toursdetail';
import {UserProvider} from './context/userContext';
import Success from './pages/success';
import Review from './pages/Review';
import MyReview from './pages/myReview';



const router = createBrowserRouter([
  {
    path:"/",
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage />,
    children:[
      {index:true, element:<Home />},
      {path:'register', element:<Register />},
      {path:'login', element:<Login />},
      {path:'profile/:id', element:<UserProfile />},
      {path:'logout', element:<Logout />},
      {path:'/my-tours', element:<Booking />},
      {path:'/tours/:id', element:<Toursdetail />},
      {path:'/success', element:<Success />},
      {path:'/tours/:id/reviews', element:<Review />},
      {path:'/my-review', element:<MyReview />},
      {path:'/success', element:<Success />}
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <Toaster position="top-center" toastOptions={{duration: 6000 }} />
  </React.StrictMode>
);