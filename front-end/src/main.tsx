import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Dashboard from './routes/dashboard/Dashboard.tsx'
import Budget from './routes/budgets/Budget.tsx'
import Report from './routes/reports/Report.tsx'
import Service from './routes/services/Service.tsx'
import User from './routes/users/User.tsx'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Login from './routes/login/Login.tsx'
import AuthProvider from './contexts/AuthContext.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Dashboard/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/budgets",
        element: <Budget/>
      },
      {
        path: "/reports",
        element: <Report/>
      },
      {
        path: "/services/vehicles",
        element: <Service/>
      },
      {
        path: "/users",
        element: <User/>
      },
      {
        path: "/login",
        element: <Login/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
