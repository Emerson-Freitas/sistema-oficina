import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Routes from './routes/Routes';
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';
import Root from './routes/Root';
import { useAuth } from './components/hooks/useAuth';
import { useEffect } from 'react';

// const Root = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/users" element={<User/>} />
//     </Routes>
//   );
// };

const router = createBrowserRouter([
  {
    path: "*",
    element: <Root/>
  }
])

function App() {
  // const location = useLocation()
  const { authenticated, user, token } = useAuth();

  // useEffect(() => {
  //   console.log(location)
  // }, [])

  return (
    <>
      <ToastContainer/>
      <RouterProvider router={router} />
    </>
  )
}

export default App