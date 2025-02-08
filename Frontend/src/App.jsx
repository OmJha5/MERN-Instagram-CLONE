import React from 'react'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'

let appRouter = createBrowserRouter([
    {
        path : "/",
        element : <Home/>
    },
    {
        path : "/signup",
        element : <Signup/>
    },
    {
        path : "/login",
        element : <Login/>
    },
    {
        path : "/:id/profile",
        element : <Profile/>
    },
    {
        path : "/:id/edit",
        element : <EditProfile/>
    }
])

export default function App() {
  return (
    <div>
        <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}
