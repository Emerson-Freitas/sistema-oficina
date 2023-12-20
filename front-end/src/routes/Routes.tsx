import React from 'react'
import { Route, Routes as Router } from 'react-router-dom'
import Login from '../pages/login/Login'
import PrivateRoutes from './PrivateRoutes'
import Dashboard from '../pages/dashboard/Dashboard'
import Budget from '../pages/budgets/Budget'
import Report from '../pages/reports/Report'
import Service from '../pages/services/Service'
import User from '../pages/users/User'
import { ROLE } from '../enum/Role'
import Layout from '../components/container/Layout'

const Routes = () => {
  return (
    <Router>
        <Route path='/login' element={<Login/>}/>
        <Route element={<PrivateRoutes roles={[ROLE.CLIENTE]}/>}>
          <Route path='/' 
              element={
                <Layout>
                  <Dashboard/>
                </Layout>
              }
            />
            <Route path='/dashboard'
              element={
                <Layout>
                  <Dashboard/>
                </Layout>
              }
            />
            <Route path='/reports'
              element={
                <Layout>
                  <Report/>
                </Layout>
              }
            />
        </Route>
        <Route element={<PrivateRoutes roles={[ROLE.ADMIN, ROLE.FUNCIONARIO]}/>}>
            <Route path='/' 
              element={
                <Layout>
                  <Dashboard/>
                </Layout>
              }
            />
            <Route path='/dashboard'
              element={
                <Layout>
                  <Dashboard/>
                </Layout>
              }
            />
            <Route path='/budgets' 
              element={
                <Layout>
                  <Budget/>
                </Layout>
              }
            />
            <Route path='/reports' 
              element={
                <Layout>
                  <Report/>
                </Layout>
              }
            />
            <Route path='/vehicles' 
              element={
                <Layout>
                  <Service/>
                </Layout>
              }
            />
            <Route path='/users' 
              element={
                <Layout>
                  <User/>
                </Layout>
              }
            />
        </Route>
    </Router>
  )
}

export default Routes