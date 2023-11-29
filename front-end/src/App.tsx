import './App.css'
import React, {useContext} from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './contexts/AuthContext';

function App() {

  const value = useContext(AuthContext);

  console.log('value context', value)

  return (
    <>
      <ToastContainer/>
      <Outlet/>
    </>
  )
}

export default App