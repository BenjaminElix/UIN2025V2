import { useEffect, useState } from 'react'
import { searchEvents, fetchEventById } from '../api/ticketmaster'
import { Link } from 'react-router-dom'

const SPECIFIC_FESTIVALS = [
  'Findings Festival',
  'NEON Festival',
  'Skeikampenfestivalen',
  'Tons of Rock'
]

const CITIES = ['Oslo', 'Stockholm', 'Berlin', 'London', 'Paris']

export default function Home() {
  const [festivals, setFestivals]     = useState([])
  const [festLoading, setFestLoading] = useState(true)
  const [festError, setFestError]     = useState(null)

 
  const PRESET_IDS = [
    'Z698xZb_Z16v7eGkFy',
    'Z698xZb_Z17q339',
    'Z698xZb_Z17qfaA',
    'Z698xZb_Z16vfkqIjU'
  ]

  const [selectedCity, setSelectedCity] = useState('Oslo')
  const [cityEvents, setCityEvents]     = useState([])
  const [cityLoading, setCityLoading]   = useState(true)
  const [cityError, setCityError]       = useState(null)

  useEffect(() => {
    async function loadFestivals() {
      setFestLoading(true)
      setFestError(null)
      try {
      
        const found = []
        for (const name of SPECIFIC_FESTIVALS) {
          try {
            const evts = await searchEvents({ keyword: name, size: 1 })
            if (evts.length) found.push(evts[0])
          } catch {
            
          }
        }
      
        for (const id of PRESET_IDS) {
          try {
            const evt = await fetchEventById(id)
            if (!found.find(e => e.id === evt.id)) {
              found.unshift(evt)
            }
          } catch {
            console.warn(`Kunne ikke hente preset-ID ${id}`)
          }
        }
        setFestivals(found.slice(0, 4))
      } catch {
        setFestError('Kunne ikke laste festivaler.')
      } finally {
        setFestLoading(false)
      }
    }
    loadFestivals()
  }, [])

  useEffect(() => {
    async function fetchCity() {
      setCityLoading(true)
      setCityError(null)
      try {
        const evts = await searchEvents({ city: selectedCity, size: 10 })
        setCityEvents(evts)
      } catch {
        setCityError('Kunne ikke hente arrangementer for byen.')
      } finally {
        setCityLoading(false)
      }
    }
    fetchCity()
  }, [selectedCity])

  return (
    <section className="px-6 py-8 space-y-16">
      {/* Festival‐seksjon */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Sommerens festivaler!</h2>
        {festLoading && <p>Laster festivaler…</p>}
        {festError   && <p className="text-red-600">{festError}</p>}
        {!festLoading && !festError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {festivals.map(evt => (
              <article
                key={evt.id}
                className="border rounded-lg overflow-hidden shadow-md"
              >
                {evt.images?.[0]?.url && (
                  <img
                    src={evt.images[0].url}
                    alt={evt.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{evt.name}</h3>
                  <Link
                    to={`/event/${evt.id}`}
                    className="block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition w-full text-center"
                  >
                    Les mer om {evt.name}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* By‐arrangementer */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Hva skjer i {selectedCity}?</h2>
        <div className="flex space-x-4 mb-6">
          {CITIES.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded transition ${
                selectedCity === city
                  ? 'bg-black text-white'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
        {cityLoading && <p className="text-lg">Laster arrangementer…</p>}
        {cityError   && <p className="text-red-600">{cityError}</p>}
        {!cityLoading && !cityError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cityEvents.map(evt => {
              const img   = evt.images?.[0]?.url
              const date  = evt.dates?.start?.localDate
              const time  = evt.dates?.start?.localTime
              const venue = evt._embedded?.venues?.[0]
              return (
                <article
                  key={evt.id}
                  className="border rounded-lg overflow-hidden shadow-md"
                >
                  {img && (
                    <img
                      src={img}
                      alt={evt.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{evt.name}</h3>
                    {date && <p>{date}</p>}
                    {time && <p>{time}</p>}
                    {venue?.country?.name && <p>{venue.country.name}</p>}
                    {venue?.city?.name && <p>{venue.city.name}</p>}
                    {venue?.name && <p>{venue.name}</p>}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
