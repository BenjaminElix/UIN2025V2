import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { sanity } from '../client/sanityClient'

import { fetchEventById } from '../api/ticketmaster'

export default function SanityEventDetails() {
  const { id } = useParams()    
  const [doc, setDoc] = useState(null)
  const [tm, setTm]   = useState(null)

  useEffect(() => {
    sanity.fetch(`*[_type=="event" && apiId==$apiId][0]`, { apiId: id })
      .then(data => {
        setDoc(data)
        return fetchEventById(data.apiId)
      })
      .then(setTm)
  }, [id])

  if (!doc || !tm) return <p>Laster …</p>

  
  useEffect(() => {
    sanity.fetch(
      `*[_type=="user" && (references($docId) in wishlist[].ref || references($docId) in previousPurchases[].ref)]`, 
      { docId: doc._id }
    ).then(console.log)
  }, [doc])

  return (
    <article>
      <h1 className="text-2xl mb-2">{tm.name}</h1>
      <p>📍 {tm._embedded.venues[0].city.name}, {tm._embedded.venues[0].country.name}</p>
      <p>📅 {tm.dates.start.localDate}</p>
      {/* Her vil du liste opp venner og felles events */}
    </article>
  )
}
