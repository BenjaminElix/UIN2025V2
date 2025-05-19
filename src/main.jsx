import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import EventPage from './pages/EventPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SanityEventDetails from './pages/SanityEventDetails.jsx'

import './index.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'category/:slug', element: <CategoryPage /> },
        { path: 'event/:id', element: <EventPage /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'sanity-event/:id', element: <SanityEventDetails /> },
      ],
    },
  ],
  {
   
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
