import React, { useState, useEffect } from 'react'
import { sanity } from '../client/sanityClient'
import { fetchEventById } from '../api/ticketmaster'
import EventCard from '../components/EventCard'
import './Dashboard.css'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [wishlistEvents, setWishlistEvents] = useState([])
  const [purchasedEvents, setPurchasedEvents] = useState([])
  const [error, setError] = useState('')


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('sanityUser') || 'null')
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  
  useEffect(() => {
    if (!user) return
    const { wishlist = [], previousPurchases = [] } = user
 
    Promise.all(wishlist.map(ref => fetchEventById(ref._ref)))
      .then(events => setWishlistEvents(events))
      .catch(err => console.error('Wishlist fetch error', err))
    Promise.all(previousPurchases.map(ref => fetchEventById(ref._ref)))
      .then(events => setPurchasedEvents(events))
      .catch(err => console.error('Purchases fetch error', err))
  }, [user])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    const name = e.target.username.value.trim()
    if (!name) {
      setError('Skriv inn brukernavn')
      return
    }
    try {
      const query = `*[_type == \"user\" && name == $name][0]`
      const u = await sanity.fetch(query, { name })
      if (!u) {
        setError('Bruker ikke funnet')
        return
      }
      localStorage.setItem('sanityUser', JSON.stringify(u))
      setUser(u)
    } catch (err) {
      console.error('Login error:', err)
      setError('Innlogging feilet')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('sanityUser')
    setUser(null)
    setWishlistEvents([])
    setPurchasedEvents([])
  }


  if (!user) {
    return (
      <form onSubmit={handleLogin} className="login-form">
        <h1>Logg inn</h1>
        {error && <p className="error">{error}</p>}
        <input
          name="username"
          placeholder="Elix"
          className="input"
        />
        <button type="submit" className="btn">Logg inn</button>
      </form>
    )
  }


  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <h1>Min side – {user.name}</h1>
        <button onClick={handleLogout} className="btn-logout">Logg ut</button>
      </header>

      <div className="dashboard__section">
        <h2>Ønskeliste</h2>
        <div className="dashboard__grid">
          {wishlistEvents.map(evt => (
            <EventCard key={evt.id} event={evt} clickable />
          ))}
        </div>
      </div>

      <div className="dashboard__section">
        <h2>Tidligere kjøp</h2>
        <div className="dashboard__grid">
          {purchasedEvents.map(evt => (
            <EventCard key={evt.id} event={evt} clickable />
          ))}
        </div>
      </div>
    </section>
  )
}
