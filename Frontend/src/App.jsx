import React from 'react'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'

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
    }
])

export default function App() {
  return (
    <div>
        <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}
