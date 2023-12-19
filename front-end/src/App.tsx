import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import Routes from './routes/Routes';
import Layout from './components/container/Layout';

function App() {

  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App