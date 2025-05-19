import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchEventById } from '../api/ticketmaster'
import ArtistCard from '../components/ArtistCard'
import EventCard from '../components/EventCard'
import './EventPage.css'

export default function EventPage() {
  const { id } = useParams()
  const [evt, setEvt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchEventById(id)
      .then(data => setEvt(data))
      .catch(() => setError('Kunne ikke hente arrangementet.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Laster arrangement…</p>
  if (error) return <p>{error}</p>
  if (!evt) return null


  const venue = evt._embedded?.venues?.[0]


  const genres = Array.from(
    new Set(
      evt.classifications
        ?.flatMap(c => [
          c.segment?.name,
          c.genre?.name,
          c.subGenre?.name,
          c.type?.name,
          c.subType?.name
        ])
        .filter(Boolean)
    )
  )


  const passes = evt._embedded?.ticketLimits?.map((limit, idx) => ({
    id: `pass-${idx}`,
    name: limit.method || 'Festivalpass',
    image: evt.images?.[0]?.url,
    venueName: venue?.name,
    date: evt.dates.start.localDate
  })) || [
    { id: 'fp', name: 'Festivalpass', image: evt.images?.[0]?.url, venueName: venue?.name, date: evt.dates.start.localDate },
    { id: 'pp', name: 'Premium Festivalpass', image: evt.images?.[0]?.url, venueName: venue?.name, date: evt.dates.start.localDate },
    { id: 'dp', name: 'Dagspass Fredag', image: evt.images?.[0]?.url, venueName: venue?.name, date: evt.dates.start.localDate }
  ]


  const artists = (evt._embedded?.attractions || []).filter(a => a.name !== evt.name)

  return (
    <div className="event-page">
      <header className="event-page__header">
        <h1 className="event-page__title">{evt.name}</h1>
        {genres.length > 0 && (
          <div className="event-page__genres">
            {genres.map(g => (
              <span key={g} className="event-page__genre-tag">{g}</span>
            ))}
          </div>
        )}
      </header>

      <section className="event-page__social">
        <h2>Følg oss på sosiale medier</h2>
        <div className="event-page__social-links">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
      </section>

      <section className="event-page__passes">
        <h2>Festivalpass</h2>
        <div className="event-page__passes-grid">
          {passes.map(p => (
            <div key={p.id} className="event-page__pass-card">
              {p.image && <img src={p.image} alt={p.name} />}
              <div className="event-page__pass-content">
                <h3>{p.name}</h3>
                {p.venueName && <p>{p.venueName}</p>}
                <p>{p.date}</p>
                <div className="event-page__pass-actions">
                  <button className="btn--buy">Kjøp</button>
                  <button className="btn--wishlist">Legg til i ønskeliste</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="event-page__artists">
        <h2>Artister</h2>
        <div className="event-page__artists-grid">
          {artists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  )
}
