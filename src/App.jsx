import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import './App.css'

export default function App() {
  return (
    <>
      <Header />

      <main className="p-4">
        {/* Outlet gir plass til Home, CategoryPage, EventPage osv. */}
        <Outlet />
      </main>

      <footer className="p-4 text-center text-sm text-gray-500">
        Data fra{' '}
        <a
          href="https://developer.ticketmaster.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Ticketmaster API
        </a>
      </footer>
    </>
  )
}
