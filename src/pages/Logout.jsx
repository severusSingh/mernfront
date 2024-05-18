import React,{useContext} from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  setUser(null)
  navigate('/')
  return (
    <div>
    </div>
  )
}

export default Logout
