import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Root from './routes/Root';

const router = createBrowserRouter([
  {
    path: "*",
    element: <Root/>
  }
])

function App() {
  return (
    <>
      <ToastContainer/>
      <RouterProvider router={router} />
    </>
  )
}

export default App