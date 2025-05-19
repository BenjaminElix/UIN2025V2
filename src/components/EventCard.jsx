import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './EventCard.css'

export default function EventCard({ event, clickable = true }) {
  const { id, name, images, dates, _embedded } = event
  const imageUrl = images?.[0]?.url
  const date = dates?.start?.localDate
  const time = dates?.start?.localTime
  const venue = _embedded?.venues?.[0]

 
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setSaved(list.includes(id))
  }, [id])

  const toggleSave = (e) => {
    e.stopPropagation()
    const list = JSON.parse(localStorage.getItem('wishlist') || '[]')
    let updated
    if (list.includes(id)) {
      updated = list.filter(i => i !== id)
    } else {
      updated = [...list, id]
    }
    localStorage.setItem('wishlist', JSON.stringify(updated))
    setSaved(prev => !prev)
  }

  const card = (
    <article className="event-card">
      {imageUrl && (
        <img className="event-card__img" src={imageUrl} alt={name} />
      )}
      <div className="event-card__body">
        <div className="event-card__header">
          <h3 className="event-card__title">{name}</h3>
          <button
            className="event-card__favorite"
            onClick={toggleSave}
            aria-label={saved ? 'Fjern fra ønskeliste' : 'Legg til i ønskeliste'}
          >
            {saved ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="event-card__details">
          {date && <p>📅 {date}{time ? ` · ${time}` : ''}</p>}
          {venue?.country?.name && <p>{venue.country.name}</p>}
          {venue?.city?.name && <p>{venue.city.name}</p>}
          {venue?.name && <p>{venue.name}</p>}
        </div>
      </div>
    </article>
  )

  return clickable ? (
    <Link to={`/event/${id}`} className="event-card__link">
      {card}
    </Link>
  ) : (
    card
  )
}
