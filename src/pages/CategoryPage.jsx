import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { searchEvents, searchAttractions, searchVenues } from '../api/ticketmaster'
import EventCard from '../components/EventCard'
import './CategoryPage.css'

const CATEGORY_MAP = {
  musikk: 'Music',
  sport: 'Sports',
  teater: 'Arts & Theatre'
}

const COUNTRY_CODE = {
  Norway: 'NO',
  Denmark: 'DK',
  Sweden: 'SE'
}

export default function CategoryPage() {
  const { slug } = useParams()
  const classification = CATEGORY_MAP[slug] || slug


  const [date, setDate] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [searchTerm, setSearchTerm] = useState('')


  const [atts, setAtts] = useState([])
  const [evts, setEvts] = useState([])
  const [vens, setVens] = useState([])

 
  useEffect(() => {
   
    searchAttractions({ classificationName: classification, size: 6 })
      .then(setAtts)
      .catch(console.error)
  
    searchEvents({ classificationName: classification, size: 6 })
      .then(setEvts)
      .catch(console.error)
    searchVenues({ classificationName: classification, size: 6 })
      .then(setVens)
      .catch(console.error)
  }, [classification])

  
  const applyFilter = async () => {
    try {
      const params = { classificationName: classification, size: 6 }
      if (date) {
        params.startDateTime = `${date}T00:00:00Z`
        params.endDateTime   = `${date}T23:59:59Z`
      }
      if (country && COUNTRY_CODE[country]) {
        params.countryCode = COUNTRY_CODE[country]
      }
      if (city) {
        params.city = city
      }
      const [eventsRes, venuesRes] = await Promise.all([
        searchEvents(params),
        searchVenues(params)
      ])
      setEvts(eventsRes)
      setVens(venuesRes)
    } catch (err) {
      console.error('Filter error:', err)
    }
  }

 
  const applySearch = async () => {
    try {
      const params = { classificationName: classification, size: 6, keyword: searchTerm }
      if (date) {
        params.startDateTime = `${date}T00:00:00Z`
        params.endDateTime   = `${date}T23:59:59Z`
      }
      if (country && COUNTRY_CODE[country]) {
        params.countryCode = COUNTRY_CODE[country]
      }
      if (city) {
        params.city = city
      }
      const [eventsRes, venuesRes] = await Promise.all([
        searchEvents(params),
        searchVenues(params)
      ])
      setEvts(eventsRes)
      setVens(venuesRes)
    } catch (err) {
      console.error('Search error:', err)
    }
  }

  return (
    <div className="category-page">
      {/* Filters */}
      <section className="cp-filters">
        <label>
          Dato
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </label>
        <label>
          Land
          <select value={country} onChange={e => setCountry(e.target.value)}>
            <option value="">Alle</option>
            <option>Norway</option>
            <option>Denmark</option>
            <option>Sweden</option>
          </select>
        </label>
        <label>
          By
          <select value={city} onChange={e => setCity(e.target.value)}>
            <option value="">Alle</option>
            <option>Oslo</option>
            <option>Copenhagen</option>
            <option>Stockholm</option>
          </select>
        </label>
        <button onClick={applyFilter}>Filtrer</button>
      </section>

      {/* Search */}
      <section className="cp-search">
        <label>
          Søk
          <input
            type="text"
            placeholder="Søk etter..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </label>
        <button onClick={applySearch}>Søk</button>
      </section>

      {/* Results */}
      <main className="cp-content">
        <section>
          <h2>Attraksjoner</h2>
          <div className="cp-grid">
            {atts.map(a => (
              <EventCard key={a.id} event={a} clickable={false} />
            ))}
          </div>
        </section>

        <section>
          <h2>Arrangementer</h2>
          <div className="cp-grid">
            {evts.map(e => (
              <EventCard key={e.id} event={e} clickable={false} />
            ))}
          </div>
        </section>

        <section>
          <h2>Spillesteder</h2>
          <div className="cp-grid">
            {vens.map(v => (
              <EventCard key={v.id} event={v} clickable={false} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
